/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { pinia } from './plugins/pinia'
import { vMaska } from 'maska/vue'
// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'
import type { maska } from 'maska/svelte'

const app = createApp(App)

registerPlugins(app)

app.use(pinia)
app.directive('maska', vMaska)

app.mount('#app')
