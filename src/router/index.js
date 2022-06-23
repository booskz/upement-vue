import Packet from '../components/Packet.vue'
import App from '../App.vue'
import NotFound from '../components/NotFound.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/', component: App },
    { path: '/packet', component: Packet },
    { path: '/:path(.*)', component: NotFound },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})
export default router