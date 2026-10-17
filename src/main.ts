import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Style cascade: Fonts -> Tokens -> Base
import './assets/css/fonts.css'
import './assets/css/tokens.css'
import './assets/css/base.css'

// Disable browser scroll restoration to ensure fresh visits always begin at the hero section
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

const app = createApp(App)
app.use(router)
app.mount('#app')
