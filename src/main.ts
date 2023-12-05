import { createApp } from 'vue'
import './style.css'
import { surveyPlugin } from 'survey-vue3-ui'
import App from './App.vue'

createApp(App).use(surveyPlugin).mount('#app')