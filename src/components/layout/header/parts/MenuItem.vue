<template>
	<li
		class="menu-item"
		:class="{ active: isActive }"
	>
		<RouterLink
			class="link"
			:to="option.link"
		>
			<NIcon
				class="link__icon"
				size="48"
				:component="option.icon"
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
import { NIcon } from 'naive-ui'
import { HeaderMenuOption } from '@/types'

export default defineComponent({
	name: 'MenuItem',
	components: {
		NIcon, RouterLink
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
		padding: 0 8px;
		border-radius: 10px;

		&:not(:last-child) {
			margin-right: 20px;
		}

		&.active {
			background-color: aqua;
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
