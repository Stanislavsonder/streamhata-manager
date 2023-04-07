<template>
	<v-card class="filters-container">
		<v-card-title class="filters-container__title text-h4">
			<h3>Filters</h3>
		</v-card-title>

		<FilterContainer
			title="Release date"
			:default-value="EMPTY_FILTER.releaseDate"
			v-model:value="filters.releaseDate"
			v-model:exclude="filters.releaseDate.exclude"
		>
			<RangeFilter
				v-model="filters.releaseDate.value"
				:min="EMPTY_FILTER.releaseDate.value[0]"
				:max="EMPTY_FILTER.releaseDate.value[1]"
				:step="1"
			/>
		</FilterContainer>

		<FilterContainer
			title="Rarity"
			:default-value="EMPTY_FILTER.rarity"
			v-model:value="filters.rarity"
			v-model:exclude="filters.rarity.exclude"
		>
			<v-btn-toggle
				v-model="filters.rarity.value"
				color="primary"
				group
				divided
				multiple
			>
				<v-btn
					v-for="rarity in RARITIES"
					:key="rarity"
					class="filter__rarity-button"
					stacked
				>
					<template #prepend>
						<RarityIcon :style="{ fill: `var(--rarity-${rarity})`}" />
					</template>
					{{ $t(`rarity__${rarity}`) }}
				</v-btn>
			</v-btn-toggle>
		</FilterContainer>

		<FilterContainer
			title="Rarity"
			:default-value="EMPTY_FILTER.score"
			v-model:value="filters.score"
			v-model:exclude="filters.score.exclude"
		>
			<RangeFilter
				v-model="filters.score.value"
				:min="EMPTY_FILTER.score.value[0]"
				:max="EMPTY_FILTER.score.value[1]"
				:step="1"
			/>
		</FilterContainer>

		<FilterContainer
			title="Duration"
			:default-value="EMPTY_FILTER.duration"
			v-model:value="filters.duration"
			v-model:exclude="filters.duration.exclude"
		>
			<RangeFilter
				v-model="filters.duration.value"
				:min="EMPTY_FILTER.duration.value[0]"
				:max="EMPTY_FILTER.duration.value[1]"
				:step="1"
			/>
		</FilterContainer>

		<FilterContainer
			title="Tags"
			:default-value="EMPTY_FILTER.tags"
			v-model:value="filters.tags"
			v-model:exclude="filters.tags.exclude"
		>
			<v-autocomplete
				v-model="filters.tags.value"
				label="Select tags"
				:items="tags"
				variant="outlined"
				single-line
				chips
				clearable
				multiple
			/>
		</FilterContainer>

		<FilterContainer
			title="Platforms"
			:default-value="EMPTY_FILTER.platforms"
			v-model:value="filters.platforms"
			v-model:exclude="filters.platforms.exclude"
		>
			<v-autocomplete
				v-model="filters.platforms.value"
				label="Select platforms"
				chips
				variant="outlined"
				single-line
				clearable
				:items="platforms"
				multiple
			/>
		</FilterContainer>

		<FilterContainer
			title="Platforms"
			:default-value="EMPTY_FILTER.imageSource"
			v-model:value="filters.imageSource"
		>
			<v-card-item>
				<v-btn-toggle
					v-model="filters.imageSource.exist"
					color="primary"
					group
					density="compact"
				>
					<v-btn>
						Any
					</v-btn>
					<v-btn>
						Exist
					</v-btn>
					<v-btn>
						Not Exist
					</v-btn>
				</v-btn-toggle>
			</v-card-item>
			<v-card-item class="filter__image-section">
				<v-card-title class="filter__title text-h6">
					<h6>
						Quality
					</h6>
					<v-switch
						class="filter__exclude"
						inline
						hide-details
						density="compact"
						label="Exclude"
						color="primary"
						v-model="filters.imageSource.quality.exclude"
					/>
				</v-card-title>
				<v-range-slider
					class="filter__slider"
					:min="EMPTY_FILTER.imageSource.quality[0]"
					:max="EMPTY_FILTER.imageSource.quality[1]"
					thumb-label
					step="0.1"
					show-ticks="always"
					v-model="filters.imageSource.quality"
				/>
			</v-card-item>
			<v-card-item class="filter__image-section">
				<v-card-title class="filter__title text-h6">
					<h6>
						Aspect ratio
					</h6>
					<v-switch
						class="filter__exclude"
						inline
						hide-details
						density="compact"
						label="Exclude"
						color="primary"
						v-model="filters.imageSource.aspectRatio.exclude"
					/>
				</v-card-title>

				<v-range-slider
					class="filter__slider"
					:min="EMPTY_FILTER.imageSource.aspectRatio[0]"
					:max="EMPTY_FILTER.imageSource.aspectRatio[1]"
					thumb-label
					step="0.1"
					show-ticks="always"
					v-model="filters.imageSource.aspectRatio"
				/>
			</v-card-item>
		</FilterContainer>


		<v-card-actions class="filters-container__buttons">
			<v-btn
				@click="clearAll"
				variant="text"
			>
				Clear all
			</v-btn>
			<v-btn
				variant="tonal"
				color="primary"
				@click="applyFilters"
			>
				Apply
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
import {
	defineComponent, PropType
} from 'vue'
import {
	allEnumItems, copy
} from '@utils/utils'
import {
	Filter, Platform, Tag
} from '@types'
import {
	EMPTY_FILTER, RARITIES
} from '@constants'
import FilterContainer from '@components/common/GamesFilter/part/FilterContainer/FilterContainer.vue'
import RarityIcon from '@components/ui/customIcons/RarityIcon.vue'
import RangeFilter from '@components/common/GamesFilter/part/RangeFilter/RangeFilter.vue'


export default defineComponent({
	name: 'GamesFilter',
	components: {
		RangeFilter,
		RarityIcon,
		FilterContainer,
	},
	emits: ['apply'],
	props: {
		initialFilters: {
			type: Object as PropType<Filter>,
			required: false,
			default: undefined
		}
	},
	data() {
		return {
			filters: this.initialFilters || copy(EMPTY_FILTER),
		}
	},
	computed: {
		RARITIES() {
			return RARITIES
		},
		EMPTY_FILTER() {
			return EMPTY_FILTER
		},
		tags() {
			return allEnumItems(Tag)
		},
		platforms() {
			return allEnumItems(Platform)
		},
	},
	methods: {
		clearAll() {
			this.filters = copy(EMPTY_FILTER)
		},
		applyFilters() {
			this.$emit('apply', copy(this.filters))
		},
	}
})
</script>

<style scoped lang="scss">
.filters-container {
	margin: 48px;
	padding: 12px 24px;
	display: flex;
	flex-direction: column;
	gap: 24px;

	&__title {
		margin-bottom: 8px;
		text-align: left;
	}

	&__buttons {
		justify-content: flex-end;
	}
}

.filter {
		&__image-section {
		text-align: left;
	}

	&__rarity-button {
		svg {
			width: 24px;
			height: 24px;
		}
	}
}
</style>


<style lang="scss">
// Fix for sliders
.v-slider-thumb {
	left: var(--v-slider-thumb-position)!important;
	transform: translate(-50%, -50%)!important;
}
</style>
