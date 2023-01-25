<template>
  <GsrBoxedLayout class="py-12">
    <h1>{{ $t('common.wishlists') }}</h1>
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      <GsrSkeletonCard direction="vertical" class="w-full" v-for="index in 6" :key="index"/>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      <GsrWishlistCard
        v-for="wishlist in wishlists.data"
        :key="wishlist.id"
        :data="wishlist"
      />
    </div>
    <!--    Pagination-->
    <client-only>
      <infinite-loading
        v-if="!isLoading"
        :identifier="infiniteId"
        spinner="spiral"
        @infinite="onPaginationChange"
      >
        <div slot="spinner" class="pt-4">
          <GsrLoader class="py-2"/>
        </div>
        <div slot="no-more"></div>
        <div slot="no-results"></div>
      </infinite-loading>
    </client-only>
  </GsrBoxedLayout>
</template>

<script>
export default {
  name: "Wishlists",
  components: {
    GsrBoxedLayout: () => import('@/components/layout/GsrBoxedLayout'),
    GsrWishlistCard: () => import('@/components/cards/GsrWishlistCard'),
    GsrLoader: () => import('@/components/common/GsrLoader'),
    GsrSkeletonCard: () => import('@/components/cards/GsrSkeletonCard'),
  },
  data() {
    return {
      wishlists: {
        data: [],
        meta: {
          current_page: 1,
          total: 0
        },
      },
      filters: {
        page: 1,
        per_page: 10,
      },
      infiniteId: +new Date(),
      isLoading: false,
    }
  },
  mounted() {
    this._fetchData()
  },
  methods: {
    /**
     * @desc Fetch data
     * @returns {Promise<void>}
     * @private
     */
    async _fetchData() {
      this.isLoading = true;
      try {
        const queryString = new URLSearchParams(this.filters).toString()
        this.wishlists = await this.$services.wishlists.getWishlists(this.$i18n.locale, queryString)
      } catch (e) {
        this.$toast.error(this.$t('error.generic'))
      } finally {
        this.isLoading = false
      }
    },
    /**
     * @desc On pagination change
     * @returns {Promise<void>}
     * @param $state
     */
    async onPaginationChange($state) {
      //Check if there's enough elements for paginate again
      if (this.wishlists.links.next) {
        this.filters.page++;
        const queryString = new URLSearchParams(this.filters).toString()
        try {
          const result = await this.$services.wishlists.getWishlists(this.$i18n.locale, queryString)
          this.wishlists.data = this.wishlists.data.concat(result.data)
          this.wishlists.meta = result.meta
          this.wishlists.links = result.links
        } catch (e) {
          this.$toast.error(this.$t('error.generic'))
        } finally {
          $state.loaded()
        }
      } else {
        $state.complete()
      }
    },
  }
}
</script>

<style scoped>

</style>
