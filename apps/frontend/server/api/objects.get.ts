import { createDirectus, rest, readItems, staticToken } from '@directus/sdk'
import type { AstroObject } from '#shared/directus'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const client = createDirectus(config.public.directusUrl)
    .with(staticToken(config.directusAdminToken))
    .with(rest())
  console.log(`[Objects Proxy] Connecting to Directus at: ${config.public.directusUrl}`)
  console.log(`[Objects Proxy] Token present: ${!!config.directusAdminToken}`)
  try {
    const objects = await client.request(
      readItems('objects', {
        limit: -1, // fetch all
        fields: ['id', 'name', 'ra', 'dec'],
      })
    )
    console.log('[Objects Proxy] Successfully retrieved objects.')
    console.log('[Objects Proxy] retrieved:', JSON.stringify(objects))
    const astroObjects: AstroObject[] = objects as AstroObject[]
    return { data: astroObjects }
  } catch (error: any) {
    console.error('[Objects Proxy] Failed to fetch objects!', {
      message: error.message,
      code: error.code,
      stack: error.stack
    })
    throw createError({
      statusCode: 500,
      statusMessage: `Internal Proxy Error: ${error.message}`
    })
  }
})
