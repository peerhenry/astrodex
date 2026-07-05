<script setup lang="ts">
const { data: serverInfo, error } = await useFetch('/api/system-status')
</script>

<template>
  <div style="font-family: sans-serif; padding: 2rem; max-width: 600px; margin: 0 auto;">
    <h1>🔭 AstroDex Connectivity Test</h1>
    <hr />

    <div v-if="error" style="color: red;">
      <h3>Proxy Connection Failed</h3>
    </div>

    <!-- The complete data payload renders perfectly now! -->
    <div v-else-if="serverInfo" style="background: #eef9f2; color: #1e6636; padding: 1rem;">
      <h3>⚡ Connected via Secure Server Bridge!</h3>
      <p><strong>Version:</strong> {{ (serverInfo as any).version }}</p>
      <p><strong>Database:</strong> {{ (serverInfo as any).database }}</p>
      <p><strong>Websocket Enabled:</strong> {{ (serverInfo as any).websocket ? 'Yes' : 'No' }}</p>
    </div>
  </div>
</template>