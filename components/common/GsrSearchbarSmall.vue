<template>
  <div class="gsr-searchbar-small" @click="onCLick">
    <div class="gsr-searchbar-small__inner">
      <div class="gsr-searchbar-small__inner-item">
        <span class="gsr-label capitalize" :class="{'gsr-filled':data.place}">
          {{ data.place ? data.place : $t('common.add_place') }}
        </span>
      </div>
      <div class="gsr-searchbar-small__inner-divider"/>
      <div class="gsr-searchbar-small__inner-item">
        <span class="gsr-label" :class="{'gsr-filled':data.dates}">
          {{ data.dates ? data.dates : $t('common.add_dates') }}
        </span>
      </div>
      <div class="gsr-searchbar-small__inner-divider"/>
      <div class="gsr-searchbar-small__inner-item">
        <span class="gsr-label" :class="{'gsr-filled':data.guests}">
          {{ data.guests ? data.guests : $t('common.add_guests') }}
        </span>
      </div>
      <div class="gsr-searchbar-small__inner-item">
        <div
          class="m-auto bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 p-3 rounded-full text-white transition-all duration-200 ease-in-out">
          <svg-icon class="h-4 w-4" name="search-normal"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

const GsrButton = () => import('@/components/common/GsrButton');
const GsrDatepicker = () => import('@/components/input/GsrDatepicker');
const GsrGlobalSearch = () => import('@/components/input/GsrGlobalSearch');
import moment from 'moment';

export default {
  name: "GsrSearchbarSmall",
  components: {
    GsrButton,
    GsrDatepicker,
    GsrGlobalSearch
  },
  props: {
    title: {
      type: String,
    }
  },
  data() {
    return {
      data: {
        place: '',
        dates: '',
        guests: '',
      },
    }
  },
  mounted() {
    this.setDataFromQuery()
  },
  watch: {
    '$route.query': {
      handler: function() {
        this.setDataFromQuery()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onCLick(){
      this.$emit('click')
    },

    /**
     * @desc Set data from query string
     */
    setDataFromQuery() {
      // Set Place
      if(this.$route && this.$route.name && this.$route.name.includes('destination') && 'destination' in this.$route.params){

        const splittedSearch = this.$route.params.destination.split('--')
        if(splittedSearch.length > 0){
          this.data.place = splittedSearch.at(-1)
        }
      }

      if (this.$route && this.$route.query) {
        let query = this.$route.query
        // Set date
        this.data.dates = 'checkin' in query ? moment(query.checkin).format('D MMM YYYY') : null;
        this.data.dates += 'checkout' in query ? ` - ${moment(query.checkout).format('D MMM YYYY')}` : null;
        // Set guests
        let guests = 0
        let guestsString = ''
        'adults' in query ? guests += parseInt(query.adults) : null
        'children' in query ? guests += parseInt(query.children) : null
        guests > 0 ? guestsString = `${guests} ${this.$t('common.guests')}` : null
        'newborns' in query ? guestsString += `,${parseInt(query.newborns)} ${this.$t('common.newborns')} ` : null

        this.data.guests = guestsString
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.gsr-searchbar-small {
  @apply cursor-pointer rounded-full shadow-lg bg-white border border-gray-200 px-2 transition-all duration-200 ease-in-out;

  &:hover {
    @apply shadow-xl;
  }

  &__inner {
    @apply flex flex-row items-center;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;

    &-divider {
      @apply bg-gray-200 h-6;
      width: 1px !important;
    }

    &-item {
      @apply flex ;

      .gsr-label {
        @apply text-sm block leading-none m-auto text-gray-400 font-normal;

        &.gsr-filled {
          @apply text-gray-700 font-medium;
        }
      }

      &:not(:last-child) {
        @apply px-4;
      }
    }
  }
}
</style>
