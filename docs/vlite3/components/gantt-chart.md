# GanttChart

**Import:** `import { GanttChart } from 'vlite3'`

## Description

`GanttChart` renders a project schedule with:

- Date-aligned task bars and milestones
- Collapsible groups in a left sidebar
- Progress fills, dependency arrows, and a today marker
- Wheel/pinch zoom with a parent-driven imperative API, and day / week / month view modes
- Controlled drag-to-move and edge-resize (with live preview)
- Optional interactive dependency create / delete

The chart is **fully controlled**. It never mutates the `tasks` prop.

| Interaction | What the chart does | What the parent must do |
| :--- | :--- | :--- |
| Move / resize | Temporary live preview → emit `@task-update` once on release | Update `tasks` with the new `start` / `end` |
| Create dependency | Preview line + validation → emit `@dependency-create` once | Persist the edge on `tasks`, then pass them back |
| Delete dependency | Select line → emit `@dependency-delete` once | Remove the edge from `tasks`, then pass them back |

Permanent bars and arrows update only after the parent returns updated `tasks`.

---

## Quick start

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { GanttChart, formatGanttLocalDate, type GanttTask } from 'vlite3'

const tasks = ref<GanttTask[]>([
  {
    id: 'planning',
    name: 'Planning',
    start: '2026-04-01',
    end: '2026-04-10',
    progress: 100,
    group: 'Phase 1',
  },
  {
    id: 'design',
    name: 'Design',
    start: '2026-04-08',
    end: '2026-04-22',
    progress: 65,
    group: 'Phase 1',
    dependencies: ['planning'],
  },
])

function onTaskUpdate(task: GanttTask, changes: { start: Date; end: Date }) {
  tasks.value = tasks.value.map((item) =>
    item.id === task.id
      ? {
          ...item,
          start: formatGanttLocalDate(changes.start),
          end: formatGanttLocalDate(changes.end),
        }
      : item,
  )
}
</script>

<template>
  <GanttChart
    :tasks="tasks"
    view-mode="week"
    show-progress
    show-dependencies
    @task-update="onTaskUpdate"
  />
