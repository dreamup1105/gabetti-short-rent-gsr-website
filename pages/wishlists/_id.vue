<template>
  <GsrMapLayout>
    <template v-slot:left>
      <!--      Actions row-->
      <div class="flex flex-row items-center justify-between mb-6 -mx-4">
        <nuxt-link class="p-4 hover:bg-gray-100 rounded-full" :to="localePath('/wishlists')">
          <svg-icon class="h-4 w-4" name="arrow-left"/>
        </nuxt-link>
        <div class="p-4 hover:bg-gray-100 rounded-full cursor-pointer" @click="onOpenEditDialog">
          <svg-icon class="h-4 w-4" name="horizontal-dots"/>
        </div>
      </div>
      <div class="flex flex-row justify-start">
        <GsrLoader v-show="isLoading"/>
        <h1 v-show="!isLoading">{{ form.title }}</h1>
      </div>
      <!--      Filters row-->
      <div
        class="flex flex-col md:flex-row items-center space-y-4 md:space-x-4 md:space-y-0 w-full mt-6 w-full md:w-11/12 xl:w-4/5">
        <div class="flex border border-gray-200 rounded-full w-full p-2 px-4">
          <GsrGuestsDropdown class="w-full" v-model="form.guests">
            <div class="flex flex-row items-center border-t border-gray-200 py-2 w-full">
              <GsrButton @click.native="onEdit" class="w-full" :disabled="isLoading" :loading="isLoading">
                <div class="flex justify-center py-2 w-full">
                  <span class="m-auto">{{ $t('common.save') }}</span>
                </div>
              </GsrButton>
            </div>
          </GsrGuestsDropdown>
        </div>
        <div class="flex border border-gray-200 rounded-full w-full p-2 px-4">
          <GsrDatepicker
            ref="datepicker"
            checkOutLabel=""
            :starting-date-value="form.date.start"
            :ending-date-value="form.date.end"
            @input="onEdit"
            v-model="form.date"
          />
        </div>
      </div>
      <!--    Results list-->
      <div v-show="isLoading">
        <div class="w-full" v-for="index in 4" :key="index">
          <div class="mt-6 mb-6 w-full">
            <div class="border-b border-gray-100"/>
          </div>
          <GsrSkeletonCard direction="auto"/>
        </div>
      </div>
      <div v-show="!isLoading" class="w-full gsr-infinite-wrapper">
        <div v-for="accommodation in accommodations.data" :key="accommodation.id">
          <div class="mt-6 mb-6 w-full">
            <div class="border-b border-gray-100"></div>
          </div>
          <GsrAccommodationCard
            @mouseover.native="onMouseOver(accommodation)"
            @mouseleave.native="onMouseLeave"
            :query-string="computedAccommodationCardQueryString"
            :data="accommodation"
          />
        </div>
      </div>
      <!--    Pagination-->
      <client-only>
        <infinite-loading
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

      <!--      Edit dialog-->
      <GsrDialog
        :title="$t('common.settings')"
        :opened="isEditDialogVisible"
        @close="isEditDialogVisible = false"
      >
        <validation-observer v-slot="{ invalid }">
          <form class="grid grid-cols-1 gap-4">
            <ValidationProvider
              v-slot="{ errors }"
              :data-vv-as="$t('common.wishlist_title')"
              slim
              rules="required"
              :skip-if-empty="false"
              name="name"
              persist="true"
              vid="name"
            >
              <GsrInput
                id="name"
                type="text"
                v-model="form.title"
                :disabled="isLoading"
                :error="!!errors.length"
                :placeholder="$t('common.wishlist_title')"
                :name="$t('common.wishlist_title')"
                :label="$t('common.wishlist_title')"
              />
            </ValidationProvider>
          </form>
        </validation-observer>
        <template v-slot:footer>
          <div class="flex flex-row items-center justify-between w-full">
            <span @click="isEditDialogVisible = false"
                  class="text-base font-medium underline cursor-pointer">
              {{ $t('common.cancel') }}
            </span>
            <GsrButton @click.native="onEdit" type="submit" :disabled="!form.title" :loading="isLoading">
              <div class="flex justify-center py-2 w-full">
                <span class="m-auto">{{ $t('common.save') }}</span>
              </div>
            </GsrButton>
          </div>
        </template>
      </GsrDialog>
    </template>
    <template v-slot:right>
      <GsrLeaflet class="hidden md:block"
                  :entities="accommodations.data"
      >
        <template v-slot:tooltip="item" class="cursor-pointer">
          <GsrAccommodationCard
            :data="item.data"
            :key="item.data.id"
            :show-amenities="false"
            style="width: 250px;"
            direction="vertical"
            bodyStyle="padding:0.5rem;"
          />
        </template>
        <template v-slot:marker="item">
          <div
            class="bg-white flex flex-row p-2 shadow-lg rounded-full transition-all duration-200 ease-in-out hover:bg-gray-800 hover:text-white"
            :class="{'bg-gray-800 text-white':overAccomodationId === item.data.id}"
          >
            <svg-icon class="h-4 w-4 m-auto" name="location-outline"/>
          </div>
        </template>
      </GsrLeaflet>
    </template>
  </GsrMapLayout>
