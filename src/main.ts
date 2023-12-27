import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import mdiVue from 'mdi-vue/v3'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import * as mdijs from '@mdi/js'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('VueDatePicker', VueDatePicker);

app.use(createPinia())
app.use(mdiVue, { icons: mdijs })
app.use(router)

app.mount('#app')
