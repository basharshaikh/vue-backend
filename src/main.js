import { createApp } from 'vue'
import App from './App.vue'
import router from '../src/routes'
import store from './store'

import './assets/main.css'

createApp(App).use(store).use(router).mount('#app')


