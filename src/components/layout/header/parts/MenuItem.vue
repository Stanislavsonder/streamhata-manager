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
				color="warning"
				:icon="option.icon"
			/>
			<span class="link__label">
				{{ option.label }}
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
	components: { RouterLink },
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
		padding: 0 8px;
		position: relative;

		&::after {
			content: '';
			position: absolute;
			width: 100%;
			transform: scaleX(0);
			height: 4px;
			bottom: -4px;
			left: 0;
			background-color: #14ca88;
			transform-origin: bottom right;
			transition: transform 0.25s ease-out;
		}

		&.active::after {
			transform: scaleX(1);
		}

		&:hover::after {
			transform: scaleX(1);
			transform-origin: bottom left;
		}

		&:not(:last-child) {
			margin-right: 20px;
		}

		.link {
			display: flex;
			align-items: center;
			text-decoration: none;
			font-size: 24px;

			&__label {
				margin-left: 8px;
			}
		}
	}
</style>
