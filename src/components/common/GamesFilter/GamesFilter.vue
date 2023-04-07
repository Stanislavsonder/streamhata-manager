<template>
	<v-card class="filters-container">
		<v-card-title class="filters-container__title text-h4">
			<h3>{{ $t('filters') }}</h3>
		</v-card-title>

		<!-- Release date -->
		<FilterContainer
			:title="$t('release-date')"
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

		<!-- Rarity -->
		<FilterContainer
			:title="$t('rarity')"
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

		<!-- Score -->
		<FilterContainer
			:title="$t('score')"
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

		<!-- Duration -->
		<FilterContainer
			:title="$t('duration')"
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

		<!-- Tags -->
		<FilterContainer
			:title="$t('tags')"
			:default-value="EMPTY_FILTER.tags"
			v-model:value="filters.tags"
			v-model:exclude="filters.tags.exclude"
		>
			<v-autocomplete
				v-model="filters.tags.value"
				:label="$t('select-tags')"
				:items="tags"
				variant="outlined"
				single-line
				chips
				clearable
				multiple
			/>
		</FilterContainer>

		<!-- Platforms -->
		<FilterContainer
			:title="$t('platforms')"
			:default-value="EMPTY_FILTER.platforms"
			v-model:value="filters.platforms"
			v-model:exclude="filters.platforms.exclude"
		>
			<v-autocomplete
				v-model="filters.platforms.value"
				:label="$t('select-platforms')"
				chips
				variant="outlined"
				single-line
				clearable
				:items="platforms"
				multiple
			/>
		</FilterContainer>

		<!-- Image -->
		<FilterContainer
			:title="$t('image')"
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
						{{ $t('any') }}
					</v-btn>
					<v-btn>
						{{ $t('with') }}
					</v-btn>
					<v-btn>
						{{ $t('without') }}
					</v-btn>
				</v-btn-toggle>
			</v-card-item>
			<v-card-item class="filter__image-section">
				<v-card-title class="filter__title text-h6">
					<h6>
						{{ $t('quality') }}
					</h6>
					<v-switch
						class="filter__exclude"
						inline
						hide-details
						density="compact"
						:label="$t('exclude')"
						color="primary"
						v-model="filters.imageSource.quality.exclude"
					/>
				</v-card-title>
				<RangeFilter
					v-model="filters.imageSource.quality.value"
					:min="EMPTY_FILTER.imageSource.quality.value[0]"
					:max="EMPTY_FILTER.imageSource.quality.value[1]"
					:step="0.1"
				/>
			</v-card-item>
			<v-card-item class="filter__image-section">
				<v-card-title class="filter__title text-h6">
					<h6>
						{{ $t('aspect-ratio') }}
					</h6>
					<v-switch
						class="filter__exclude"
						inline
						hide-details
						density="compact"
						:label="$t('exclude')"
						color="primary"
						v-model="filters.imageSource.aspectRatio.exclude"
					/>
				</v-card-title>
				<RangeFilter
					v-model="filters.imageSource.aspectRatio.value"
					:min="EMPTY_FILTER.imageSource.aspectRatio.value[0]"
					:max="EMPTY_FILTER.imageSource.aspectRatio.value[1]"
					:step="0.1"
				/>
			</v-card-item>
		</FilterContainer>

		<v-card-actions class="filters-container__buttons">
			<v-btn
				@click="clearAll"
				variant="text"
			>
				{{ $t('clear-all') }}
			</v-btn>
			<v-btn
				variant="tonal"
				color="primary"
				@click="applyFilters"
			>
				{{ $t('apply') }}
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
