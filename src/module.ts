import { defineNuxtModule, addPlugin, createResolver, addImports } from '@nuxt/kit'
import type { SkyAnalyticsOptions } from '@skyanalytics/js/dist/types.js'
import { defu } from 'defu'
import { name, version } from '../package.json'

export default defineNuxtModule<SkyAnalyticsOptions>({
  meta: {
    name,
    version,
    configKey: 'skyanalytics',
  },
  defaults: {
    host: '',
    key: '',
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Add module options to public runtime config
    nuxt.options.runtimeConfig.public.skyanalytics = defu(
      nuxt.options.runtimeConfig.public.skyanalytics as Required<SkyAnalyticsOptions>,
      options,
    )

    // Add plugin
    addPlugin({
      src: resolve('runtime/plugin'),
    })

    // Add composable
    addImports({
      from: resolve('runtime/composables/useAnalytics'),
      name: 'useAnalytics',
    })
  },
})
