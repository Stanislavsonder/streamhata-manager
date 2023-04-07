<template>
	<v-card
		variant="outlined"
		class="filter-container"
	>
		<v-card-title class="filter-container__title text-h6">
			{{ title }}
			<v-switch
				v-if="typeof exclude !== 'undefined'"
				class="filter-container__exclude"
				color="primary"
				label="Exclude"
				density="compact"
				hide-details
				inline
				:model-value="exclude"
				@change="$emit('update:exclude', !exclude)"
			/>
			<v-btn
				:disabled="snapshot === defaultSnapshot"
				variant="text"
				@click="clear"
			>
				Clear
			</v-btn>
		</v-card-title>
		<v-card-item>
			<slot />
		</v-card-item>
	</v-card>
</template>

<script lang="ts">
import { copy } from '@/utils/utils'
import {
	defineComponent, PropType
} from 'vue'

export default defineComponent({
	name: 'FilterContainer',
	emits: [
		'update:value',
		'update:exclude'
	],
	props: {
		title: {
			type: String,
			required: true
		},
		exclude: {
			type: Boolean,
			required: false,
			default: undefined
		},
		value: {
			type: Object as PropType<unknown>,
			required: true
		},
		defaultValue: {
			type: Object as PropType<unknown>,
			required: false,
			default: undefined
		}
	},
	computed: {
		snapshot() {
			return JSON.stringify(this.value)
		},
		defaultSnapshot() {
			return JSON.stringify(this.defaultValue)
		}
	},
	methods: {
		clear() {
			console.log(this.defaultValue)
			this.$emit('update:value', copy(this.defaultValue))
		}
	}

})
</script>

<style scoped lang="scss">
.filter-container {
	&__title {
		display: flex;
		justify-content: space-between;
		width: 100%;
		gap: 16px;
		align-items: center;
		margin-bottom: 24px;
	}

	&__exclude {
		flex: unset;
		margin-left: auto;
	}
}
</style>
