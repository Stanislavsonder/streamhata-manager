<template>
	<header class="header">
		<nav class="header__nav">
			<ul class="main-menu">
				<MenuItem
					v-for="option in menuOptions"
					:key="option.link"
					:option="option"
					:is-active="option.key === activeOptionKey"
					@click="changeTab(option.key)"
				/>
			</ul>
			<ul class="account-menu">
				<li
					class="account-menu__item account"
					v-for="option in accountOptions"
					:key="option.key"
				>
					<RouterLink
						class="link"
						to="#"
					>
						<v-icon
							size="48"
							icon="mdi-controller"
						/>
					</RouterLink>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script lang="ts">
import {
	defineComponent,
} from 'vue'

import { HeaderMenuOption } from '@/types'
import MenuItem from './parts/MenuItem.vue'

interface Data {
	menuOptions: HeaderMenuOption[],
	accountOptions: HeaderMenuOption[],
	activeOptionKey: string
}

export default defineComponent({
	name: 'AppHeader',
	components: {
		MenuItem
	},
	data(): Data {
		return {
			activeOptionKey: '',

			menuOptions: [
				{
					key: 'games',
					label: 'Games',
					icon: 'mdi-controller',
					link: '#',
				},
				{
					key: 'players',
					label: 'Players',
					icon: 'mdi-controller',
					link: '#'
				},
				{
					key: 'sessions',
					label: 'Sessions',
					icon: 'mdi-controller',
					link: '#'
				},
			],
			accountOptions: [
				{
					key: 'profile',
					label: 'Profile',
					icon: 'mdi-controller' ,
					link: '#'
				},
				{
					key: 'logout',
					icon: 'mdi-controller',
					link: '#',
				},
			]
		}
	},
	methods: {
		changeTab(key: string) {
			this.activeOptionKey = key
		}
	}
})
</script>

<style scoped lang="scss">
.header {
	&__nav {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 16px 32px;
	}
}

.main-menu, .account-menu {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.account-menu {
	&__item {
		padding: 0 8px;

		&:not(:last-child) {
			margin-right: 20px;
		}
	}
}
</style>