</template>
```

---

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :------ | :---------- |
| `tasks` | `GanttTask[]` | **required** | Task and milestone data rendered on the chart |
| `viewMode` | `GanttViewMode` | `week` | Time axis granularity: `day`, `week`, or `month` |
| `height` | `number` | `0` | Total chart height in px; `0` auto-fits rows |
| `rowHeight` | `number` | `44` | Height of each task row in px |
| `barRadius` | `number` | `6` | Corner radius for task bars |
| `barHeight` | `number` | `28` | Task bar height within each row; keep ≤ `rowHeight` |
| `sidebarWidth` | `number` | `220` | Width of the left task-name sidebar in px |
| `showGrid` | `boolean` | `true` | Show dashed vertical grid lines |
| `gridOpacity` | `number` | `0.15` | Opacity (0–1) for grid lines and row dividers |
| `showTooltip` | `boolean` | `true` | Show task details on hover |
| `showLabels` | `boolean` | `true` | Show task names inside bars when space allows |
| `showProgress` | `boolean` | `true` | Show progress fill inside task bars |
| `showDependencies` | `boolean` | `true` | Render existing dependency arrows |
| `showTodayLine` | `boolean` | `true` | Show the today marker line when today is in range |
| `showHeader` | `boolean` | `true` | Show the top date axis header |
| `animate` | `boolean` | `true` | Play the entry animation on mount |
| `colors` | `string[]` | `CHART_COLORS` | Palette for tasks without a custom `color` |
| `todayColor` | `string` | `var(--color-danger)` | CSS color for the today marker |
| `locale` | `string` | `en-US` | Locale for date labels, tooltips, and resize preview |
| `draggable` | `boolean` | `true` | Allow move and resize of non-milestone bars |
| `editableDependencies` | `boolean` | `false` | Opt-in `+` connectors and create/delete flows. Independent of `showDependencies` |
| `cascadeDependencies` | `boolean` | `false` | When moving a task, dependents follow as a visual preview. Release still emits one root `@task-update`; the parent owns the authoritative cascade |
| `zoom` | `boolean` | `true` | Enable Ctrl/Meta + wheel (and trackpad pinch) zoom. The chart renders **no** zoom buttons — drive zoom from the parent via the [exposed methods](#imperative-api) |
| `minZoom` | `number` | `0.2` | Lower bound for the zoom level |
| `maxZoom` | `number` | `5` | Upper bound for the zoom level |
| `zoomStep` | `number` | `0.2` | Increment applied by `zoomIn` / `zoomOut` |
| `visiblePeriodCount` | `number` | Day 7 · Week 4 · Month 1.7 | Period columns that fill the viewport at zoom 1 (fractional allowed). Zoom out/in to show more/fewer. See [Timeline viewport](#timeline-viewport--navigation) |
| `minColumnWidth` | `number` | per view | Minimum px width per column so the project never compresses to fit. Defaults: Day 44, Week 96, Month 130 |
| `timelineStart` | `Date \| string` | earliest task | Force the timeline start (aligned to the view's period boundary) |
| `timelineEnd` | `Date \| string` | last task | Force the timeline end instead of deriving it from the last task |
| `rangePadding` | `number` | `0` | Extra empty periods after the last task's completed boundary period (weeks in Day/Week, months in Month) |
| `preserveCenterDate` | `boolean` | `true` | Keep the viewport's centre date in view when switching Day / Week / Month |
| `collapsibleSidebar` | `boolean` | `true` | Show a collapse/expand control on the task sidebar to give the timeline more room |
| `defaultSidebarCollapsed` | `boolean` | `false` | Start with the sidebar collapsed |

---

## Events

| Event | Payload | Description |
| :---- | :------ | :---------- |
| `task-click` | `(task: GanttTask)` | Task row or bar click |
| `task-hover` | `(task: GanttTask \| null)` | Hover enter; `null` when hover ends |
| `task-update` | `(task: GanttTask, changes: { start: Date; end: Date })` | Emitted **once on release** after a move or resize. Live preview runs during the gesture without mutating `tasks` |
| `zoom-change` | `(state: GanttZoomState)` | Emitted whenever the zoom level changes (wheel or imperative). Use it to render accurate control states |
| `sidebar-toggle` | `(collapsed: boolean)` | Emitted when the task sidebar is collapsed or expanded |
| `dependency-create` | `(payload: GanttDependencyCreatePayload)` | Valid predecessor → successor link requested |
| `dependency-delete` | `(payload: GanttDependencyDeletePayload)` | Selected dependency deleted |

### Dependency payloads

```ts
interface GanttDependencyCreatePayload {
  /** Task that must finish first (arrow origin) */
  predecessorId: string
  /** Task that waits on the predecessor */
  successorId: string
  predecessor: GanttTask
  successor: GanttTask
  /** Always `waiting-on` from the connector (successor's perspective) */
  type: 'waiting-on'
  /** Display label, e.g. `"Waiting on"` */
  typeLabel: string
}

