<template>
  <div class="w-full justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
    <div class="flex flex-col w-full m-auto px-6 xl:px-0 pt-12 max-w-screen-xl">
      <div class="flex flex-col justify-start items-start space-y-4">
        <span class="text-3xl font-semibold mb-4 md:mb-0 md:mr-4">{{$t('common.purchase_completion_title')}}</span>
        <span class="text-xl font-normal mb-4 md:mb-0 md:mr-4">{{$t('common.purchase_completion_subtitle')}}</span>
        <GsrLoader v-if="isLoading"/>
      </div>

      <div class="grid grid-cols-1 gap-8 w-full mt-12" v-if="isLoading">
        <GsrGsrSkeletonCard/>
      </div>
      <div class="flex flex-col lg:flex-row w-full mt-12" v-if="!isLoading && data">
          <div class="flex items-center justify-center lg:max-w-sm">
            <img
              v-lazy="data.accommodation_media_original_url"
              :alt="data.accommodation_title"
              :title="data.accommodation_title"
              class="inset-0 w-full h-full object-cover rounded-xl" style="aspect-ratio: 3/2"
            >
          </div>
          <div class="lg:ml-6 flex flex-col w-full">
            <span class="text-xl md:text-2xl font-medium pt-4">{{ data.accommodation_title }}</span>
            <div class="flex flex-row pt-2 space-x-2 font-normal text-sm">
              <span>{{ moment(data.start_date).format("D MMM YYYY") }} - {{
                  moment(data.end_date).format("D MMM YYYY")
                }}</span>
            </div>
            <GsrDivider class="my-4"/>
            <div class="flex flex-row space-x-2 font-normal text-sm">
              <span>{{ data.adults }} {{ $t('common.adults') }} -</span>
              <span>{{ data.children }} {{ $t('common.children') }} -</span>
              <span>{{ data.newborns }} {{ $t('common.newborns') }} -</span>
              <span>{{ data.pets }} {{ $t('common.pets') }}</span>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

const GsrSkeletonCard = () => import('@/components/cards/GsrSkeletonCard');
const GsrDivider = () => import('~/components/common/GsrDivider.vue');
const GsrLoader = () => import('@/components/common/GsrLoader');

export default {
  name: "finalize",
  middleware:"logged",
  components: {
    GsrDivider,
    GsrSkeletonCard,
    GsrLoader
  },
  data() {
    return {
      isLoading: false,
      data: null,
      moment
    }
  },
  mounted() {
    // Get route params
    if (this.$route.query && this.$route.query.data) {
      this.decrypt(this.$route.query.data)
    } else {
      this.$router.push({path: this.localePath(`/reservations`)});
    }

  },
  methods: {
    /**
     * @desc On pay event
     * @returns {Promise<void>}
     */
    async decrypt(data) {
      this.isLoading = true
      try {
        // Crypt reservations data
        this.data = (await this.$services.reservations.decrypt(data, this.$i18n.locale)).data
        // Store reservations
        await this.$services.reservations.updateReservation(this.data.id,{status:'PROCESSING'}, this.$i18n.locale)
        this.$router.push({path: this.localePath(`/reservations`)});
      } catch (e) {
        this.$toast.error(this.$t('error.generic'))
      } finally {
        this.isLoading = false
      }
    },
  }

}
</script>

<style scoped>

</style>
