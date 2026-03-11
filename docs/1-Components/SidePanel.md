# SidePanel

**Import:** `import { SidePanel } from 'vlite3'`

### Props

| Prop                | Type                        | Default       | Description                        |
| :------------------ | :-------------------------- | :------------ | :--------------------------------- |
| `show`              | `boolean`                   | `false`       | Binding (`v-model:show`)           |
| `title`             | `string`                    | —             | Panel title                        |
| `titleI18n`         | `string`                    | —             | I18n key for title                 |
| `description`       | `string`                    | —             | Helper text below title            |
| `descriptionI18n`   | `string`                    | —             | I18n key for helper text           |
| `position`          | `SidePanelPosition`         | `right`       | Slide from `left` or `right`       |
| `size`              | `SidePanelSize`             | `md`          | Width preset (`sm` to `full`)      |
| `closeOutside`      | `boolean`                   | `true`        | Close on backdrop click            |
| `hideCloseButton`   | `boolean`                   | `false`       | Hide the 'X' button                |
| `mobileMenuVariant` | `'sidepanel' \| 'dropdown'` | `'sidepanel'` | Mobile menu style                  |
| `backdrop`          | `boolean`                   | `true`        | Show overlay                       |
| `class`             | `string`                    | —             | Custom container class             |
| `overlayClass`      | `string`                    | —             | Custom backdrop class              |
| `triggerClass`      | `string`                    | —             | Custom trigger element class       |
| `headerClass`       | `string`                    | —             | Custom header area class           |
| `bodyClass`         | `string`                    | —             | Custom internal body class         |
| `footerClass`       | `string`                    | —             | Custom footer area class           |
| `body`              | `Component`                 | —             | Component for lazy loading content |
| `bodyProps`         | `object`                    | —             | Props for the body component       |

### Types

```ts
type SidePanelPosition = 'left' | 'right'
type SidePanelSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'
```

### Events

- `@close`
- `@update:show`
- `@onOpen`
- `@onAfterOpen`: Animation complete
- `@onAfterClose`: Animation complete

### Slots

| Slot      | Description                     | Props                   |
| :-------- | :------------------------------ | :---------------------- |
| `trigger` | Clickable element to open panel | —                       |
| `header`  | Custom header content           | —                       |
| `default` | Body content                    | `{ close: () => void }` |
| `footer`  | Footer content                  | `{ close: () => void }` |

### Usage

```vue
<SidePanel title="Settings" position="right" size="lg">
  <template #trigger>
    <Button variant="ghost" icon="lucide:settings" />
  </template>

  <div class="p-4">
    <h4 class="font-medium">Account Settings</h4>
    <!-- settings controls -->
  </div>

  <template #footer="{ close }">
    <Button class="w-full" @click="close">Done</Button>
  </template>
</SidePanel>
```

#### Mobile Menu Dropdown Variant

```vue
<Navbar variant="header" mobile-menu-variant="dropdown" mobileBreakpoint="xl">
  <template #logo>Brand</template>
  <template #left>
    <Button variant="ghost">Home</Button>
    <Button variant="ghost">About</Button>
  </template>
  <template #right>
    <Button>Login</Button>
  </template>

  <!-- Custom mobile menu content -->
  <template #mobile-menu>
    <div class="flex flex-col p-2 space-y-2">
      <NavbarItem label="Home" />
      <NavbarItem label="About" />
      <Button class="w-full">Login</Button>
    </div>
  </template>
</Navbar>
```
