# StatusChip

**Import:** `import { StatusChip } from 'vlite3'`

A smart wrapper around `Chip` that automatically resolves a status string to the correct color variant and icon. Handles normalization of casing and delimiters — `in_progress`, `InProgress`, `IN-PROGRESS`, and `In Progress` all map to the same chip.

Label text always stays on a single line. Width sizes to content and does not shrink or wrap in tables, flex columns, or other constrained containers.

### Props

| Prop          | Type                             | Default   | Description                                               |
| :------------ | :------------------------------- | :-------- | :-------------------------------------------------------- |
| `status`      | `string`                         | **required** | Status value to resolve (e.g. `'active'`, `'in_progress'`) |
| `label`       | `string`                         | —         | Override the resolved display label                       |
| `labelI18n`   | `string`                         | —         | i18n translation key for the label (takes priority over `label`) |
| `hideIcon`    | `boolean`                        | `false`   | Hide the auto-resolved icon even when one is mapped       |
| `size`        | `'xsmall' \| 'small' \| 'medium' \| 'large'` | `small`   | Size passed through to the underlying `Chip`              |
| `appearance`  | `'filled' \| 'transparent'`      | `filled`  | Surface style passed to `Chip` — see [Appearance](#appearance) |
| `class`       | `string`                         | `''`      | Additional CSS classes applied to the root                |

### Appearance

| Value         | Description                                                                 |
| :------------ | :-------------------------------------------------------------------------- |
| `filled`      | Default. Status color resolves to a filled chip (background + border)       |
| `transparent` | Status still resolves color and icon automatically, but only text/icon are colored — no background or border |

Status resolution is unchanged: `appearance` only controls the surface treatment of the underlying `Chip`.

### Status Normalization

The `status` value is normalized before lookup: lowercased, and all `-`, `_`, and spaces are stripped. This means the following all resolve identically:
```
'in_progress'  →  'inprogress'
'InProgress'   →  'inprogress'
'IN-PROGRESS'  →  'inprogress'
'In Progress'  →  'inprogress'
```

### Resolved Status Groups

**Network & HTTP**

| Status value   | Variant     |
| :------------- | :---------- |
| `pending`      | `warning`   |
| `success`      | `success`   |
| `redirect`     | `warning`   |
| `client-error` | `orange`    |
| `server-error` | `danger`    |
| `failed`       | `danger`    |
| `blocked`      | `danger`    |
| `cancelled`    | `pink`      |

**Payments & ERP / Finance**

| Status value       | Variant   |
| :----------------- | :-------- |
| `paid`             | `success` |
| `unpaid`           | `danger`  |
| `pending`          | `warning` |
| `partially_paid`   | `cyan`    |
| `refunded`         | `pink`    |
| `reversed`         | `pink`    |
| `overdue`          | `orange`  |
| `void` / `voided`  | `secondary`|
| `cancelled`        | `pink`    |
| `invoiced`         | `indigo`  |
| `billed`           | `indigo`  |
| `unbilled`         | `warning` |
| `quoted`           | `cyan`    |
| `cleared`          | `success` |
| `reconciled`       | `success` |
| `unreconciled`     | `warning` |
| `posted`           | `success` |
| `unposted`         | `secondary`|
| `settled`          | `success` |
| `authorized`       | `success` |
| `unauthorized`     | `danger`  |

**CRM & Sales**

| Status value   | Variant    |
| :------------- | :--------- |
| `prospecting`  | `indigo`   |
| `qualification`| `purple`   |
| `proposal`     | `cyan`     |
| `negotiation`  | `orange`   |
| `contacted`    | `blue`     |
| `qualified`    | `success`  |
| `won`          | `success`  |
| `lost`          | `danger`   |
| `closed_won`   | `success`  |
| `closed_lost`  | `danger`   |

**Orders & Fulfillment**

| Status value    | Variant   |
| :-------------- | :-------- |
| `confirmed`     | `success` |
| `processing`    | `info`    |
| `in_progress`   | `info`    |
| `dispatched`    | `cyan`    |
| `in_transit`    | `purple`  |
| `shipped`       | `teal`    |
| `delivered`     | `teal`    |
| `completed`     | `success` |
| `rejected`      | `danger`  |

**HR & Recruiting**

| Status value   | Variant    |
| :------------- | :--------- |
| `present`      | `success`  |
| `absent`       | `danger`   |
| `active`       | `success`  |
| `inactive`     | `secondary`|
| `on_hold`      | `orange`   |
| `terminated`   | `danger`   |
| `suspended`    | `pink`     |
| `hired`        | `success`  |
| `interviewing` | `indigo`   |
| `shortlisted`  | `teal`     |
| `offered`      | `purple`   |
| `onboarding`   | `info`     |
| `probation`    | `warning`  |
| `promoted`     | `success`  |
| `relocated`    | `cyan`     |

**Communication & Presence**

| Status value   | Variant    |
| :------------- | :--------- |
| `incoming`     | `blue`     |
| `outgoing`     | `indigo`   |
| `missed`       | `danger`   |
| `online`       | `success`  |
| `offline`      | `secondary`|
| `in_person`    | `indigo`   |

**Inventory & Stock**

| Status value    | Variant   |
| :-------------- | :-------- |
| `in_stock`      | `success` |
| `low_stock`     | `warning` |
| `out_of_stock`  | `danger`  |
| `available`     | `success` |
| `fulfilled`     | `success` |
| `archived`      | `secondary`|

**Payment Methods**

| Status value   | Variant    |
| :------------- | :--------- |
| `cash`         | `success`  |
| `check`        | `blue`     |
| `card`         | `purple`   |
| `transfer`     | `cyan`     |

**Tasks & Approvals**

| Status value         | Variant   |
| :------------------- | :-------- |
| `todo`               | `secondary`|
| `in_review`          | `info`    |
| `approved`           | `success` |
| `done`               | `success` |
| `awaiting_approval`  | `warning` |
| `partially_approved` | `warning` |

**Priority & Severity**

| Status value         | Variant   |
| :------------------- | :-------- |
| `critical`           | `danger`  |
| `high`               | `danger`  |
| `urgent`             | `danger`  |
| `medium`             | `warning` |
| `normal`             | `secondary`|
| `minor`              | `secondary`|
| `trivial`            | `secondary`|
| `low`                | `secondary`|

**Boolean & Logic**

| Status value | Variant   |
| :----------- | :-------- |
| `yes`        | `success` |
| `no`         | `danger`  |
| `true`       | `success` |
| `false`      | `danger`  |

> Unknown statuses fall back to the `secondary` variant with the status string formatted as a readable label (e.g. `some_custom_status` → `Some Custom Status`).

### Usage
```vue
<!-- Auto-resolved (filled — default) -->
<StatusChip status="active" />
<StatusChip status="in_progress" />
<StatusChip status="cancelled" />

<!-- Transparent — semantic text/icon only -->
<StatusChip status="active" appearance="transparent" />
<StatusChip status="in_progress" appearance="transparent" />
<StatusChip status="cancelled" appearance="transparent" />

<!-- Network status with an HTTP response label -->
<StatusChip status="client-error" label="404 Not Found" appearance="transparent" />

<!-- Custom label override -->
<StatusChip status="active" label="Live" />
<StatusChip status="pending" label="Awaiting Review" />

<!-- i18n label -->
<StatusChip status="active" label-i18n="statuses.active" />

<!-- Hide icon -->
<StatusChip status="completed" :hide-icon="true" />

<!-- Sizes -->
<StatusChip status="active" size="xsmall" />
<StatusChip status="active" size="small" />
<StatusChip status="pending" size="medium" />
<StatusChip status="cancelled" size="large" />

<!-- Normalization — all render identically -->
<StatusChip status="in_progress" />
<StatusChip status="InProgress" />
<StatusChip status="IN-PROGRESS" />
<StatusChip status="In Progress" />
```