interface GanttDependencyDeletePayload {
  predecessorId: string
  successorId: string
  predecessor: GanttTask
  successor: GanttTask
  type: 'waiting-on'
  typeLabel: string
}
```

**Parent responsibility**

- **Create:** persist one canonical schedule edge — successor **Waiting on** predecessor (same as predecessor **Blocking** successor). Update `dependencies` and/or `dependencyLinks`, then pass `tasks` back.
- **Delete:** remove that edge from parent state and pass updated `tasks` back.
- Do **not** store two DB rows for Waiting on + Blocking of the same pair.

The permanent arrow appears or disappears only after that update.

---

## Timeline viewport & navigation

The chart separates two concepts: the **complete project range** (derived from your task dates) and the **visible viewport window** (the readable slice on screen). Instead of squeezing every day/week/month into the available width, columns keep a sensible minimum width and the remainder of the project scrolls horizontally.

**Readable columns.** Each view mode targets a responsive number of visible columns and a minimum column width:

| View | Default visible | Min column width |
| :--- | :-------------- | :--------------- |
| Day | 7 days | 44px |
| Week | 4 weeks | 96px |
| Month | 1.7 months (one full + a peek) | 130px |

These counts fill the viewport at zoom 1; **zoom out to see more periods, zoom in to see fewer**. On narrow containers columns hold their minimum width and the timeline scrolls instead of shrinking. Override the default count with `visiblePeriodCount` or the floor with `minColumnWidth`.

**Range trimming.** The generated range aligns to period boundaries (weeks for Day/Week, months for Month) and trims unbounded empty space before and after the project. Internal gaps are always preserved so durations and dependency lines stay chronologically accurate — an empty Week 2 between tasks in Week 1 and Week 3 is kept. The boundary period containing the last task is always completed; `rangePadding` adds further empty periods after it if you want more navigation buffer. With no tasks, the current period is shown as context.

**Initial position & view switching.** The viewport opens on the current period when today falls inside the project range, otherwise on the earliest task's period. Switching Day / Week / Month preserves the date near the viewport centre (disable with `preserveCenterDate: false`) rather than jumping back to the start. Use `timelineStart` / `timelineEnd` to pin the range explicitly.

Column rendering is windowed with a small overscan, so long projects (months or years) stay smooth. Dragging, resizing, the today marker, milestones, and dependency connectors all remain correctly positioned while navigating.

---

## Imperative API

The chart deliberately ships **no chrome UI** (zoom controls, Today button, blocked legend). That keeps styling, placement, and behavior entirely in the parent's control. Hold a template ref to the chart and call its exposed methods; pair zoom with the `zoom-change` event to render accurate button states.

### Exposed methods (via `ref`)

| Method | Signature | Description |
| :----- | :-------- | :---------- |
| `zoomIn` | `() => void` | Increase zoom by `zoomStep`, centered on the viewport |
| `zoomOut` | `() => void` | Decrease zoom by `zoomStep`, centered on the viewport |
| `setZoom` | `(level: number) => void` | Jump to an absolute level (clamped to `minZoom`…`maxZoom`) |
| `resetZoom` | `() => void` | Reset zoom back to `1` |
| `scrollToToday` | `() => void` | Smooth-scroll the timeline to the today marker |
| `isTodayVisible` | `() => boolean` | Whether today falls inside the rendered date range |
| `getZoom` | `() => number` | Read the current zoom level |
| `toggleSidebar` | `() => void` | Collapse / expand the task sidebar |
| `isSidebarCollapsed` | `() => boolean` | Read whether the sidebar is collapsed |

### `GanttZoomState`

```ts
export interface GanttZoomState {
  zoom: number        // current zoom level
  canZoomIn: boolean  // zoom < maxZoom
  canZoomOut: boolean // zoom > minZoom
  min: number         // minZoom
  max: number         // maxZoom
}
```

### Example

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import GanttChart from '@/components/Chart/GanttChart.vue'
import type { GanttTask, GanttZoomState } from '@/components/Chart/types'

const gantt = ref<InstanceType<typeof GanttChart>>()
const tasks = ref<GanttTask[]>([/* ... */])
const zoom = ref<GanttZoomState>({ zoom: 1, canZoomIn: true, canZoomOut: true, min: 0.2, max: 5 })
const hasBlocked = computed(() => tasks.value.some((t) => t.blocked))
</script>

<template>
  <div class="controls">
    <span v-if="hasBlocked" class="legend-blocked">Blocked</span>
    <button :disabled="!gantt?.isTodayVisible()" @click="gantt?.scrollToToday()">Today</button>
    <button :disabled="!zoom.canZoomOut" @click="gantt?.zoomOut()">−</button>
    <button @click="gantt?.resetZoom()">{{ Math.round(zoom.zoom * 100) }}%</button>
    <button :disabled="!zoom.canZoomIn" @click="gantt?.zoomIn()">+</button>
  </div>

  <GanttChart ref="gantt" :tasks="tasks" @zoom-change="zoom = $event" />
</template>
```

