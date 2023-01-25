<template>
  <GsrMapLayout>
    <template v-slot:left>
      <FilteredAccommodationsList
        :entities="accommodations"
        :permalink="permalink"
        :search-title="searchTitle"
        :filterable-attributes="filterableAttributes"
        :additional-filters="filters"
        @over="onMouseOver"
        @leave="onMouseLeave"
        @change="onFilteredElementsChange"
      />
    </template>
    <template v-slot:right>
      <GsrLeaflet
        @centerUpdate="onCenterUpdate"
        @zoomUpdate="onZoomUpdate"
        @radiusUpdate="onRadiusUpdate"
        has-header
        :map-center="mapCenter"
        :entities="accommodations.data"
      >
        <template v-slot:tooltip="item" class="cursor-pointer">
          <GsrAccommodationCard
            v-if="isPopupOpen"
            :data="item.data"
            :key="item.data.id"
            :show-amenities="false"
            style="width: 250px;"
            direction="vertical"
            bodyStyle="padding:0.5rem;"
          />
          <span v-else></span>
        </template>
        <template v-slot:marker="item">
          <div
            class="bg-white flex flex-row py-1 px-2 shadow-lg rounded-xl transition-all duration-200 ease-in-out hover:bg-gray-800 hover:text-white"
            :class="{'bg-gray-800 text-white':overAccomodationId === item.data.id}"
          >
            <div class="m-auto flex flex-row font-bold">
              <span v-if="item.data.is_reservable_only_on_request" class="whitespace-pre">{{ $t('common.on_request') }}</span>
              <div v-else class="flex flex-row">
                <span class="mr-1">{{ item.data.estimated_price.per_night_without_taxes }}</span>
                <span>&euro;</span>
              </div>
            </div>
          </div>
        </template>
      </GsrLeaflet>
    </template>
  </GsrMapLayout>
</template>

<script>


export default {
  name: "Destination",
  components: {
    GsrMapLayout: () => import('@/components/layout/GsrMapLayout'),
    GsrAccommodationCard: () => import('@/components/cards/GsrAccommodationCard'),
    FilteredAccommodationsList: () => import('@/components/accommodation/FilteredAccommodationsList'),
    GsrLeaflet: () => import('@/components/common/GsrLeaflet'),

  },
  data() {
    return {
      overAccomodationId: null,
      accommodations: null,
      isPopupOpen: false,
      mapCenter: {},
      filters: {
        latitude: null,
        longitude: null,
        radius: null
      }
    };
  },

  /**
   * @desc Async data
   * @param route
   * @param app
   * @param query
   * @param error
   * @returns {Promise<{accommodation}>}
   */
  async asyncData({route, app, query, error}) {
    // Get route data from path
    const routeData = app.$services.route.extractLocaleAndPermalinkFromRoute(route.path);

    let permalink = routeData.permalink.replace('q/', '');

    // Build search title
    const splittedSearch = permalink.split('--')
    splittedSearch.forEach(function (item, index) {
      const arr = item.split(" ");
      // Loop through each element of the array and capitalize the first letter.
      for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        //Join all the elements of the array back into a string using a blankspace as a separator
        splittedSearch[index] = arr.join(" ");
      }
    })
    let searchTitle = splittedSearch.join(', ')
    let accommodations;
    let filterableAttributes;

    try {
      accommodations = await app.$services.accommodations.getAccommodationsPermalinkCatalog(permalink, routeData.locale)
    } catch (e) {
      console.error(e)
    }

    try {
      filterableAttributes = await app.$services.accommodations.getAccommodationsFilterableAttributes(routeData.locale)
    } catch (e) {
      console.error(e)
    }

    return {
      searchTitle,
      permalink,
      routeData,
      accommodations,
      filterableAttributes
    };
  },
  mounted() {
    // Filters are checked inside FilteredAccommodationsList
    /*if (this.$route.query) {
      const valueCleared = pickBy(this.$route.query, identity)
      if (!isEmpty(valueCleared)) {
        this.filters = {...this.filters, ...valueCleared}
      }
    }*/
  },
  created() {
    this.$nextTick(() => {
      this.$nuxt.$on('displayChanged', (display) => {
        this.isPopupOpen = display;
      });
    })
  },
  methods: {
    onMouseOver(id) {
      this.overAccomodationId = id
    },
    onMouseLeave() {
      this.overAccomodationId = null
    },
    /**
     * @desc Call back from list when results are changed
     * @param value
     */
    onFilteredElementsChange(value) {
      if (value.coordinates && value.coordinates.latitude !== 0 && value.coordinates.longitude !== 0) {
        this.mapCenter = value.coordinates;
      }
      this.accommodations = value
    },

    /**
     * @desc On center update
     * @param center
     */
    onCenterUpdate(center) {
      this.filters.latitude = center.lat;
      this.filters.longitude = center.lng;
    },
    /**
     * @desc on zoom update
     * @param zoom
     */
    onZoomUpdate(zoom) {
      //this.filters.radius = (Math.pow(2, 16 - zoom));
    },
    /**
     * @desc on zoom update
     * @param radius
     */
    onRadiusUpdate(radius) {
      if (this.filters.latitude && this.filters.longitude) {
        this.filters.radius = radius
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_variables.scss';

.gsr-catalog {
  @apply flex w-full h-full;

  &__list {
    width: 100%;

    @screen lg {
      width: 60%;
    }

    @screen xl {
      @apply w-full max-w-screen-md;
    }

    &-inner {
      @apply px-6 py-8;
    }
  }

  &__map-container {
    @apply hidden;
    width: 0;
    height: unset;
    position: unset;
    top: unset;
    visibility: unset;

    &-inner {
      @apply sticky z-10 w-full inline-block;
      top: $navbar-height;
      height: calc(100vh - #{$navbar-height});
    }

    @screen lg {
      @apply block;
      width: 40%;
    }
    @screen xl {
      @apply w-full;
    }
  }
}
</style>
