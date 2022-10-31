import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory } from 'vue-router'

import EquipmentPage from './views/EquipmentPage.vue'
import OverViewPage from './views/OverViewPage.vue'
import PaymentPage from './views/PaymentPage.vue'
import ReportPage from './views/ReportPage.vue'
import SystemPage from './views/SystemPage.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

const routes = [
    { path: '/overview', component: OverViewPage },
    { path: '/equipment', component: EquipmentPage },
    { path: '/payment', component: PaymentPage },
    { path: '/report', component: ReportPage },
    { path: '/system', component: SystemPage },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App).use(router, VueAxios, axios).mount('#app')
