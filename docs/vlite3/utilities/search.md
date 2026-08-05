# vlite3 — Search Utility (`search.util.ts`)

> Complete reference for the `search()` function — a high-performance, fully-typed
> search engine with indexing, caching, and query operators.

- **File:** `src/utils/search.util.ts`
- **Exports:** `search`, `lazySearch`, `resetSearchIndex`
- **Import:** `import { search, lazySearch, resetSearchIndex } from 'vlite3'`

---

## Table of Contents

- [Overview](#overview)
- [API Signature](#api-signature)
- [Return Value](#return-value)
- [Query Types](#query-types)
- [Operators](#operators)
- [Indexing & Caching](#indexing--caching)
- [Performance](#performance)
- [Examples](#examples)
- [TypeScript Types](#typescript-types)
- [Edge Cases & Best Practices](#edge-cases--best-practices)
- [Lazy Search](#lazy-search)

---

## Overview

`search()` is a zero-dependency, in-memory search engine for JavaScript/TypeScript
arrays. It works with both primitive arrays (`string[]`, `number[]`) and object
arrays (`Record<string, any>[]`). It automatically builds and caches indexes
for fast repeated queries.

Key features:
- **Inverted index** for case-insensitive substring matching on string fields
- **Hash index** for O(1) exact-match lookups
- **Sorted numeric index** for O(log n) range queries (`$gte`, `$lte`, etc.)
- **Model-key caching** — reuse indexes across calls (Mongoose-style model names)
- **10 query operators** — `$eq`, `$ne`, `$gt`, `$gte`, `$lt`, `$lte`, `$in`, `$nin`, `$regex`, `$exists`
- **AND / OR semantics** — multiple rest-params = AND; array of queries = OR
- **Nested object search** — query nested fields via dot-notation or nested objects
- **Fully typed** — generic TypeScript with autocomplete on field names

---

## API Signature

```ts
function search<T>(
  data: T[],
  ...queries: [...QueryObject<T>[], modelKey?: string]
): SearchResult<T>

function search<T>(
  data: T[],
  query: string,                // primitive substring search
  modelKey?: string
): SearchResult<T>

function search<T>(
  data: T[],
  queries: QueryObject<T>[],    // OR query (array)
  modelKey?: string
): SearchResult<T>
```

### Parameters

| Parameter   | Type                                      | Description                                    |
|-------------|-------------------------------------------|------------------------------------------------|
| `data`      | `T[]`                                     | The dataset to search                          |
| `...queries`| `QueryObject<T>` / `QueryObject<T>[]` / `string` | One or more queries (see below)       |
| `modelKey`  | `string` (optional, last argument)        | Cache key for index reuse (e.g., `'User'`)     |

### Rules for `modelKey`

The **last argument** is treated as a `modelKey` (cache key) when:
- The data contains objects (not primitives), AND
- The last argument is a plain string

---

## Return Value

```ts
interface SearchResult<T> {
  results: T[]          // Matched items in original array order
  reset: () => void     // Clears cached index for this modelKey
  loading: boolean      // Whether the engine is building indexes (always false for sync search)
}
```

### Destructured usage

```ts
const { results, reset } = search(data, { name: 'Jane' }, 'User')

// Later, if data changes:
reset()  // Clears the 'User' index cache
```

### Standalone cache reset

```ts
import { resetSearchIndex } from 'vlite3'

resetSearchIndex('User')   // Clear one model's cache
resetSearchIndex()          // Clear ALL caches
```

---

## Query Types

### 1. Primitive String Search

Searches a `string[]` for case-insensitive substring matches.

```ts
search(['apple', 'banana', 'cherry', 'january'], 'an')
// results: ['banana', 'january']
```

### 2. Single Object Query (AND fields)

Each field in the query object is an AND condition.

```ts
search(users, { name: 'Jane', age: 25 })
// Matches items where name contains 'Jane' AND age === 25
```

### 3. Multiple Object Queries (AND across queries)

Multiple query objects as rest parameters: the results are the **intersection** (AND).

```ts
search(products, { category: 'clothes' }, { price: { $gte: 200 } }, 'Product')
// Matches items in category 'clothes' AND price >= 200
```

### 4. Array of Queries (OR)

An array of query objects: the results are the **union** (OR).

```ts
search(users, [{ name: 'John' }, { age: 25 }], 'User')
// Matches items where name is 'John' OR age is 25
```

### 5. Direct Values vs. Operators

- **String values** → case-insensitive **substring** match
- **Number/boolean values** → **exact** match
- **Operator objects** (`{ $gte: 10 }`) → evaluated per operator rules

### 6. Nested Object Queries

You can query nested object fields in two equivalent ways:

**Nested object syntax (auto-flattened):**
```ts
search(people, { name: { firstName: 'Jesse' } })
```

**Dot-notation syntax:**
```ts
search(people, { 'name.firstName': 'Jesse' })
```

Both are equivalent. Nested queries are automatically flattened to dot-notation
internally, and all nested paths are indexed for fast lookups.

---

## Operators

All operators are specified as values in a query object field:

```ts
search(data, { fieldName: { $operator: value } })
```

### Reference Table

| Operator  | Type            | Description                                           |
|-----------|-----------------|-------------------------------------------------------|
| `$eq`     | `any`           | Exact equality (`===`)                                |
| `$ne`     | `any`           | Not equal (`!==`)                                     |
| `$gt`     | `number`        | Greater than                                          |
| `$gte`    | `number`        | Greater than or equal                                 |
| `$lt`     | `number`        | Less than                                             |
| `$lte`    | `number`        | Less than or equal                                    |
| `$in`     | `string`        | Case-insensitive substring match (works on arrays)    |
| `$nin`    | `string`        | NOT substring match                                   |
| `$regex`  | `string\|RegExp`| Regular expression test                               |
| `$exists` | `boolean`       | `true` = field must exist; `false` = must not exist   |

### Combining Operators

Multiple operators on the same field are ANDed:

```ts
search(data, { price: { $gte: 100, $lte: 500 } })
// price >= 100 AND price <= 500
```

### `$in` on Array Fields

The `$in` operator checks if ANY element of an array field contains the substring:

```ts
const data = [
  { name: 'Shirt', sizes: ['sm', 'md', 'lg'] },
  { name: 'Hat', sizes: ['one-size'] },
]

search(data, { sizes: { $in: 'sm' } })
// results: [{ name: 'Shirt', sizes: ['sm', 'md', 'lg'] }]
```

---

## Indexing & Caching

### How Indexing Works

When `search()` is first called with a `modelKey`, it builds three types of indexes:

1. **Hash Index** — Maps exact field values to row indices. O(1) lookup.
   Used for: direct value matches on numbers/booleans, `$eq` operator.

2. **Inverted Index** — Maps lowercase string values to row indices.
   Used for: `$in` (substring), direct string value matches.

3. **Sorted Numeric Index** — Sorted array of `{ value, index }` pairs.
   Used for: `$gt`, `$gte`, `$lt`, `$lte` via binary search.

### Caching Behavior

```
First call:    search(data, query, 'Product')  → builds index, caches it
Second call:   search(data, query, 'Product')  → reuses cached index (instant)
Data changes:  reset() or resetSearchIndex('Product')  → clears cache
Next call:     search(newData, query, 'Product')  → rebuilds index
```

The cache checks if the same data array reference is passed.
If the same data array reference is passed, the cached index is reused.
If a new array is passed, the index is rebuilt automatically.

### Without modelKey

If no `modelKey` is provided, indexes are built fresh every call (no caching).
For one-off searches this is fine, but for repeated queries on the same dataset,
always provide a `modelKey`.

---

## Performance

| Operation          | Data Size | Complexity           | Notes                        |
|--------------------|-----------|----------------------|------------------------------|
| Index build        | n items   | O(n × k)             | k = number of fields         |
| Exact match        | n items   | O(1) amortized       | Hash index lookup            |
| Substring match    | n items   | O(m) amortized       | m = unique values in field   |
| Range query        | n items   | O(log n + r)         | r = results in range         |
| Cached re-query    | any       | O(1) for index fetch | Only query eval cost applies |

For datasets of 10,000+ items with repeated queries, using a `modelKey` provides
**order-of-magnitude** speedup by avoiding index rebuilds.

---

## Examples

### Example 1 — Basic Object Search

```ts
const data = [
  { name: 'John', age: 30, city: 'New York' },
  { name: 'Jane', age: 25, city: 'London' },
  { name: 'Bob', age: 35, city: 'Paris' },
]

const { results } = search(data, { name: 'Jane' })
// results: [{ name: 'Jane', age: 25, city: 'London' }]

const { results: r2 } = search(data, { age: 25 })
// r2: [{ name: 'Jane', age: 25, city: 'London' }]
```

### Example 2 — Primitive String Array

```ts
const fruits = ['apple', 'banana', 'cherry', 'january']

const { results } = search(fruits, 'an')
// results: ['banana', 'january']
```

### Example 3 — Multi-Field AND

```ts
const { results } = search(data, { name: 'Jane', age: 25 })
// results: [{ name: 'Jane', age: 25, city: 'London' }]
```

### Example 4 — OR Query (Array)

```ts
const { results } = search(data, [{ name: 'John' }, { age: 25 }])
// results: [
//   { name: 'John', age: 30, city: 'New York' },
//   { name: 'Jane', age: 25, city: 'London' },
// ]
```

### Example 5 — E-commerce: Category Filter

```ts
const products = [
  { title: 'Product 1', price: 100, category: 'Electronics', sizes: ['sm', 'md'] },
  { title: 'Product 2', price: 200, category: 'clothes', sizes: ['sm', 'md'] },
  { title: 'Product 3', price: 300, category: 'Electronics', sizes: ['sm', 'md'] },
  { title: 'Product 4', price: 400, category: 'clothes', sizes: ['sm', 'md'] },
  { title: 'Product 5', price: 400, category: 'men-shoes', sizes: ['sm', 'md'] },
  { title: 'Product 6', price: 400, category: 'men', sizes: ['sm', 'md'] },
]

// Exact category match
const { results } = search(products, { category: 'Electronics' }, 'Product')
// results: [Product 1, Product 3]

// AND across multiple queries
const { results: r2 } = search(
  products,
  { category: 'clothes' },
  { sizes: 'sm' },
  { price: { $gte: 200, $lte: 300 } },
  'Product'
)
// results: [Product 2]

// Substring match with $in
const { results: r3 } = search(
  products,
  { category: { $in: 'men' } },
  { title: { $in: 'product' } },
  'Product'
)
// results: [Product 5, Product 6]
```

### Example 6 — OR with $in Operator

```ts
const { results } = search(
  products,
  [{ category: { $in: 'men' } }, { title: { $in: 'men' } }],
  'Product'
)
// results: [Product 5, Product 6]
```

### Example 7 — With Caching and Reset

```ts
const { results, reset } = search(users, { name: 'Jane' }, 'User')

// ... later, user data changes ...
reset()  // Clears the 'User' index

// Or clear all caches:
import { resetSearchIndex } from 'vlite3'
resetSearchIndex()
```

### Example 8 — Range Queries

```ts
// Products between $100 and $300
const { results } = search(products, { price: { $gte: 100, $lte: 300 } }, 'Product')

// Products over $300
const { results: expensive } = search(products, { price: { $gt: 300 } }, 'Product')
```

### Example 9 — Regex Search

```ts
const { results } = search(users, { name: { $regex: '^J' } }, 'User')
// Matches names starting with 'J': John, Jane
```

### Example 10 — Field Existence

```ts
const { results } = search(data, { email: { $exists: true } })
// Only items that have a non-null/undefined email field
```

### Example 11 — Nested Object Search

```ts
const people = [
  { name: { firstName: 'Jesse', lastName: 'Bowen' }, state: 'Seattle' },
  { name: { firstName: 'Jane', lastName: 'Doe' }, state: 'London' },
  { name: { firstName: 'Bob', lastName: 'Smith' }, state: 'Paris' },
]

// Nested object syntax
const { results } = search(people, { name: { firstName: 'Jesse' } }, 'Person')
// results: [{ name: { firstName: 'Jesse', lastName: 'Bowen' }, state: 'Seattle' }]

// Dot-notation syntax (equivalent)
const { results: r2 } = search(people, { 'name.lastName': 'Doe' }, 'Person')
// results: [{ name: { firstName: 'Jane', lastName: 'Doe' }, state: 'London' }]

// With operators on nested fields
const { results: r3 } = search(people, { name: { firstName: { $in: 'j' } } }, 'Person')
// results: [Jesse, Jane]
```

---

## TypeScript Types

```ts
/** Comparison operators */
interface SearchOperators<V = any> {
  $eq?: V
  $ne?: V
  $gt?: number
  $gte?: number
  $lt?: number
  $lte?: number
  $in?: string
  $nin?: string
  $regex?: string | RegExp
  $exists?: boolean
}

/** A query value: direct value or operator object */
type QueryValue<V = any> = V | SearchOperators<V>

/** Query object: partial map of field names to query values */
type QueryObject<T = Record<string, any>> = {
  [K in keyof T]?: QueryValue<T[K]>
}

/** Return type of search() */
interface SearchResult<T> {
  results: T[]
  reset: () => void
}
```

---

## Edge Cases & Best Practices

### Matching Behavior Summary

| Data Type    | Query Type        | Behavior                             |
|-------------|-------------------|--------------------------------------|
| `string[]`  | `string`          | Case-insensitive substring match     |
| `object[]`  | `{ field: str }`  | Case-insensitive substring on field  |
| `object[]`  | `{ field: num }`  | Exact numeric equality               |
| `object[]`  | `{ field: bool }` | Exact boolean equality               |
| `object[]`  | `{ field: {$op} }`| Operator-based evaluation            |

### Best Practices

1. **Always use a `modelKey`** for datasets you query more than once.
   This avoids rebuilding indexes on every call.

2. **Call `reset()`** whenever the underlying data array changes
   (items added, removed, or modified).

3. **Use `$in` for fuzzy text matching**, not `$eq`.
   `$eq` does strict equality; `$in` does substring matching.

4. **Combine operators** on the same field for range queries:
   `{ price: { $gte: 100, $lte: 500 } }`.

5. **Use OR queries (arrays)** when you want "match any of these conditions":
   `search(data, [{ category: 'shoes' }, { category: 'boots' }])`.

6. **Use multiple rest params** when you want "match ALL of these conditions":
   `search(data, { color: 'red' }, { size: 'lg' })`.

7. **Empty query** returns all items:
   `search(data, {})` → returns everything.

8. **Empty data** returns empty results:
   `search([], { name: 'test' })` → `{ results: [] }`.

9. For **array fields** (like `sizes: ['sm', 'md']`):
   - Direct string value: `{ sizes: 'sm' }` → checks if any element contains 'sm' (substring)
   - `$in` operator: `{ sizes: { $in: 'sm' } }` → same as above, explicit

10. The search **preserves original order** — results appear in the same
    order as they do in the source array.

11. **Nested objects** are automatically indexed via dot-notation paths.
    Query with `{ name: { firstName: 'X' } }` or `{ 'name.firstName': 'X' }`.
    Both syntaxes are equivalent and fully indexed.

---

## Lazy Search

`lazySearch()` creates a pre-configured, reusable search instance. Unlike `search()`,
which takes a full query each time, `lazySearch()` accepts the dataset and searchable
fields upfront, builds the index once, and returns a fast `search(query)` function.

### API Signature

```ts
function lazySearch<T>(
  data: T[],
  keys?: string[],      // Field paths to search across (dot-notation)
  modelKey?: string     // Cache key for index persistence
): LazySearchResult<T>
```

### Return Value

```ts
interface LazySearchResult<T> {
  search: (query: string) => T[]   // Search function
  reset: () => void                // Clear cached index
  loading: boolean                 // Whether index is being built
}
```

### How It Works

1. Call `lazySearch(data, keys)` — the index is built immediately
2. Call `search(query)` repeatedly — fast substring search across the specified keys
3. Results are OR’d across keys (matches in ANY key are returned)
4. If `keys` is omitted, ALL fields are searched

### Example 12 — Lazy Search with Objects

```ts
const people = [
  { name: { firstName: 'Jesse', lastName: 'Bowen' }, state: 'Seattle' },
  { name: { firstName: 'Jane', lastName: 'Doe' }, state: 'London' },
  { name: { firstName: 'Bob', lastName: 'Smith' }, state: 'Paris' },
]

const { search, reset, loading } = lazySearch(people, ['name.firstName', 'state'])

search('ess')    // [Jesse] — matches 'Jesse' (firstName contains 'ess')
search('lon')    // [Jane]  — matches 'London' (state contains 'lon')
search('o')      // [Jesse, Bob] — 'Bowen' and 'Bob' both contain 'o'... wait,
                 //   'state' is also searched: no match. Only firstName matches.

reset()  // Clears the index cache
```

### Example 13 — Lazy Search with Primitives

```ts
const { search } = lazySearch(['apple', 'banana', 'cherry', 'january'])

search('an')   // ['banana', 'january']
search('ch')   // ['cherry']
```

### Example 14 — Lazy Search All Fields

```ts
// Omit keys — searches across ALL fields
const { search } = lazySearch(products)
search('elect')  // Products with 'Electronics' in any field
```
