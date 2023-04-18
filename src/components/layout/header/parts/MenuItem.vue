<template>
	<li
		class="menu-item"
		:class="{ active: isActive }"
	>
		<RouterLink
			class="link"
			:to="option.link"
		>
			<v-icon
				class="link__icon"
				size="48"
				:icon="option.icon"
			/>
			<span class="link__label">
				{{ $t(option.label) }}
			</span>
		</RouterLink>
	</li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PropType } from 'vue'
import { RouterLink } from 'vue-router'
import { HeaderMenuOption } from '@/types'

export default defineComponent({
	name: 'MenuItem',
	components: {
		RouterLink
	},
	props: {
		option: {
			type: Object as PropType<HeaderMenuOption>,
			required: true
		},
		isActive: {
			type: Boolean
		}
	}
})
</script>

<style scoped lang="scss">
	.menu-item {
		&:not(:last-child) {
			margin-right: 20px;
		}

		.link {
			display: flex;
			align-items: center;
			text-decoration: none;
			font-size: 24px;
			color: var(--text-secondary);
			transition: color 0.5s ease-out;
			position: relative;
			padding: 0 12px;

			&__label {
				margin-left: 8px;
				font-weight: 400;
			}

			&::after {
				content: '';
				position: absolute;
				width: 0;
				height: 4px;
				bottom: -8px;
				left: 0;
				border-radius: 12px;
				background-color: var(--detail);
				transform-origin: bottom right;
				transition: width 0.5s ease-out;
			}

			&:hover {
				color: var(--text);
			}

			&.router-link-active {
				color: var(--text);
			}

			&.router-link-active::after {
				width: 100%;
			}

			&:hover::after {
				width: 100%;
			}
		}
	}
</style>
