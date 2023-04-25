import {
	createRouter, createWebHistory, RouteRecordRaw
} from 'vue-router'
import GamesDashboard from '@pages/GamesDashboard/GamesDashboard.vue'
import ImageSearcher from '@pages/ImageSearcher/ImageSearcher.vue'
import GameOverview from '@pages/GameOverview/GameOverview.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/', redirect: '/games'
	},
	{
		path: '/games', component: GamesDashboard
	},
	{
		path: '/games/:gameId', component: GameOverview
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
