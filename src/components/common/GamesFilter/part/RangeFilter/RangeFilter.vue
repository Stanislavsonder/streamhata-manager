<template>
	<div class="range-filter">
		<v-text-field
			type="number"
			variant="outlined"
			v-model="tmpValue[0]"
			:min="min"
			:max="Math.min(tmpValue[1], max as number)"
			:step="step"
			prefix="From"
			label="From"
			density="compact"
			hide-details
			single-line
		/>
		<span class="range-filter__separator">
			-
		</span>
		<v-text-field
			type="number"
			variant="outlined"
			v-model="tmpValue[1]"
			:min="Math.max(min as number, tmpValue[0])"
			:max="max"
			:step="step"
			prefix="To"
			label="To"
			density="compact"
			hide-details
			single-line
		/>
	</div>
	<v-range-slider
		class="range-filter__slider"
		:model-value="[
			tmpValue[0], tmpValue[1]
		]"
		:step="step as number"
		:min="min as number"
		:max="max as number"
		show-ticks="always"
		@change="value => tmpValue = value"
	/>
</template>

<script lang="ts">
import {
	defineComponent
} from 'vue'

export default defineComponent({
	name: 'RangeFilter',
	emits: ['update:modelValue'],
	props: {
		min: {
			type: Number,
			default: 0
		},
		max: {
			type: Number,
			default: 100
		},
		step: {
			type: Number,
			default: 1
		},
		modelValue: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			tmpValue: this.modelValue? [
				this.modelValue[0],
				this.modelValue[1]
			] : [
				this.min,
				this.max
			]
		}
	},
	watch: {
		tmpValue(value) {
			console.log(this.tmpValue)
			this.$emit('update:modelValue', [value[0],
				value[1]])
		}
	},
})
</script>

<style scoped lang="scss">
.range-filter {
	display: flex;
	justify-content: space-between;
	margin-bottom: 8px;

	&__separator {
		display: grid;
		place-content: center;
		padding: 0 24px;
	}

	&__slider {
		padding: 0 12px;
	}
}
</style>
