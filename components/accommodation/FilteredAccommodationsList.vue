<template>
  <div class="flex flex-col">
    <!--    Titles row-->
    <div class="grid grid-cols-1 gap-1">
          <span
            :class="{'hidden':accommodations.meta.total === 0 && !isLoading}"
            class="text-sm text-gray-800 font-light">
            {{ accommodations.meta.total }} {{ $t('catalog.total_solutions') }}
          </span>
      <h1 class="text-2xl font-medium"
          v-if="accommodations.result_type === 'direct' && accommodations.data.length && !isFilteredByCoordinates">
        {{ $t('catalog.your_search_in') }}: <span class="capitalize">{{ searchTitle }}</span>
      </h1>
      <h1 class="text-2xl font-medium" v-if="['proximity'].includes(accommodations.result_type)">
        {{ $t('catalog.solutions_around') }}
        <span class="capitalize">{{ searchTitle }}</span>
      </h1>
      <div v-if="['suggestions'].includes(accommodations.result_type) && accommodations.data.length">
        <h1 class="text-2xl font-medium" v-if="['proximity','suggestions'].includes(accommodations.result_type)">
          {{ $t('catalog.no_solutions') }}:
          <span class="capitalize">{{ searchTitle }}</span>
        </h1>
        <span class="text-base font-normal">{{ $t('catalog.suggestions_message') }}</span>
      </div>
    </div>
    <!--    Filters row-->
    <div class="flex flex-row w-full mt-6"
         :class="{'hidden':!Object.keys(this.filters).filter(x => !this.filtersToNotConsider.includes(x)).length > 0 && accommodations.data.length === 0 && !isLoading}">
      <div class="flex items-start">
        <div class="flex mr-2">
          <div class="gsr-filters-row-items">
            <div class="flex-grow"
                 v-for="attribute in filterableAttributes.filter(item => item.type === 'BOOLEAN' || item.type === 'TAG')">
              <div class="w-full">
                <GsrButton
                  v-if="attribute.type==='TAG'"
                  class="w-full flex justify-center"
                  border="rounded"
                  variant="outline"
                  :key="attribute.id"
                  :selected="filters.tags===attribute.key"
                  @click="onTagAttributeInput(attribute,filters.tags!==attribute.key ? true:!filters.tags)"
                >
                  <div class="m-auto flex flex-row items-center space-x-1">
                    <svg-icon class="h-4 w-4" name="hashtag"/>
                    <span class="capitalize text-sm font-normal">{{ attribute.name }}</span>
                  </div>
                </GsrButton>
                <GsrButton
                  v-else
                  class="w-full flex justify-center"
                  border="rounded"
                  variant="outline"
                  :key="attribute.id"
                  :selected="filters[attribute.key] || filters[attribute.key] === 'true'"
                  @click="onFilterClick(attribute.key)"
                >
                  <div class="m-auto">
                    <span class="capitalize text-sm font-normal">{{ attribute.name }}</span>
                  </div>
                </GsrButton>
              </div>
            </div>
          </div>
        </div>
        <GsrButton
          border="rounded"
          class="flex justify-center"
          variant="outline"
          @click="isFiltersDialogOpen = true">
          <div class="m-auto">
            <span class="capitalize text-sm font-normal">{{ $t('catalog.filters') }}</span>
          </div>
        </GsrButton>
      </div>
    </div>

    <!--    Results list-->
    <div v-if="isLoading && accommodations.meta.current_page === 1 && this.filters.page === 1" :class="{['gsr-'+this.viewType]: true}">
      <div class="w-full" v-for="index in 16" :key="index">
        <div class="mt-6 mb-6 w-full">
          <div class="border-b border-gray-100" v-if="viewType !== 'grid'"></div>
        </div>
        <GsrSkeletonCard :direction="cardDirection"/>
      </div>
    </div>
    <div class="w-full pb-2 gsr-infinite-wrapper overflow-auto" v-else>
      <div v-if="accommodations.data.length" class="mt-6 mb-6" :class="{['gsr-'+this.viewType]: true}">
        <template v-for="accommodation in accommodations.data">
            <div class="border-b border-gray-300 mb-4" v-if="viewType !== 'grid'"></div>
            <GsrAccommodationCard @mouseover.native="onMouseOver(accommodation)" @mouseleave.native="onMouseLeave"
                                :query-string="computedAccommodationCardQueryString" :direction="cardDirection"
                                :data="accommodation"/>
        </template>
      </div>
      <div v-else class="mt-12">
        <!--        Check if there's active filters-->
        <div v-if="Object.keys(this.filters).filter(x => !this.filtersToNotConsider.includes(x)).length > 0"
             class="flex flex-col">
          <span class="text-2xl font-medium">{{ $t('common.no_results') }}</span>
          <span class="text-base font-normal">{{ $t('catalog.try_adjust_search_message') }}</span>
          <div class="mt-8">
            <GsrButton @click="onResetFilters">
              {{ $t('common.remove_all_filters') }}
            </GsrButton>
          </div>
        </div>
        <div v-else class="flex flex-col">
          <span class="text-2xl font-medium">{{ $t('common.no_results') }}</span>
          <span class="text-base font-normal">{{ $t('catalog.try_adjust_search_message_no_filters') }}</span>
          <div class="mt-8">
            <GsrButton variant="outline" @click="onShowBest">
              {{ $t('catalog.show_our_best') }}
            </GsrButton>
          </div>
        </div>
      </div>
    </div>
    <!-- Load more villas -->
    <!-- TODO: localization -->
    <GsrButton v-if="accommodations.data.length >= 20" type="button" class="m-auto mb-5"
              :disabled="isLoading"
              :loading="isLoading"
              @click.prevent="onPaginationChange"
              >
            <span>Load more</span>
    </GsrButton>
    <!--    Filters dialog-->
    <GsrDialog
      :title="$t('catalog.filters.dialog_title')"
      :opened="isFiltersDialogOpen"
      @close="isFiltersDialogOpen = false"
    >
      <div class="flex flex-col w-full">
        <span class="font-medium text-xl mb-4">{{ $t('catalog.filters.beds_and_bedrooms') }}</span>
        <div v-for="attribute in filterableAttributes.filter(item => item.type === 'INTEGER')" :key="attribute.id"
             class="flex flex-row items-center mt-4 justify-between">
          <span class="w-full">{{ attribute.name }}</span>
          <div class="w-36">
            <GsrInputNumber @input="_fetchData(false)" readonly :max="20" v-model="filters[attribute.key]"/>
          </div>
        </div>
        <!-- Tags -->
        <div class="border-b text-gray-200 w-full my-8"></div>
        <span class="font-medium text-xl mb-4">{{ $t('catalog.filters.tags') }}</span>
        <div v-for="attribute in filterableAttributes.filter(item => item.type === 'TAG')" :key="attribute.id"
             class="flex flex-row items-center mt-4 justify-between">
          <span class="w-full capitalize">{{ attribute.name }}</span>
          <div class="w-36">
            <GsrToggle @input="onTagAttributeInput(attribute,$event)" :value="filters.tags===attribute.key"/>
          </div>
        </div>
        <!-- Services -->
        <div class="border-b text-gray-200 w-full my-8"></div>
        <span class="font-medium text-xl mb-4">{{ $t('catalog.filters.services') }}</span>
        <div v-for="attribute in filterableAttributes.filter(item => item.type === 'BOOLEAN')" :key="attribute.id"
             class="flex flex-row items-center mt-4 justify-between">
          <span class="w-full capitalize">{{ attribute.name }}</span>
          <div class="w-36">
            <GsrToggle @input="_fetchData(false)" v-model="filters[attribute.key]"/>
          </div>
        </div>
      </div>
      <template v-slot:footer>
        <div class="w-full flex flex-row items-center justify-between">
          <GsrButton @click="onResetFilters" variant="text">{{ $t('catalog.filters.cancel_filters') }}</GsrButton>
          <GsrButton @click="_fetchData(false);isFiltersDialogOpen = false" :loading="isLoading">
            {{ accommodations.meta.total }} {{
              $t('catalog.filters.results')
            }}
          </GsrButton>
        </div>
      </template>
    </GsrDialog>
  </div>