Ctrl/⌘ + wheel (and trackpad pinch) zoom stays built in and is toggled by the `zoom` prop.

---

## Types

```ts
export type GanttViewMode = 'day' | 'week' | 'month'

/** User-facing type from the owning task's perspective */
export type GanttDependencyType = 'waiting-on' | 'blocking' | 'related-to'

export interface GanttTaskDependencyLink {
  taskId: string
  type: GanttDependencyType
}

export interface GanttTask {
  id: string
  name: string
  start: Date | string
  end: Date | string
  progress?: number
  color?: string
  group?: string
  /** Shorthand: predecessor IDs this task is waiting on (draws arrows) */
  dependencies?: string[]
  /** Typed links — `related-to` never draws arrows */
  dependencyLinks?: GanttTaskDependencyLink[]
  milestone?: boolean
  /** Presentational blocked state: hatched overlay, lock marker, tooltip line, legend chip */
  blocked?: boolean
  /** Short reason shown in the tooltip when `blocked` */
  blockedReason?: string
  /** People on the task — shown in the tooltip (1 → Persona, many → AvatarGroup) */
  assignees?: GanttPerson[]
}

export interface GanttPerson {
  name?: string      // display name → Persona label / AvatarGroup heading
  src?: string       // avatar image URL
  alt?: string       // image alt text
  fallback?: string  // initials shown when no image (auto-derived from name otherwise)
  role?: string      // secondary line → Persona secondaryLabel / AvatarGroup text
  presence?: 'online' | 'offline' | 'busy' | 'dnd' | 'away' // only for a single assignee
}
```

### Data notes

- `id` must be unique. Dependencies and arrows key off this value.
- `start` / `end` accept `Date` objects or date strings.
- Date-only strings (`YYYY-MM-DD`) are parsed as **local calendar days** (not UTC midnight), so bars align with timeline columns in every timezone.
- Prefer `formatGanttLocalDate` when persisting dates — avoid `toISOString().slice(0, 10)` (UTC shift).
- `progress` is `0`–`100`.
- `group` creates collapsible headers in the left sidebar.
- `dependencies` = IDs this task is **waiting on** (predecessors).
- `dependencyLinks` is the typed form. Only `waiting-on` / `blocking` draw arrows; `related-to` never does.
- Waiting on and Blocking are opposite views of one schedule edge — persist once.
- `milestone: true` renders a diamond. Milestones can be clicked, hovered, and used as link endpoints; they are not moved or resized.
- Tasks without `color` use the `colors` palette.
- `assignees` render in the tooltip: a single person shows as a `Persona` (name, role, presence), multiple stack as an `AvatarGroup`. Avatars use `src`, or initials derived from `name` (or an explicit `fallback`).

---

## Dates and timezone

Task dates are **local calendar days**. Layout and snapping use the same calendar-day helpers.

```ts
import { formatGanttLocalDate, parseGanttDate } from 'vlite3'

// Persist after @task-update
start: formatGanttLocalDate(changes.start) // "2026-04-08"

// Parse for comparisons
const day = parseGanttDate('2026-04-08') // local midnight
```

| Helper (public) | Purpose |
| :--- | :------ |
| `formatGanttLocalDate(d)` | `YYYY-MM-DD` in local time |
| `parseGanttDate(d)` | Parse `Date` / string as local calendar day |
| `ganttCalendarDaysBetween(a, b)` | Whole calendar days between two dates |
| `ganttDateToX(...)` | Map a date to timeline X (advanced layout) |

Also exported: `GANTT_DEPENDENCY_TYPE_LABELS`, and the payload / task types listed above.

---

## Move and resize (live preview)

With `draggable` (default `true`):

