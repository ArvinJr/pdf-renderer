import { CreateUI } from '@demo/ui'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import '@demo/ui/style.css'

createApp(App)
  .use(router)
  .use(CreateUI())
  .mount('#app')
