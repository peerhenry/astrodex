import { createDirectus, rest } from '@directus/sdk'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const client = createDirectus(config.public.directusUrl).with(rest())
  try {
    const info = await client.request(() => ({
      path: '/server/info',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${config.directusAdminToken}`
      }
    }))
    return info
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Internal Proxy Connection Failed: ${error.message}`
    })
  }
})