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
				<li class="account-menu__item account">
					<RouterLink
						class="link"
						to="#"
					>
						<NIcon
							size="48"
							:component="AccountIcon"
						/>
					</RouterLink>
				</li>
				<li class="account-menu__item">
					<RouterLink
						class="link"
						to="#"
					>
						<NIcon
							size="48"
							:component="LogOutIcon"
						/>
					</RouterLink>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
	SportsEsportsRound as GamesIcon, 
	GroupRound as PlayersIcon, 
	AmpStoriesRound as SessionsIcon, 
	ManageAccountsRound as AccountIcon,
	LogOutRound as LogOutIcon
} from '@vicons/material'
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

.account-menu {
	&__item {
		padding: 0 8px;

		&:not(:last-child) {
			margin-right: 20px;
		}
	}
}
</style>
