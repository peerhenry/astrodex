<script setup lang="ts">
/**
 * We fetch through the SSR proxy route `/api/objects`
 * so the Directus admin token never reaches the browser.
 */
const { data, pending, error } = useFetch('/api/objects')
</script>

<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">Astronomical Objects</h1>

    <div v-if="pending" class="text-gray-500">
      Loading objects…
    </div>

    <div v-else-if="error" class="text-red-600">
      Failed to load objects.
    </div>

    <ul v-else-if="data" class="space-y-3">
      <li
        v-for="obj in data.data"
        :key="obj.id"
        class="border-b pb-2"
      >
        <strong class="text-lg">{{ obj.name }}</strong>
        <div class="text-gray-600">
          RA: {{ obj.ra }}°, Dec: {{ obj.dec }}°
        </div>
      </li>
    </ul>

    <div v-else class="text-gray-500">
      No objects found.
    </div>
  </div>
</template>
