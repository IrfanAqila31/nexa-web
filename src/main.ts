import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './main.css'
import 'vue-sonner/style.css'

import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vue3GoogleLogin, {
  clientId: '145889547180-0tuvpugnui1rauie33e8fjv3cp5c7ja3.apps.googleusercontent.com',
})

app.mount('#app')
