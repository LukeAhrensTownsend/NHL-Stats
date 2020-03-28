import Vue from 'vue'
import Router from 'vue-router'
import DivisionStandings from '../components/DivisionStandings.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/standings'
        },
        {
            path: '/standings',
            component: DivisionStandings
        }
    ]
})
