# SkyAnalytics Nuxt
SkyAnalytics Nuxt is an adapter for [SkyAnalytics](https://github.com/carum98/skyanalytics) that allows you to track your website's traffic and user behavior.

## Installation
```bash
npm install https://github.com/carum98/skyanalytics-nuxt
```

```typescript
// `nuxt.config.ts`
export default defineNuxtConfig({
  modules: ['@skyanalytics/nuxt'],
  skyanalytics: {
    key: 'source_key',
    host: 'http://localhost:3000'
  },
});
```

## Usage

### Directives
```html
<button v-sk-analytics="{ event: 'click', data: { key: 'value' } }">Click me</button>
```

### Composable
```typescript
const analytics = useAnalytics()

function send() {
  analytics.event('event_name', { key: 'value' })
}
```
