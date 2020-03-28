import Vue from 'vue'
import Router from 'vue-router'
import Standings from '../views/Standings.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/standings'
        },
        {
            path: '/standings',
            component: Standings
        }
    ]
})
