import Vue from 'vue'
import Router from 'vue-router'
import Standings from '../views/Standings.vue'
import Teams from '../views/Teams.vue'

Vue.use(Router)

const calendar = new Date();
const currentSeasonYear = (calendar.getMonth() > 7) ? (calendar.getFullYear() + 1) : calendar.getFullYear();
const currentSeason = `${currentSeasonYear - 1}${currentSeasonYear}`;

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/standings/'
        },
        {
            path: '/standings',
            redirect: `/standings/${currentSeason}`
        },
        {
            path: '/standings/:standingsSeason',
            redirect: `/standings/${currentSeason}/division`
        },
        {
            path: '/standings/:standingsSeason/:standingsCategory',
            component: Standings
        },
        {
            path: '/teams',
            redirect: '/teams/0'
        },
        {
            path: '/teams/:teamId',
            redirect: '/teams/0/schedule'
        },
        {
            path: '/teams/:teamId/:teamStatsCategory',
            component: Teams
        }
    ]
})
