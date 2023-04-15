import {
	createRouter, createWebHistory, RouteRecordRaw
} from 'vue-router'
import GamesDashboard from '@pages/GamesDashboard.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/', redirect: '/games'
	},
	{
		path: '/games', component: GamesDashboard
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