- Drag the **middle** of a bar to move it.
- Drag the **left** or **right** edge to resize.
- Milestones are not move/resize targets.
- Move and dependency linking cannot run at the same time.

### Live preview (temporary only)

While the pointer is down:

1. The bar’s visible **position and/or width** update continuously.
2. A date label above the bar shows the **previewed start — end** (same format family as the task tooltip).
3. Preview dates use the **same half-day snap and minimum-duration rules** as the final emit.
4. Preview stays aligned to timeline grid boundaries (geometry is derived from snapped dates, not a free CSS stretch that disagrees with dates).
5. The active resize handle stays on the moving edge.
6. The hover tooltip is suppressed during the gesture so it does not cover handles.
7. Horizontal auto-scroll continues near the viewport edges.
8. Screen readers receive throttled date updates via the chart’s live region.

The chart does **not**:

- Mutate `tasks` or overwrite the parent-controlled task object
- Keep a second persistent task collection
- Emit `@task-update` on every pointer move (emit once on successful release)

On **release**:

- If the snapped dates changed → emit `@task-update` once with the finalized `{ start, end }`
- Clear temporary preview state
- Parent-updated `tasks` become the permanent rendered state

On **cancel** (Escape, pointer cancel, unmount, or the task removed mid-gesture):

- Restore the original bar geometry
- Emit nothing

### Edge behavior

| Case | Behavior |
| :--- | :------- |
| Right-edge resize | End date and width change; start stays fixed |
| Left-edge resize | Start date, left position, and width change; end stays fixed |
| Minimum duration | Enforced for preview and emit (half-day floor) |
| One-day / short tasks | Remain visible (min width) and resizable |
| `cascadeDependencies` | Dependents follow the bar **visually during a move**; on release only the root task emits `@task-update` |
| `draggable: false` | No move/resize preview or emits |

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { GanttChart, formatGanttLocalDate, type GanttTask } from 'vlite3'

const tasks = ref<GanttTask[]>([/* ... */])

function onTaskUpdate(task: GanttTask, changes: { start: Date; end: Date }) {
  tasks.value = tasks.value.map((item) =>
    item.id === task.id
      ? {
          ...item,
          start: formatGanttLocalDate(changes.start),
          end: formatGanttLocalDate(changes.end),
        }
      : item,
  )
}
</script>

<template>
  <GanttChart :tasks="tasks" @task-update="onTaskUpdate" />
</template>
```

With `cascadeDependencies`, dependents follow the dragged bar as a **visual preview only**. On release the chart still emits exactly one `@task-update` for the root task — the parent (typically its server) owns the authoritative cascade and pushes the final dates for every affected task back through the `tasks` prop. Dependent movement is never persisted as N independent updates.

---

## Connector routing

Dependency arrows are routed by an obstacle-aware engine instead of a fixed elbow shape. Routing is purely visual — it never changes which edges exist or how scheduling behaves.

### How paths are chosen

- A finish-to-start edge leaves the predecessor's **right edge** and enters the successor's **left edge** (milestones use the diamond tips).
- For every edge the router generates several orthogonal candidates — a direct line, Z-shaped routes, and routes through the clear corridors between rows — then picks the cheapest by total length, number of turns, task-bar collisions, connector crossings, and viewport boundaries.
- Candidate verticals that would pass through a bar are slid sideways past it, so lines route **around** task bars rather than through bars, labels, lock markers, or resize handles.
- Corners are consistently rounded; no sharp or irregular turns.

### Dense graphs stay readable

- When several edges share a source or target, their exit / entry points are **distributed along the bar edge** so arrowheads never stack.
- Parallel connectors are assigned separate lanes with a minimum spacing; coincident segments are nudged apart deterministically.
- Where two connectors must cross, the later-routed line **hops** over the other with a small bridge arc instead of merging with it.
- Routing is deterministic: the same tasks and layout always produce identical paths — no jitter between renders. Paths recompute automatically on zoom, view-mode change, container resize, group collapse/expand, filtering, reordering, and task updates.

### Tracing a connector

- Hovering (or keyboard-focusing, with `editableDependencies`) a connector darkens the **whole line and arrowhead**; unrelated connectors are left untouched. Selecting a connector turns it yellow. No shadows or dimming.
- The pointer target is a wide invisible stroke, so connectors are easy to grab without a visually thick line.

### During interactions

While a bar is being moved or resized, connectors touching it follow with a **lightweight preview path** (no stale or frozen lines). The full obstacle-aware routing runs again once the gesture completes and the parent pushes updated `tasks`.

`related-to` links are unaffected by all of the above — they remain contextual, draw no arrow, and never participate in routing or scheduling.

---

## User-facing dependency types

| Type | Meaning | Gantt arrow? |
| :--- | :------ | :----------- |
| **Waiting on** | This task cannot proceed until the other completes | Yes (other → this) |
| **Blocking** | This task prevents the other from proceeding | Yes (this → other) — same edge as reverse Waiting on |
| **Related to** | Connected but non-blocking | No |

Selector pattern for parent UIs: `Type | Task` (e.g. `Waiting on | Task 1`).

```ts
import {
  GANTT_DEPENDENCY_TYPE_LABELS,
  type GanttDependencyType,
} from 'vlite3'

