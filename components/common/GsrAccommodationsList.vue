<template>
  <div>
    <!--    Results list-->
    <div v-if="isLoading && ('meta' in accommodations && accommodations.meta.current_page === 1)"
         :class="{['gsr-'+this.viewType]: true}"
    >
      <div class="w-full" v-for="index in 16" :key="index">
        <div class="mt-6 mb-6 w-full">
          <div class="border-b border-gray-100" v-if="viewType !== 'grid'"></div>
        </div>
        <GsrSkeletonCard :direction="cardDirection"/>
      </div>
    </div>
    <div v-else class="w-full gsr-infinite-wrapper">
      <div v-if="'data' in accommodations && accommodations.data.length" :class="{['gsr-'+this.viewType]: true}">
        <template v-for="accommodation in accommodations.data">
          <div class="mt-6 mb-6 w-full">
            <div class="border-b border-gray-300" v-if="viewType !== 'grid'"></div>
          </div>
            <GsrAccommodationCard
              @mouseover.native="onMouseOver(accommodation)"
              @mouseleave.native="onMouseLeave"
              :query-string="computedAccommodationCardQueryString"
              :direction="cardDirection"
              :data="accommodation"
            />
        </template>
      </div>
      <div v-if="!isLoading" class="flex flex-col mt-12">
        <span class="text-2xl font-medium">{{ $t('common.no_results') }}</span>
        <span class="text-base font-normal">{{ $t('catalog.try_adjust_search_message') }}</span>
        <div class="mt-8">
          <GsrButton @click="onResetFilters">
            {{ $t('common.remove_all_filters') }}
          </GsrButton>
        </div>
      </div>
    </div>
    <!--    Pagination-->
    <client-only>
      <infinite-loading
        v-if="!isLoading"
        :identifier="infiniteId"
        spinner="spiral"
        @infinite="onInfinite"
      >
        <div slot="spinner" class="pt-4">
          <GsrLoader class="py-2"/>
        </div>
        <div slot="no-more"></div>
        <div slot="no-results"></div>
      </infinite-loading>
    </client-only>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration';
export default {
  name: "GsrAccommodationsList",
  components: {
    GsrLoader: () => import('@/components/common/GsrLoader'),
    GsrSkeletonCard: () => import('@/components/cards/GsrSkeletonCard'),
    GsrButton: () => import('@/components/common/GsrButton'),
    GsrAccommodationCard: () => import('@/components/cards/GsrAccommodationCard'),
    LazyHydrate,
  },
  props: {
    viewType: {
      type: String,
      validator: value => ['list', 'grid'].includes(value),
      default: 'list',
    },
    cardDirection: {
      type: String,
      validator: value => ['auto', 'horizontal', 'vertical'].includes(value),
      default: 'auto',
    },
    divider: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    infiniteId: {
      type: Number,
      default: 0
    },
    accommodations: {
      type: Object,
    }
  },
  computed: {
    /**
     * @desc Computed query string for cards
     * @returns {string}
     */
    computedAccommodationCardQueryString() {
      return new URLSearchParams(this.$route.query).toString()
    },
  },
  methods: {
    /**
     * @desc On infinite callback
     * @param $state
     */
    onInfinite($state) {
      this.$emit('onInfinite', $state)
    },
    /**
     * @desc On mouse over
     * @param accommodation
     */
    onMouseOver(accommodation) {
      if (accommodation) {
        this.$emit('onMouseOver', accommodation.id)
      } else {
        this.onMouseLeave()
      }
    },
    /**
     * @desc On mouse over
     */
    onMouseLeave() {
      this.$emit('onMouseLeave')
    },
    /**
     * @desc On reset fitlers
     */
    onResetFilters() {
      this.$emit('onResetFilters')
    },
  }
}
</script>

<style lang="scss" scoped>
.gsr-grid {
  @apply grid grid-cols-1 gap-4 w-full;
  @screen md {
    @apply grid-cols-2;
  }
  @screen xl {
    @apply grid-cols-4;
  }
}
</style>
