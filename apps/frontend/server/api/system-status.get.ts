import { createDirectus, rest } from '@directus/sdk'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const client = createDirectus(config.public.directusUrl).with(rest())
  console.log(`[Status Proxy] Attempting connection to Directus at: ${config.public.directusUrl}`)
  console.log(`[Status Proxy] Token present: ${!!config.directusAdminToken}`)
  try {
    const info = await client.request(() => ({
      path: '/server/info',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${config.directusAdminToken}`
      }
    }))
    console.log('[Status Proxy] Connection successful! Retrieved server info.')
    return info
  } catch (error: any) {
    console.error('[Status Proxy] Connection failed!', {
      message: error.message,
      code: error.code,
      stack: error.stack
    })
    throw createError({
      statusCode: 500,
      statusMessage: `Internal Proxy Connection Failed: ${error.message}`
    })
  }
})