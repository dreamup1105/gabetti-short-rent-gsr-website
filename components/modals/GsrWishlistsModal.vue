<template>
  <GsrDialog
    :title="computedDialogTitle"
    :opened="opened"
    @close="onClose"
    style="z-index: 9999;"
    no-footer
  >
    <client-only>
      <div class="flex flex-col space-y-6 py-6" v-if="!isFormVisible">
        <!--        Add new wishlist button-->
        <div class="flex flex-row items-center cursor-pointer space-x-4" @click="isFormVisible = true">
          <div class="w-20 h-20 rounded-lg flex border border-gray-200">
            <svg-icon class="w-8 h-8 m-auto" name="diamond-outline"></svg-icon>
          </div>
          <span>Create new wishlist</span>
        </div>
        <div class="grid grid-cols-1 gap-4" v-if="!isLoading">
          <!--         Wishlists list-->
          <GsrWishlistCard

            v-for="wishlist in wishlists.data"
            :key="wishlist.id"
            :data="wishlist"
            direction="horizontal"
            disabled-link
            @click.native.prevent="onWishlistClick(wishlist.id)"
          />
        </div>
        <div class="flex flex-row items-center justify-center" v-else>
          <GsrLoader/>
        </div>
        <div class="flex flex-row justify-center pt-6" v-if="wishlists.meta.last_page !== 1">
          <GsrPagination @change="onPaginationChange" :data="wishlists.meta"/>
        </div>
      </div>
      <div v-else>
        <validation-observer v-slot="{ invalid }">
          <form class="grid grid-cols-1 gap-4" @submit.prevent="onSave">
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
            <GsrButton type="submit" :disabled="invalid || !form.title" :loading="isLoading">
              <div class="flex justify-center py-2 w-full">
                <span class="m-auto">{{ $t('common.save') }}</span>
              </div>
            </GsrButton>
          </form>
        </validation-observer>
      </div>
    </client-only>
  </GsrDialog>
</template>

<script>
import moment from "moment";

const GsrDialog = () => import('@/components/common/GsrDialog');
const GsrButton = () => import('@/components/common/GsrButton');
const GsrInput = () => import('@/components/input/GsrInput');
const GsrSelect = () => import('@/components/input/GsrSelect');
const GsrDivider = () => import('@/components/common/GsrDivider');
import {
  ValidationProvider,
  ValidationObserver
} from 'vee-validate';

import Countries from '@/api_countries.json'

export default {
  name: "GsrWishlistModal",
  components: {
    ValidationObserver,
    ValidationProvider,
    GsrDialog,
    GsrButton,
    GsrInput,
    GsrSelect,
    GsrDivider,
    GsrWishlistCard: () => import('@/components/cards/GsrWishlistCard'),
    GsrSkeletonCard: () => import('@/components/cards/GsrSkeletonCard'),
    GsrLoader: () => import('@/components/common/GsrLoader'),
    GsrPagination: () => import('@/components/common/GsrPagination'),
  },
  props: {
    opened: {
      type: Boolean,
      default: false
    },
    accommodationId: {
      type: [Number, String],
      required: true,
    }
  },
  data() {
    return {
      form: {
        title: '',
        start_date: '',
        end_date: '',
        adults: 1,
        children: 0,
        newborns: 0,
        pets: 0
      },
      filters: {
        page: 1,
        per_page: 15,
      },
      wishlists: {
        meta: {
          last_page:1
        }
      },
      isFormVisible: false,
      isLoading: false,
    }
  },
  mounted() {
    this._fetchData()
    this._setDataFromQuery()
  },
  methods: {
    /**
     * @desc on close event
     */
    onClose() {
      this.$emit('close')
    },
    /**
     * @desc On pagination change
     * @param value
     */
    onPaginationChange(value) {
      this.filters.page = value
      this._fetchData()
    },

    /**
     * @desc Attach accommodation
     * @param id
     * @returns {Promise<void>}
     */
    async onWishlistClick(id) {
      if (this.accommodationId) {
        try {
          await this.$services.wishlists.attachAccommodation(id, this.accommodationId, this.$i18n.locale)
          this.$nuxt.$emit('_onAccommodationAddedToWishlist', {
            'accommodation_id': this.accommodationId,
            'wishlist_id': id
          })
          this.onClose()
        } catch (err) {
          console.error(err)
        } finally {
          this.isLoading = false;
        }
      }
    },
    /**
     * @desc Save data
     * @returns {Promise<void>}
     * @private
     */
    async onSave() {
      this.isLoading = true;
      try {
        const payload = {
          ...this.form,
          accommodation_ids: [this.accommodationId]
        }
        const result = (await this.$services.wishlists.storeWishlist(payload, this.$i18n.locale)).data
        await this._fetchData()
        this._resetForm()
        this.$nuxt.$emit('_onAccommodationAddedToWishlist', {
          'accommodation_id': this.accommodationId,
          'wishlist_id': result.id
        })
        this.onClose()
        this.isFormVisible = false;
      } catch (e) {
        this.$toast.error(this.$t('error.generic'))
      } finally {
        this.isLoading = false
      }
    },
    /**
     * @desc On register user
     * @returns {Promise<void>}
     */
    async _fetchData() {
      this.isLoading = true;
      try {
        const queryString = new URLSearchParams(this.filters).toString()
        this.wishlists = await this.$services.wishlists.getWishlists(this.$i18n.locale, queryString)
      } catch (err) {
        console.error(err)
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * @desc Set data from query string
     */
    _setDataFromQuery() {
      if (this.$route && this.$route.query) {
        let query = this.$route.query
        // Set date
        'checkin' in query ? this.form.start_date = moment(query.checkin).format('YYYY-MM-DD') : null
        'checkout' in query ? this.form.end_date = moment(query.checkout).format('YYYY-MM-DD') : null
        // Set guests
        'adults' in query ? this.form.adults = parseInt(query.adults) : null
        'children' in query ? this.form.children = parseInt(query.children) : null
        'newborns' in query ? this.form.newborns = parseInt(query.newborns) : null
        'pets' in query ? this.form.pets = parseInt(query.pets) : null
      }
    },
    /**
     * @desc Reset form
     * @private
     */
    _resetForm() {
      Object.keys(this.form).forEach(key => {
        this.form[key] = '';
      })
    }
  },
  computed: {
    computedDialogTitle() {
      if (this.isFormVisible) {
        return this.$t('common.name_this_wishlist')
      } else {
        return this.$t('common.your_wishlists')
      }
    }
  },

}
</script>

<style scoped>

</style>