// "Waiting on | Planning"
`${GANTT_DEPENDENCY_TYPE_LABELS['waiting-on']} | ${task.name}`
```

PM / ERP mapping tip:

```ts
// Schedule-blocking edges → Gantt arrows
dependencies: waitingOnTaskIds

// related-to stays in profile UI only — do not put in dependencies[]
```

---

## Interactive dependency linking

Enable with `editableDependencies`. Separate from `showDependencies` (which only draws existing arrows).

### Pointer flow (create)

1. Hover or focus a task to reveal the `+` connector on its output edge (milestones included).
2. Grab the connector and drag toward another visible task.
3. A temporary dashed preview follows the pointer. Valid targets show a solid outline and ✓; invalid targets show a dashed outline and ✕.
4. Release on a valid target to emit `@dependency-create` once. Release on empty space, an invalid target, or press Escape to cancel without emitting.

### Select and delete

1. Click an existing dependency line to select it (yellow stroke + glow).
2. A yellow × appears at the line midpoint.
3. Click ×, or press Delete / Backspace, to emit `@dependency-delete` once.
4. Click empty chart space or press Escape to deselect without deleting.

### Keyboard flow (create)

1. Tab to a connector (`Create dependency from {task name}`).
2. Press Enter or Space to start linking.
3. Use Arrow keys to cycle visible targets; Enter/Space confirms; Escape cancels.
4. Status updates are announced through an `aria-live` region (not color alone).

### Validation (no success event when rejected)

| Rule | Behavior |
| :--- | :------- |
| Self-link | Rejected |
| Duplicate | Rejected if the successor already lists the predecessor |
| Circular | Rejected if the new edge would close a cycle |
| Collapsed / hidden tasks | Not hittable (only rows currently in the chart) |
| Chart without `editableDependencies` | No connectors; linking unavailable |

### Controlled persistence

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
  GanttChart,
  type GanttTask,
  type GanttDependencyCreatePayload,
  type GanttDependencyDeletePayload,
} from 'vlite3'

const tasks = ref<GanttTask[]>([
  { id: 'a', name: 'A', start: '2026-04-01', end: '2026-04-08' },
  { id: 'b', name: 'B', start: '2026-04-09', end: '2026-04-16' },
])

function onDependencyCreate(payload: GanttDependencyCreatePayload) {
  const { predecessorId, successorId } = payload
  tasks.value = tasks.value.map((task) => {
    if (task.id !== successorId) return task
    if (task.dependencies?.includes(predecessorId)) return task
    return {
      ...task,
      dependencies: [...(task.dependencies ?? []), predecessorId],
    }
  })
}

function onDependencyDelete(payload: GanttDependencyDeletePayload) {
  const { predecessorId, successorId } = payload
  tasks.value = tasks.value.map((task) => {
    if (task.id !== successorId || !task.dependencies?.length) return task
    const next = task.dependencies.filter((id) => id !== predecessorId)
    return {
      ...task,
      dependencies: next.length ? next : undefined,
    }
  })
}
</script>

<template>
  <GanttChart
    :tasks="tasks"
    editable-dependencies
    show-dependencies
    @dependency-create="onDependencyCreate"
    @dependency-delete="onDependencyDelete"
  />
</template>
```