</template>

<script>
import {filtersHandler} from "@/mixins/filtersHandler";
import {identity, pickBy} from "lodash";

export default {
  name: "FilteredAccommodationsList",
  scrollToTop: true,
  mixins: [filtersHandler],
  props: {
    entities: {
      type: Object,
      default: () => {
      },
    },
    filterableAttributes: {
      type: Array,
      default: () => [],
      required: true,
    },
    permalink: {
      type: String,
      default: '',
    },
    searchTitle: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'permalink'
    },
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
    additionalFilters: {
      type: Object,
      default: () => {
      },
      required: false
    },
  },
  data() {
    return {
      accommodations: {
        data: [],
        meta: {
          current_page: 1,
          total: 0
        },
      },
      filters: {
        page: 1,
        per_page: 20,
      },
      filtersToNotConsider: ['page', 'per_page', 'without_permalink', 'adults', 'radius'],
      isLoading: true,
      hasFiltersSet: false,
      isFiltersDialogOpen: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      // window.scrollTo(0, 0);
    // Set route query inside filters
      if (this.$route.query) {
        this.filters = {...this.filters, ...this.$route.query}
        this._fetchData(true)
        return;
      }
      if (!this.entities) {
        this._fetchData(true)
      } else {
        if (!this.entities.data.length) {
          this._fetchData(true)
        } else {
          this.isLoading = false
          this.accommodations = this.entities;
          this.$emit('change', this.entities);
        }
      }
      })
  },
  computed: {
    /**
     * @desc Get query string
     * @returns {string}
     */
    computedAccommodationCardQueryString() {
      return new URLSearchParams(this.$route.query).toString()
    },
    /**
     * @desc I doesn't work for some reason
     * @returns {boolean}
     */
    computedIsAccommodationsCounterVisible() {
      // If is destination always
      const conditions = ['destination']
      if (conditions.some(el => this.$route.name.includes(el))) {
        return true
      }
      // If has adults and is greater than 1 return true, because we always have adults=1
      let adults = this.filters.adults
      if (adults && !isNaN(adults) && parseInt(adults) > 1) {
        return true;
      }
      return !!Object.keys(this.filters).filter(x => !['page', 'per_page', 'without_permalink', 'adults'].includes(x)).length
    },
    /**
     * @desc Calculate if is filtered by coordinates
     * @returns {null}
     */
    isFilteredByCoordinates() {
      return this.filters.latitude || this.filters.longitude
    }
  },
  watch: {
    additionalFilters: {
      deep: true,
      handler(val, oldVal) {
        let valueCleared = pickBy(val, identity)
        this.filters = {...this.filters, ...valueCleared}
        this._fetchData()
      }
    },
  },
  methods: {
    /**
     * @desc Reset pagination and data
     */
    resetPagination() {
      this.filters.page = 1
      this.accommodations.data = []
      this.accommodations.meta.current_page = 1
      window.scrollTo(0, 0);
    },

    /**
     * @desc Show best accommodations by position
     */
    onShowBest() {
      this.filters.latitude = 41.09708442331975
      this.filters.longitude = 9.522473663091661
      this.filters.radius = 16
      this._fetchData()
    },
    /**
     * @desc On element mouse over
     * @param item
     */
    onMouseOver(item) {
      if (item) {
        this.$emit('over', item.id)
      } else {
        this.onMouseLeave()
      }
    },
    /**
     * @desc On element mouse leave
     */
    onMouseLeave() {
      this.$emit('leave')
    },

    /**
     * @desc On filter click
     * @param key
     */
    onFilterClick(key) {
      if (this.filters[key]) {
        this.filters[key] = !this.filters[key]
      } else {
        this.filters[key] = true
      }
      this._fetchData()
    },

    /**
     * @desc Reset filters to initial state
     * @returns {Promise<void>}
     */
    onResetFilters() {
      this.isFiltersDialogOpen = false
      if ('without_permalink' in this.filters) {
        this.filters = {
          page: 1,
          per_page: 20,
          without_permalink: true,
        }
      } else {
        this.filters = {
          page: 1,
          per_page: 20
        }
      }
      this._fetchData()
    },

    onTagAttributeInput(attribute, value) {
      if (!value) {
        delete this.filters.tags
      } else {
        this.filters.tags = attribute.key;
      }
      this._fetchData(false)
    },
    /**
     * @desc On pagination change
     * @returns {Promise<void>}
     * @param $state
     */
    async onPaginationChange($state) {
      //Check if there's enough elements for paginate again
      if (this.accommodations.links.next) {
        this.filters.page++;
        this.isLoading = true
        const query = this._toQuery()
        try {
          if (this.type === 'permalink' && !this.filters.latitude && !this.filters.longitude) {
            const result = await this.$services.accommodations.getAccommodationsPermalinkCatalog(this.permalink, this.$i18n.locale, query)
            this.accommodations.data = this.accommodations.data.concat(result.data)
            this.accommodations.meta = result.meta
            this.accommodations.links = result.links
          } else {
            const result = await this.$services.accommodations.getAccommodationsFlexibleCatalog(this.$i18n.locale, query)
            this.accommodations.data = this.accommodations.data.concat(result.data)
            this.accommodations.meta = result.meta
            this.accommodations.links = result.links
          }
          this.$emit('change', this.accommodations);
          this.isLoading = false
        } catch (e) {
          this.$toast.error(this.$t('error.generic'))
        } finally {
          // $state.loaded()
          this.loading = false
        }
      } else {
        $state.complete()
      }
    },

    /**
     * @desc search data
     * @returns {Promise<void>}
     */
    async _fetchData(silently = false) {
      this.filters.page = 1
      const query = this.toQuery(silently, ['page', 'per_page']);
      this.isLoading = true;
      try {
        if (this.type === 'permalink' && !this.filters.latitude && !this.filters.longitude) {
          this.accommodations = await this.$services.accommodations.getAccommodationsPermalinkCatalog(this.permalink, this.$i18n.locale, query)
        } else {
          this.accommodations = await this.$services.accommodations.getAccommodationsFlexibleCatalog(this.$i18n.locale, query)
        }
        this.$gtm.push({event: 'browseAccomodation', ...this.filters})
        this.$emit('change', this.accommodations);
      } catch (e) {
        this.$toast.error(this.$t('error.generic'))
      } finally {
        this.isLoading = false
      }
    },

    /**
     * @desc Create query string with filters
     * @returns {string}
     * @private
     */
    _toQuery() {
      let queryString = ''
      let attributes = []
      for (const [key, value] of Object.entries(this.filters)) {
        if (value === 0 || value === false) {
          delete this.filters[key];
        } else {
          if (value === true) {
            attributes.push(key)
          } else {
            queryString ? queryString += `&${key}=${value}` : queryString += `${key}=${value}`
          }
        }
      }
      if (attributes.length) {
        queryString ? queryString += `&attributes=${attributes.join()}` : queryString += `attributes=${attributes.join()}`
      }
      return queryString;
    }
  }
}
</script>

<style lang="scss" scoped>
.gsr-grid {
    @apply grid grid-cols-1 gap-4 w-full;
    @screen md {
        @apply grid-cols-2;
    }
    @screen lg {
        @apply grid-cols-3;
    }
    @screen xl {
        @apply grid-cols-4;
    }
}

.gsr-filters-row-items {
    @apply flex flex-wrap overflow-hidden space-x-2;
    height: 2.7rem;
}

.gsr-filters-row-items > * {
    margin: 0 0 1em 0;
}

</style>
