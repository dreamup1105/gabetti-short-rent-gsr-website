<template>
  <div class="gsr-searchbar">

    <div class="text-left pb-8" v-if="width <= breakpoints.lg && title">
      <span class="text-6xl">{{ title }}</span>
    </div>

    <div v-if="width >= breakpoints.md && width <=  breakpoints.lg" class="hero-call2action-md flex max-w-screen-xl p-3 w-full text-center">

      <nuxt-img v-if="!title" class="mx-auto"
      :src="pathURL('https://gabettishortrent.fra1.digitaloceanspaces.com/static/call2action-black.svg')"
        alt="calltoaction"
        loading="eager"
        width="360"
        height="57"
      />

    </div>

    <div class="gsr-searchbar__inner">
      <div class="gsr-searchbar__inner-item">
        <div class="m-auto w-full text-left">
          <span class="gsr-label">{{ $t('common.where') }}</span>
          <GsrGlobalSearch v-model="form.place"/>
        </div>
      </div>
      <div class="gsr-searchbar__inner-item">
        <div class="m-auto w-full text-left">
          <span class="gsr-label">{{ $t('common.checkin_checkout') }}</span>
          <GsrDatepicker
            :starting-date-value="computedStartingDateValue"
            :ending-date-value="computedEndingDateValue"
            v-model="form.date"
          />
        </div>
      </div>
      <div class="gsr-searchbar__inner-item">
        <div class="grid grid-cols-2 gap-8 w-full m-auto">
          <div class="text-left">
            <span class="gsr-label">{{ $t('common.adults') }}</span>
            <div class="w-full items-center justify-center flex">
              <select class="m-auto w-full outline-none text-base font-normal bg-transparent" v-model="form.adults">
                <option v-for="index in 20" :value="index" :key="index">
                  {{ index }}
                </option>
              </select>
            </div>
          </div>
          <div class="text-left">
            <span class="gsr-label">{{ $t('common.children') }}</span>
            <div class="w-full items-center justify-center flex">
              <select class="m-auto w-full outline-none bg-transparent" v-model="form.children">
                <option v-for="index in 7" :value="index-1" :key="index-1">
                  {{ index - 1 }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="gsr-searchbar__inner-item">
        <div class="w-full h-full flex items-center justify-center">
          <nuxt-link :to="computedSearchLink">
            <GsrButton class="w-full" @click="onSearch">
              <div class="flex flex-row items-center justify-center w-full text-white">
                <svg-icon class="h-4 w-4 mr-2" name="search-normal"/>
                <span class="text-lg font-medium">{{ $t('common.search') }}</span>
              </div>
            </GsrButton>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {imageHelper} from "@/mixins/imageHelper";
import {reactiveBreakpoints} from '@/mixins/reactiveBreakpoints'
import moment from "moment";

const GsrButton = () => import('@/components/common/GsrButton');
const GsrDatepicker = () => import('@/components/input/GsrDatepicker');
const GsrGlobalSearch = () => import('@/components/input/GsrGlobalSearch');

export default {
  name: "GsrSearchbar",
  mixins: [imageHelper, reactiveBreakpoints],
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
      form: {
        place: null,
        date: {},
        adults: 1,
        children: 0,
      }
    }
  },
  computed: {
    /**
     * @desc Calculate and format for safety the checking date for set inside picker
     * @returns {string}
     */
    computedStartingDateValue() {
      if (this.$route && this.$route.query) {
        let query = this.$route.query
        if ('checkin' in query) {
          return moment(query.checkin).format('YYYY-MM-DD')
        }
      }
    },
    /**
     * @desc Calculate and format for safety the checkout date for set inside picker
     * @returns {string}
     */
    computedEndingDateValue() {
      if (this.$route && this.$route.query) {
        let query = this.$route.query
        if ('checkout' in query) {
          return moment(query.checkout).format('YYYY-MM-DD')
        }
      }
    },
    /**
     * @∂esc Calculate nuxt link
     * @returns {{path: string, query: {}}}
     */
    computedSearchLink() {
      let queryString = {}
      let currentQuery = this.$route.query

      // Build checkin qs

      if (this.form.date && this.form.date.start) {
        queryString.checkin = this.form.date.start
        delete currentQuery.checkin
      } else {
        delete queryString.checkin
      }

      // Build checkout qs
      if (this.form.date && this.form.date.end) {
        queryString.checkout = this.form.date.end
        delete currentQuery.checkout
      } else {
        delete queryString.checkout
      }

      // Build adults qs
      if (this.form.adults) {
        queryString.adults = this.form.adults
        delete currentQuery.adults
      } else {
        delete queryString.adults
      }

      // Build children qs
      if (this.form.children) {
        queryString.children = this.form.children
        delete currentQuery.children
      } else {
        delete queryString.children
      }

      // Check for custom search
      if (this.form.place && this.form.place.type === 'custom') {
        queryString.without_permalink = true
        delete currentQuery.without_permalink
      } else {
        delete queryString.without_permalink
      }

      // Build tag qs
      if (this.form.place && this.form.place.type === 'tag') {
        queryString.tags = this.form.place.permalink
        delete currentQuery.tags
      } else if(!this.$route.query.tags) {
        delete queryString.tags
      }

      if (this.form.place && this.form.place.permalink) {
        let route = '/catalog'
        //delete queryString.tags
        delete queryString.zones
        switch (this.form.place.type){
          case 'accommodation':
            route = `/${this.form.place.permalink}`
            break;
          case 'tag':
            queryString.tags = this.form.place.permalink
            break;
          case 'zone':
            queryString.zones = this.form.place.name
            break;
          default:
            route = `/q/${this.form.place.permalink}`
        }

        //const route = this.form.place.type === 'accommodation' ? `/${this.form.place.permalink}` : `/q/${this.form.place.permalink}`
        return {path: this.localePath(route), query: {...queryString,...currentQuery}}
      } else {
        return {path: this.localePath(`/catalog`), query: {...queryString,...currentQuery}}
      }
    }
  },
  created() {
    this.setDataFromQuery()
  },
  methods: {
    /**
     * On guests change update form values
     *
     * @param value
     */
    onGuestsChange(value) {
      this.form.adults = value.adults
      this.form.children = value.children
      this.form.newborns = value.newborns
      this.form.pets = value.pets
    },

    /**
     * @desc On search
     */
    onSearch() {
      this.$emit('search')
    },

    /**
     * @desc Set data from query string
     */
    setDataFromQuery() {
      // Set Place
      if (this.$route && this.$route.name && this.$route.name.includes('destination') && 'destination' in this.$route.params) {
        const splittedSearch = this.$route.params.destination.split('--')
        if (splittedSearch.length > 0) {
          splittedSearch.forEach(function (item, index) {
            const arr = item.split(" ");
            // Loop through each element of the array and capitalize the first letter.
            for (let i = 0; i < arr.length; i++) {
              arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
              //Join all the elements of the array back into a string using a blankspace as a separator
              splittedSearch[index] = arr.join(" ");
            }
          })
          this.form.place = {
            name: splittedSearch.reverse().join(', '), // Rebuild title like in search
            permalink: this.$route.params.destination
          }
        }
      }

      if (this.$route && this.$route.query) {
        let query = this.$route.query
        // Set date
        'checkin' in query ? this.form.date.start = moment(query.checkin).format('YYYY-MM-DD') : null
        'checkout' in query ? this.form.date.end = moment(query.checkout).format('YYYY-MM-DD') : null
        // Set guests
        'adults' in query ? this.form.adults = parseInt(query.adults) : null
        'children' in query ? this.form.children = parseInt(query.children) : null
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.gsr-searchbar {
    @apply w-full rounded-lg shadow-xl bg-white p-8;

    &__inner {
        @apply flex flex-col space-y-2;

        &-item {
            @apply flex flex-col items-start px-6;

            .gsr-label {
                @apply block font-bold uppercase;
                font-size: 10px;
            }

            select {
                -webkit-appearance: none;
            }

            &:not(:last-child) {
                @apply border rounded-lg p-2 border-gray-300;
            }

            &:last-child {
                @apply px-0 pt-2;
            }
        }
    }

    @screen md {
        width: 28rem;
        .hero-call2action-md {
            @apply mb-0;
        }
    }


    @screen lg {
        @apply w-full p-2;

        &__inner {
            @apply flex-row w-full space-y-0;

            &-item {
                @apply w-full;
                &:not(:last-child) {
                    border-right: 1px solid;
                    @apply border-t-0 border-l-0 border-b-0 px-2 py-0 my-2 rounded-none border-gray-300;
                }

                &:last-child {
                    @apply px-4 pt-0;
                    width: 9rem;
                }
            }
        }
    }
}

</style>