Linking cancels safely on Escape, pointer cancel, unmount, disabling `editableDependencies`, or replacing `tasks` mid-gesture. Move/resize and linking cannot activate at the same time.

During linking, the task tooltip stays clear of the `+` connector (hides near/on the connector and while linking). Dependency linking auto-scrolls the timeline when the pointer approaches viewport edges.

---

## Full interactive example

Local state, view modes, drag/resize persistence, and dependency create/delete — same pattern as the playground demo.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
  GanttChart,
  formatGanttLocalDate,
  type GanttTask,
  type GanttViewMode,
  type GanttZoomState,
  type GanttDependencyCreatePayload,
  type GanttDependencyDeletePayload,
} from 'vlite3'

const initialTasks: GanttTask[] = [
  {
    id: 'task-1',
    name: 'Research & Planning',
    start: '2026-04-01',
    end: '2026-04-10',
    progress: 100,
    group: 'Phase 1 - Discovery',
    color: 'var(--color-chart-1)',
  },
  {
    id: 'task-2',
    name: 'Requirements Gathering',
    start: '2026-04-06',
    end: '2026-04-14',
    progress: 85,
    group: 'Phase 1 - Discovery',
    color: 'var(--color-chart-5)',
    dependencies: ['task-1'],
  },
  {
    id: 'milestone-1',
    name: 'Discovery Complete',
    start: '2026-04-18',
    end: '2026-04-19',
    group: 'Phase 1 - Discovery',
    milestone: true,
    color: '#f59e0b',
    dependencies: ['task-2'],
  },
]

const tasks = ref<GanttTask[]>(
  initialTasks.map((t) => ({
    ...t,
    dependencies: t.dependencies ? [...t.dependencies] : undefined,
  })),
)
const viewMode = ref<GanttViewMode>('week')
const lastAction = ref('')

// Parent owns the zoom UI — the chart exposes the methods
const gantt = ref<InstanceType<typeof GanttChart>>()
const zoom = ref<GanttZoomState>({ zoom: 1, canZoomIn: true, canZoomOut: true, min: 0.2, max: 5 })

const options = ref({
  rowHeight: 44,
  barRadius: 6,
  barHeight: 28,
  showGrid: true,
  showLabels: true,
  showTooltip: true,
  showProgress: true,
  showDependencies: true,
  showTodayLine: true,
  showHeader: true,
  animate: true,
  zoom: true,
  draggable: true,
  editableDependencies: true,
  cascadeDependencies: false,
})

function onTaskUpdate(task: GanttTask, changes: { start: Date; end: Date }) {
  tasks.value = tasks.value.map((item) =>
    item.id === task.id
      ? {
          ...item,
          start: formatGanttLocalDate(changes.start),
          end: formatGanttLocalDate(changes.end),
        }
      : item,
  )
}

function onDependencyCreate(payload: GanttDependencyCreatePayload) {
  const { predecessorId, successorId, predecessor, successor } = payload
  tasks.value = tasks.value.map((task) => {
    if (task.id !== successorId) return task
    if (task.dependencies?.includes(predecessorId)) return task
    return {
      ...task,
      dependencies: [...(task.dependencies ?? []), predecessorId],
    }
  })
  lastAction.value = `Linked: ${predecessor.name} → ${successor.name}`
}

