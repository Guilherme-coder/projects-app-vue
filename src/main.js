import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'
import { useUserStore } from './stores/userStore'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(bootstrap)
app.use(createPinia())

const storedUser = JSON.parse(localStorage.getItem('user'))
if (storedUser) {
  useUserStore().setUser(storedUser)
}

app.use(router)

app.mount('#app')
