# Vue Event Calendar

A powerful, feature-rich Vue 3 calendar component with support for multiple views (Month, Week, Day), drag-and-drop functionality, event management, and real-time interactions. Built with TypeScript and optimized for performance.

## Features

- **Multiple View Types**: Month, Week, and Day views with seamless switching
- **Event Management**: Create, edit, delete, and drag-and-drop events
- **Drag & Drop**: Move events between dates and time slots with visual feedback
- **Event Resizing**: Resize events by dragging handles in week/day views
- **Real-time Updates**: Live current time indicator and automatic refreshing
- **Responsive Design**: Mobile-friendly with touch support
- **Customizable**: Flexible styling, time formats, and event rendering
- **Accessibility**: ARIA attributes and keyboard navigation support
- **TypeScript Support**: Fully typed for enhanced developer experience
- **Performance Optimized**: Efficient rendering and memory management

## Basic Usage

```vue
<script setup>
import { ref } from 'vue'
import { Calendar } from 'vlite3'

const events = ref([
   {
      id: '1',
      title: 'Team Meeting',
      start: '2025-01-20T10:00:00.000Z', // Uses ISO format
      end: '2025-01-20T11:00:00.000Z',
      backgroundColor: '#3b82f6',
      textColor: '#ffffff',
   },
])

const handleEventClick = (event) => {
   console.log('Event clicked:', event)
}

const handleEventCreate = ({ date, start, end }) => {
   const newEvent = {
      id: Date.now().toString(),
      title: 'New Event',
      start,
      end,
      backgroundColor: '#10b981',
      textColor: '#ffffff',
   }
   events.value.push(newEvent)
}

const handleEventUpdate = ({ eventId, start, end }) => {
   const eventIndex = events.value.findIndex((e) => e.id === eventId)
   if (eventIndex !== -1) {
      events.value[eventIndex] = {
         ...events.value[eventIndex],
         start,
         end,
      }
   }
}
</script>

<template>
	<Calendar
		:events="events"
		:can-add="true"
        :can-edit="true"
		@eventClick="handleEventClick"
		@eventCreate="handleEventCreate"
		@eventUpdate="handleEventUpdate" />
</template>
```

## Props

| Prop                 | Type                          | Default   | Description                                               |
| -------------------- | ----------------------------- | --------- | --------------------------------------------------------- |
| `events`             | `any[]`                       | `[]`      | Array of calendar events to display                       |
| `loading`            | `boolean`                     | `false`   | Show loading state                                        |
| `canAdd`             | `boolean`                     | `false`   | Enable/disable event creation functionality               |
| `canEdit`            | `boolean`                     | `false`   | Enable/disable event editing functionality                |
| `canDelete`          | `boolean`                     | `false`   | Enable/disable event deletion functionality               |

## Events

| Event         | Parameters                                            | Description                          |
| ------------- | ----------------------------------------------------- | ------------------------------------ |
| `eventClick`  | `event: any`                                          | Fired when an event is clicked       |
| `eventCreate` | `{ date: Date, start: string, end?: string }`         | Fired when a new event is created    |
| `eventUpdate` | `{ eventId: string, start: string, end?: string }`    | Fired when an event is updated/moved |
| `eventEdit`   | `event: any`                                          | Fired when edit action is clicked    |
| `eventDelete` | `event: any`                                          | Fired when delete action is clicked  |
| `dayClick`    | `date: Date`                                          | Fired when a calendar day is clicked |
| `dateChange`  | `date: Date`                                          | Fired when the current date changes  |
