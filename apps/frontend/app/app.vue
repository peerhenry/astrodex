<!-- app/app.vue -->
<script setup lang="ts">
// Now safely auto-imported and backed by the plugin lifecycle
const { client } = useDirectus()

const { data: serverInfo, error } = await useAsyncData('directus-status', () => {
  return client.request(() => ({
    path: '/server/info',
    method: 'GET',
  }))
})

console.log('serverInfo:', JSON.stringify(serverInfo.value))
</script>

<template>
  <div style="font-family: sans-serif; padding: 2rem; max-width: 600px; margin: 0 auto;">
    <h1>🔭 AstroDex Connectivity Test</h1>
    <hr />

    <div v-if="error" style="background: #ffeded; color: #a90000; padding: 1rem; border-radius: 4px;">
      <h3>Connection Failed</h3>
      <p>{{ error.message }}</p>
    </div>

    <div v-else-if="serverInfo" style="background: #eef9f2; color: #1e6636; padding: 1rem; border-radius: 4px;">
      <h3>⚡ Connected to Directus successfully!</h3>
      <p><strong>Directus Version:</strong> {{ (serverInfo as any).version }}</p>
      <p><strong>Database Engine:</strong> {{ (serverInfo as any).database }}</p>
    </div>
  </div>
</template>