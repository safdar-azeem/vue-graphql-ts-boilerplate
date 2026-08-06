# GraphQL Layer — Queries & Mutations

How to define and use GraphQL queries and mutations with `vue-apollo-client`. For installation, Vite plugin, `createApollo`, auth, tokens, and config options, 

## Patterns

Query (SSR and client):

```ts
useMeQuery()
```

❌ Reactive variables auto-refetch, DO NOT use `ref` or `computed` for query variables.

Mutation:

```ts
const { mutate } = useLoginMutation()
await mutate(payload)
```

Offline support is enabled in this project.
If the network is unavailable, mutations are queued and replayed when connection returns.

Multi-query:

```ts
useMultiQuery(queries, ['useQueryA', 'useQueryB'])
```

---

## 1. Define a query

```graphql
# src/graphql/user.query.graphql
query GetUser {
	me {
		id
		name
	}
}
```

## 2. Client-side Query

For standard client-side fetching:

```vue
<script setup>
import { useMeQuery } from './graphql/generated'

const { result, loading, error, refetch } = useMeQuery()
</script>
```

## 3. Server-side Query (SSR) and hydration

`useQuery` has the same synchronous return shape on server and browser. Vue
Apollo registers native `onServerPrefetch` work, which the Vue server renderer
awaits before HTML and cache extraction.

```vue
<script setup>
import { useMeQuery } from './graphql/generated'

const { result, loading, error, refetch } = useMeQuery()
</script>

<template>
	<div v-if="result">Welcome, {{ result.me.name }}!</div>
</template>
```

### The `ssr` option

`ssr: false` disables server prefetch for an operation. `ssr: true` enables it
explicitly; it never changes the composable into a Promise.

```vue
<script setup>
import { useGetUserQuery } from './graphql/generated'

const { result } = useGetUserQuery({ id: 1 }, { ssr: true })
</script>
```

## Different Apollo Clients

You can use different Apollo Clients for different queries.

```vue
<script setup>
// with default client
const { result, loading, error, refetch } = useMeQuery()
// with api2 client
const { result, loading, error, refetch } = useMeQuery({ client: 'api2' })
</script>
```

## Dynamic Refetching Query

You can pass reactive variables (`ref`, `reactive`, `computed`) to the query. The hook will automatically refetch when variables change.

```vue
<script setup>
import { ref, computed } from 'vue'
import { useGetUserQuery } from './graphql/generated'

const userId = ref('1')

// Automatically refetches when userId changes
const { result } = useGetUserQuery({ id: userId })

// Or with computed
const { result: otherResult } = useGetUserQuery({ id: computed(() => '2') })
</script>
```

## Smart Query Caching & Auto-Refetching

Our `useQuery` implementation includes intelligent caching and auto-refetching mechanisms out of the box:

- **Global Cache Sharing**: If multiple components use the same query with the same variables, they automatically share the cache and in-flight request, preventing duplicate network calls.
- **Smart Refetch on Update**: When `refetchOnUpdate: true` is set (globally or per-query), queries will automatically refetch when component props change or when the Vue Router path changes.
- **Refetch Debouncing**: The `refetchTimeout` option (default: `10000`ms) ensures that queries aren't spammed. A query won't be auto-refetched if it was successfully fetched within the timeout window.
- **Garbage Collection**: Inactive queries that are no longer used by any mounted components are automatically garbage-collected after 5 minutes to free up memory.
- **Cache-Only Support**: Respects `fetchPolicy: 'cache-only'`, bypassing all auto-refetch mechanisms.

## Multiple Queries (`useMultiQuery`)

The `useMultiQuery` composable allows you to combine multiple GraphQL queries into a single unified loading/error state and refetch function.

```typescript
import { useMultiQuery } from 'vue-apollo-client'
import * as queries from './graphql/generated' // Import all generated hooks

const { result, loading, error, refetch } = useMultiQuery(
	queries, // 1. Map of query definitions
	['useGetUserQuery', 'useMeQuery'], // 2. Array of query keys to execute
	{
		/* shared variables */
	},
	{
		/* options */
	},
)

// Data is automatically unwrapped from the root query field!
// No need to do `result.value.useGetUserQuery.getUser`, just:
const users = result.value?.useGetUserQuery
const me = result.value?.useMeQuery

// Combined loading state across all queries
if (loading.value) {
	/* ... */
}

// Map of errors by query key
if (error.value.useGetUserQuery) {
	/* ... */
}

// Refetch all queries at once
await refetch()

// Or selectively refetch specific queries
await refetch(
	{
		/* new variables */
	},
	['useMeQuery'],
)
```

## Mutations

Our `useMutation` composable includes advanced features for offline resilience and cache invalidation:

- **Offline Support (`allowOffline`)**: If `allowOffline: true` is configured and the user goes offline, mutations are automatically serialized and queued in `localStorage`. Once the user reconnects to the network, the client automatically syncs the queued mutations in the background.
- **Smart `refetchQueries`**: When you pass operation names to `refetchQueries` (e.g., `['GetUsers']`), the client performs a two-step invalidation:
    1. It actively refetches any currently mounted observable queries with that name.
    2. It aggressively evicts the data from the Apollo `InMemoryCache` using garbage collection. This ensures that even if the query is currently unmounted, it will fetch fresh data from the network the next time it mounts, rather than relying on stale cache.

```vue
<script setup lang="ts">
import { useDeletePostMutation } from './graphql/generated'

const { mutate, loading, error, onDone, onError } = useDeletePostMutation()

const handleDelete = async (id: string) => {
	await mutate(
		{ id },
		{ refetchQueries: ['GetPosts'] }, // Smartly updates active and inactive queries
	)
	// Handle successful deletion
}
</script>
```
