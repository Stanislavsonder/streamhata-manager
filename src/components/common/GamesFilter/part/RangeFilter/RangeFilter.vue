<template>
	<div class="range-filter">
		<v-text-field
			type="number"
			variant="outlined"
			:model-value="modelValue[0]"
			:min="min"
			:max="Math.min(modelValue[1], max)"
			:step="step"
			:prefix="$t('from')"
			:label="$t('from')"
			density="compact"
			hide-details
			@change="e => update(e.target.value, modelValue[1])"
			single-line
		/>
		<span class="range-filter__separator">
			-
		</span>
		<v-text-field
			type="number"
			variant="outlined"
			:model-value="modelValue[1]"
			:min="Math.max(min, modelValue[0])"
			:max="max"
			:step="step"
			:prefix="$t('to')"
			:label="$t('to')"
			density="compact"
			hide-details
			@change="e => update(modelValue[0], e.target.value)"
			single-line
		/>
	</div>
</template>

<script lang="ts">
import {
	defineComponent, PropType
} from 'vue'

export default defineComponent({
	name: 'RangeFilter',
	emits: ['update:modelValue'],
	props: {
		min: {
			type: Number as PropType<number>,
			required: true,
			default: 0
		},
		max: {
			type: Number,
			required: true,
			default: 100,
		},
		step: {
			type: Number,
			required: true,
			default: 1
		},
		modelValue: {
			type: Object as PropType<[number, number]>,
			required: true
		}
	},
	methods: {
		update(a: string | number, b: string | number) {
			this.$emit('update:modelValue', [
				Number(a),
				Number(b)
			])
		}
	}
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