function onDependencyDelete(payload: GanttDependencyDeletePayload) {
  const { predecessorId, successorId, predecessor, successor } = payload
  tasks.value = tasks.value.map((task) => {
    if (task.id !== successorId || !task.dependencies?.length) return task
    const next = task.dependencies.filter((id) => id !== predecessorId)
    return {
      ...task,
      dependencies: next.length ? next : undefined,
    }
  })
  lastAction.value = `Unlinked: ${predecessor.name} → ${successor.name}`
}

function onTaskClick(task: GanttTask) {
  lastAction.value = `Clicked: ${task.name}`
}

function resetTasks() {
  tasks.value = initialTasks.map((t) => ({
    ...t,
    dependencies: t.dependencies ? [...t.dependencies] : undefined,
  }))
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-wrap items-center gap-2">
      <button
        v-for="mode in (['day', 'week', 'month'] as const)"
        :key="mode"
        type="button"
        @click="viewMode = mode"
      >
        {{ mode }}
      </button>
      <button type="button" @click="resetTasks">Reset</button>

      <!-- Parent-driven zoom controls -->
      <button type="button" :disabled="!zoom.canZoomOut" @click="gantt?.zoomOut()">−</button>
      <button type="button" @click="gantt?.resetZoom()">{{ Math.round(zoom.zoom * 100) }}%</button>
      <button type="button" :disabled="!zoom.canZoomIn" @click="gantt?.zoomIn()">+</button>
    </div>

    <GanttChart
      ref="gantt"
      :tasks="tasks"
      :view-mode="viewMode"
      :row-height="options.rowHeight"
      :bar-radius="options.barRadius"
      :bar-height="options.barHeight"
      :show-grid="options.showGrid"
      :show-labels="options.showLabels"
      :show-tooltip="options.showTooltip"
      :show-progress="options.showProgress"
      :show-dependencies="options.showDependencies"
      :show-today-line="options.showTodayLine"
      :show-header="options.showHeader"
      :animate="options.animate"
      :zoom="options.zoom"
      :draggable="options.draggable"
      :editable-dependencies="options.editableDependencies"
      :cascade-dependencies="options.cascadeDependencies"
      @task-click="onTaskClick"
      @task-update="onTaskUpdate"
      @zoom-change="zoom = $event"
      @dependency-create="onDependencyCreate"
      @dependency-delete="onDependencyDelete"
    />

    <p v-if="lastAction">{{ lastAction }}</p>
  </div>
</template>
```

---

## Interaction notes

- Drag a bar to move; drag left/right edges to resize. Preview updates in real time; `@task-update` fires once on release.
- Snap is half-day increments for both preview and emit.
- `cascadeDependencies` moves dependents as a visual preview during a move; release still emits one root `@task-update`. The parent applies the authoritative cascade through the `tasks` prop.
- `editableDependencies`: use `+` to create; click a line to select/delete. Chart never mutates `dependencies`.
- Hovering a dependency arrow shows both relationship perspectives (`B is waiting on A · A is blocking B`); selecting the arrow shows the same text as an on-chart label.
- Tasks with `blocked: true` render a hatched overlay, dashed outline, and lock marker; the tooltip shows `blockedReason`. Render any "Blocked" legend chip yourself from `tasks` (e.g. `tasks.some(t => t.blocked)`).
- Zoom and Today are parent-driven via the exposed methods (`zoomIn`/`zoomOut`/`setZoom`/`resetZoom`/`scrollToToday`); use `isTodayVisible()` to enable/disable a Today button. Ctrl/Meta + wheel and pinch also zoom when `zoom` is enabled. Track zoom state with `@zoom-change`. Changing `viewMode` resets zoom. See the [Imperative API](#imperative-api).
- Hover tooltip shows task details (dates, duration, progress, group, blocked reason, and any `assignees`); with `editableDependencies` it stays clear of the `+` connector.
- Linking and resizing both auto-scroll near timeline edges.
- Accessibility: connectors and selection have keyboard paths; status messages use `aria-live`.
