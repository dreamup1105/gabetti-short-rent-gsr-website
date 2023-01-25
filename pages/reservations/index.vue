<template>
  <div class="w-full justify-center bg-gradient-to-r from-cyan-500 to-blue-500 pb-8">
    <div class="flex flex-col w-full m-auto px-6 xl:px-0 pt-12 max-w-screen-xl">
      <div class="flex flex-row">
        <span class="text-3xl font-semibold">{{$t('common.reservations')}}</span>
      </div>
      <div class="gsr-tabs" >
        <button @click="onTabChange('1')" :class="{'selected':tabSelected === '1'}" type="button">{{$t('reservation.upcoming')}}</button>
        <button @click="onTabChange('2')" :class="{'selected':tabSelected === '2'}" type="button">{{$t('reservation.past')}}</button>
      </div>
      <div class="mt-6">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" v-if="isLoading">
          <GsrSkeletonCard v-for="index in 6" :key="index" direction="vertical"/>
        </div>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" v-else>
          <GsrReservationCard
            v-for="item in reservations" :key="item.id"
            :title="item.accommodation.address.city || item.accommodation.address.region || item.accommodation.address.country"
            :image="item.accommodation.image"
            :dates="parseDates(item.start_date,item.end_date)"
            :address="item.accommodation.address.street"
            :accommodation="item.accommodation.title"
            :status="item.status"
            :link="`reservations/${item.code}`"
          >
          </GsrReservationCard>
        </div>
      </div>
      <div v-if="reservations.length === 0 && !isLoading">
          <p class="mb-6 text-center font-medium">{{$t('reservation.list.empty')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

const GsrReservationCard = () => import('~/components/cards/GsrReservationCard.vue');
const GsrSkeletonCard = () => import('@/components/cards/GsrSkeletonCard');

export default {
  name: "index",
  middleware:"logged",
  components: {
    GsrReservationCard,
    GsrSkeletonCard
  },
  data() {
    return {
      tabSelected: '1',
      reservations: [],
      isLoading: false,
    }
  },
  mounted() {
    this.onTabChange('1')
  },
  methods: {
    /**
     * @desc On tab change
     * @param tab
     */
    onTabChange(tab) {
      this.tabSelected = tab
      window.scrollTo({top: 0, behavior: 'smooth'});
      if (tab === '1') {
        this.getReservations(`start_date=${moment().format('YYYY-MM-DD')}`)
      } else {
        this.getReservations(`end_date=${moment().format('YYYY-MM-DD')}`)
      }
    },
    /**
     * @desc On pay event
     * @returns {Promise<void>}
     */
    async getReservations(query) {
      this.isLoading = true
      try {
        // Crypt reservations data
        this.reservations = (await this.$services.reservations.getReservations(this.$i18n.locale, query)).data
      } catch (e) {
        console.error(e)
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Parse dates for subtitle
     *
     * @param startDate
     * @param endDate
     * @returns {string}
     */
    parseDates(startDate, endDate) {
      return moment(startDate).format("D MMM YYYY") + ' - ' + moment(endDate).format("D MMM YYYY");
    }
  }
}
</script>

<style lang="scss" scoped>
.gsr-tabs {
  @apply mt-6;

  &:after {
    content: "";
    margin-top: -4px;
    margin-right: 20px;
    margin-bottom: 0px;
    display: block;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: rgb(221, 221, 221);
  }

  button {
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    width: auto;
    font-family: inherit;
    touch-action: manipulation;
    font-size: 14px;
    line-height: 18px;
    position: relative;
    background-image: initial;
    background-position-x: initial;
    background-position-y: initial;
    background-size: initial;
    background-attachment: initial;
    background-origin: initial;
    background-clip: initial;
    background-color: transparent;
    display: inline-block;
    padding-top: 16px;
    padding-right: 16px;
    padding-bottom: 16px;
    padding-left: 16px;
    margin-top: 4px;
    margin-right: 4px;
    margin-bottom: 4px;
    margin-left: 4px;
    font-weight: 600;
    border-top-width: initial;
    border-right-width: initial;
    border-bottom-width: initial;
    border-left-width: initial;
    border-top-style: none;
    border-right-style: none;
    border-bottom-style: none;
    border-left-style: none;
    border-top-color: initial;
    border-right-color: initial;
    border-bottom-color: initial;
    border-left-color: initial;
    border-image-source: initial;
    border-image-slice: initial;
    border-image-repeat: initial;
    color: rgb(113, 113, 113);

    &.selected {
      color: black;

      &::after {
        content: "";
        display: block;
        padding-top: 16px;
        margin-bottom: -16px;
        border-top-width: 0;
        border-right-width: 0;
        border-bottom-width: 2px;
        border-top-style: solid;
        border-top-color: rgb(34, 34, 34);
      }
    }
  }
}

</style>
