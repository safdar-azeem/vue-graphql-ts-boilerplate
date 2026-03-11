# 1. GraphQL Layer — vue-apollo-client

Purpose:

- Typed queries/mutations
- Auto code generation
- Token handling (cookies)
- SSR support
- Offline mutation queue
- Smart refetch

Rules:

- All operations live in `.graphql` files.
- NEVER write raw Apollo queries in components.
- ALWAYS use generated composables/types from `@/graphql`.

Patterns:

Query (SSR):
await useMeQuery()

Query (Client):
useMeQuery()

❌ Reactive variables auto-refetch, DO NOT use `ref` or `computed` for query variables.

Mutation:
const { mutate } = useLoginMutation()
await mutate(payload)

Offline support is enabled in this project.
If the network is unavailable, mutations are queued and replayed when connection returns.

Multi-query:
useMultiQuery(queries, ['useQueryA', 'useQueryB'])

Token utilities:

- setToken()
- getToken()
- removeToken()
- useKeepCookieAlive()

Automatically refreshed when activity is detected

Token is auto-attached to requests.
