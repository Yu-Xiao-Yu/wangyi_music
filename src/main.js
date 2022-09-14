import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import getVant from './plugins/index'

const app = createApp(App)
getVant(app)
app.use(store).use(router).use(Vant).mount('#app')