</template>

<script>
import {
  ValidationProvider,
  ValidationObserver
} from 'vee-validate';
import moment from 'moment'

export default {
  name: "Wishlist",
  components: {
    GsrMapLayout: () => import('@/components/layout/GsrMapLayout'),
    GsrWishlistCard: () => import('@/components/cards/GsrWishlistCard'),
    GsrLoader: () => import('@/components/common/GsrLoader'),
    GsrSkeletonCard: () => import('@/components/cards/GsrSkeletonCard'),
    GsrLeaflet: () => import('@/components/common/GsrLeaflet'),
    FilteredAccommodationsList: () => import('@/components/accommodation/FilteredAccommodationsList'),
    GsrAccommodationsList: () => import('@/components/common/GsrAccommodationsList'),
    GsrGuestsDropdown: () => import('@/components/common/GsrGuestsDropdown'),
    GsrDropdown: () => import('@/components/common/GsrDropdown'),
    GsrDatepicker: () => import('@/components/input/GsrDatepicker'),
    GsrDialog: () => import('@/components/common/GsrDialog'),
    GsrInput: () => import('@/components/input/GsrInput'),
    GsrButton: () => import('@/components/common/GsrButton'),
    GsrAccommodationCard: () => import('@/components/cards/GsrAccommodationCard'),
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      overAccomodationId: null,
      isEditDialogVisible: false,
      wishlist: {},
      accommodations: {
        data: [],
        links: {
          next: null,
        },
        meta: {
          current_page: 1
        }
      },
      mapCenter: {},
      filters: {
        page: 1,
        per_page: 15
      },
      isLoading: false,
      isUpdating: false,
      isMounted: false,
      infiniteId: +new Date(),
      form: {
        guests: {
          adults: 0,
          children: 0,
          newborns: 0,
          pets: 0
        },
        date: {
          start: null,
          end: null
        }
      }
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
    /**
     * @desc Calculate and format for safety the checking date for set inside picker
     * @returns {string}
     */
    computedStartingDateValue() {
      if (this.form.date.start) {
        return moment(this.form.date.start).format('YYYY-MM-DD')
      }
    },
    /**
     * @desc Calculate and format for safety the checkout date for set inside picker
     * @returns {string}
     */
    computedEndingDateValue() {
      if (this.form.date.end) {
        return moment(this.form.date.end).format('YYYY-MM-DD')
      }
    },
  },
  async mounted() {
    await this._fetchData()
    this.isMounted = true
  },
  methods: {
    onMouseOver(id) {
      this.overAccomodationId = id
    },
    onMouseLeave() {
      this.overAccomodationId = null
    },
    onOpenEditDialog() {
      this.isEditDialogVisible = true;
    },
    /**
     * @desc Get new data on scroll
     * @param $state
     * @returns {Promise<void>}
     */
    async onInfinite($state) {
      //Check if there's enough elements for paginate again
      if (this.accommodations.links.next) {
        this.filters.page++;
        try {
          const result = await this.$services.wishlists.getWishlistAccommodations(this.$route.params.id, this.$i18n.locale, this._toQuery())
          this.accommodations.data = this.accommodations.data.concat(result.data)
          this.accommodations.meta = result.meta
          this.accommodations.links = result.links
        } catch (e) {
          this.$toast.error(this.$t('error.generic'))
        } finally {
          $state.loaded()
        }
      } else {
        $state.complete()
      }
    },
    /**
     * @desc Fetch data
     * @returns {Promise<void>}
     * @private
     */
    async _fetchData() {
      this.isLoading = true;
      try {
        const wishlist = (await this.$services.wishlists.getWishlist(this.$route.params.id, this.$i18n.locale)).data
        this.form.title = wishlist.title
        if (wishlist.start_date) {
          this.form.date.start = moment(wishlist.start_date).format('YYYY-MM-DD')
        }
        if (wishlist.end_date) {
          this.form.date.end = moment(wishlist.end_date).format('YYYY-MM-DD')
        }
        this.form.guests = {
          adults: wishlist.adults,
          children: wishlist.children,
          newborns: wishlist.newborns,
          pets: wishlist.pets,
        }
        this.accommodations = await this.$services.wishlists.getWishlistAccommodations(this.$route.params.id, this.$i18n.locale, this._toQuery())
      } catch (e) {
        this.$toast.error(this.$t('error.generic'))
      } finally {
        this.isLoading = false
      }
    },
    /**
     * @desc Update data
     * @returns {Promise<void>}
     * @private
     */
    async onEdit() {
      this.isUpdating = true;
      try {
        const payload = {
          title: this.form.title,
          start_date: this.form.date.start,
          end_date: this.form.date.end,
          ...this.form.guests
        }
        await this.$services.wishlists.updateWishlist(this.$route.params.id, payload, this.$i18n.locale)
        this.isEditDialogVisible = false
      } catch (e) {
        this.$toast.error(this.$t('error.generic'))
      } finally {
        this.isUpdating = false
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

<style scoped>

</style>
