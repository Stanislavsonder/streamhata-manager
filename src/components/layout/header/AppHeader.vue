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
			<ul class="account-options">
				<li class="account-options__item">
					<v-btn @click="$i18n.locale = $i18n.locale === 'en' ? 'ru': 'en'">
						{{ $i18n.locale === 'en'? 'ru': 'en' }}
					</v-btn>
				</li>
				<li
					class="account-options__item"
				>
					<RouterLink
						class="link"
						to="#"
					>
						<v-btn
							color="text"
							variant="plain"
							icon=""
						>
							<v-icon
								size="40"
								icon="mdi-account-circle"
							/>
						</v-btn>
					</RouterLink>
				</li>
				<li
					class="account-options__item"
				>
					<RouterLink
						class="link"
						to="#"
					>
						<v-btn
							icon=""
							color="error"
							variant="plain"
						>
							<v-icon
								size="40"
								icon="mdi-exit-to-app"
							/>
						</v-btn>
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
	menuOptions: HeaderMenuOption[]
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
					label: 'header-menu__games',
					icon: 'mdi-controller',
					link: 'games',
				},
				{
					key: 'players',
					label: 'header-menu__players',
					icon: 'mdi-account-group',
					link: '#'
				},
				{
					key: 'sessions',
					label: 'header-menu__sessions',
					icon: 'mdi-television-shimmer',
					link: '#'
				},
				{
					key: 'image-searcher',
					label: 'header-menu__image-searcher',
					icon: 'mdi-television-shimmer',
					link: 'image-searcher'
				}
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
	// todo: change to var
	background-color: var(--surface);
	position: sticky;
	top: 0;
	z-index: 5;



	&__nav {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 16px;
	}
}

.main-menu, .account-options {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.account-options {
	&__item {
		&:not(:last-child) {
			margin-right: 20px;
		}
	}

	.link {
		text-decoration: none;
	}
}
</style>
