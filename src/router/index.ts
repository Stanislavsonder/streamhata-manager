import {
	createRouter, createWebHistory, RouteRecordRaw
} from 'vue-router'
import GamesDashboard from '@pages/GamesDashboard.vue'
import ImageSearcher from '@pages/ImageSearcher/ImageSearcher.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/', redirect: '/games'
	},
	{
		path: '/games', component: GamesDashboard
	},
	{
		path: '/image-searcher', component: ImageSearcher
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
