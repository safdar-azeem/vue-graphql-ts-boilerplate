<script setup lang="ts">
import { Icon } from 'vlite3'
</script>

<template>
	<div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
		<div class="w-full max-w-md bg-white rounded-xl border overflow-hidden">
			<div
				class="bg-muted p-6 border-b border-gray-100 text-center flex items-center justify-center gap-3">
				<div class="flex justify-center">
					<div
						class="h-10 w-10 bg-primary text-primary-fg rounded-full flex items-center justify-center shadow-md">
						<Icon
							icon="lucide:box"
							class="h-6 w-6" />
					</div>
				</div>
				<h2 class="text-2xl font-bold text-gray-900">Builto App</h2>
			</div>

			<div class="p-6">
				<router-view />
			</div>
		</div>
	</div>
</template>
