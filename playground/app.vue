<template>
  <div>
    Nuxt module playground!

    <button @click="sendComposable">
      Send composable
    </button>

    <button v-sk-analytics="{ event: 'sendDirective' }">
      Send directive
    </button>
  </div>
</template>

<script setup>
const analytics = useAnalytics()

function sendComposable() {
  analytics.event('sendComposable')
}
</script>
