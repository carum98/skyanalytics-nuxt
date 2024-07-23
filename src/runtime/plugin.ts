import skyanalytics from '@skyanalytics/js'
import type { SkyAnalyticsOptions } from '@skyanalytics/js/dist/types'
import type { DirectiveBinding } from 'vue'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

type HTMLElementWithRemoveListener = HTMLElement & { $removeListener: () => void }

export default defineNuxtPlugin({
  name: 'skyanalytics',
  setup(nuxtApp) {
    if (import.meta.server) {
      nuxtApp.vueApp.directive('sk-analytics', {})
      return
    }

    const options = useRuntimeConfig().public.skyanalytics as Required<SkyAnalyticsOptions>

    skyanalytics.init(options)

    nuxtApp.vueApp.directive('sk-analytics', {
      created: (el: HTMLElementWithRemoveListener, binding: DirectiveBinding<{ event: string, data?: object }>) => {
        async function send() {
          await skyanalytics.event({
            name: binding.value.event,
          })
        }

        el.addEventListener('click', send)
        el.$removeListener = () => {
          el.removeEventListener('click', send)
        }
      },
      unmounted: (el: HTMLElementWithRemoveListener) => {
        el.$removeListener()
      },
      getSSRProps: (binding: DirectiveBinding<{ event: string, data?: object }>) => {
        return {
          event: binding.value.event,
        }
      },
    })

    return {
      provide: {
        skyanalytics,
      },
    }
  },
})
