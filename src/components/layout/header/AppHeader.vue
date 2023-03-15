<template>
	<header
		class="header"
		inverted
		bordered
	>
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
				<MenuItem
					v-for="option in accountOptions"
					:key="option.link"
					:option="option"
					:is-active="option.key === activeOptionKey"
					@click="changeTab(option.key)"
				/>
			</ul>
		</nav>
	</header>
</template>

<script lang="ts">
import {
	VideogameAssetFilled as GamesIcon, 
	GroupsFilled as PlayersIcon, 
	CameraOutdoorRound as SessionsIcon, 
	ManageAccountsRound as AccountIcon,
	LogOutRound as LogOutIcon
} from '@vicons/material'
import { HeaderMenuOption } from '@/types'
import MenuItem from './parts/MenuItem.vue'
import { defineComponent } from 'vue'
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
					icon: GamesIcon,
					link: '#',
				},
				{
					key: 'players',
					label: 'Players',
					icon: PlayersIcon,
					link: '#'
				},
				{
					key: 'sessions',
					label: 'Sessions',
					icon: SessionsIcon,
					link: '#'
				},
			],
			accountOptions: [
				{
					key: 'profile',
					label: 'Profile',
					icon: AccountIcon,
					link: '#'
				},
				{
					key: 'logout',
					icon: LogOutIcon,
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
</style>
