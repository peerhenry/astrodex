import { createDirectus, rest } from '@directus/sdk'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  // Safely initialize the Directus REST client exactly once during boot
  const client = createDirectus(config.public.directusUrl).with(rest())

  return {
    provide: {
      directus: client
    }
  }
})