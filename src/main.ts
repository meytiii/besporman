import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Style cascade: Fonts -> Tokens -> Base
import './assets/css/fonts.css'
import './assets/css/tokens.css'
import './assets/css/base.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
