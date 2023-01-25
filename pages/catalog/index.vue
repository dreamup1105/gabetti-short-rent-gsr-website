<template>
  <div class="gsr-catalog">
    <div class="gsr-catalog__inner max-w-screen-xl">
      <FilteredAccommodationsList
        view-type="grid"
        card-direction="vertical"
        :filterable-attributes="filterableAttributes"
        type="flexible"
      >
        <template v-slot:title>
          {{$t('common.accommodation_all_over_the_world')}}
        </template>
      </FilteredAccommodationsList>
    </div>
  </div>
</template>

<script>
const FilteredAccommodationsList = () => import('@/components/accommodation/FilteredAccommodationsList');
export default {
  name: "Catalog",
  components: {
    FilteredAccommodationsList
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

    let permalink = routeData.permalink.replace('/catalog', '');

    let filterableAttributes;

    try {
      filterableAttributes = await app.$services.accommodations.getAccommodationsFilterableAttributes(routeData.locale)
    } catch (e) {
      console.error(e)
    }

    return {
      permalink,
      routeData,
      filterableAttributes
    };
  },
}
</script>

<style lang="scss" scoped>
.gsr-catalog {
  @apply w-full justify-center pb-8;

  &__inner {
    @apply w-full m-auto px-6 pt-6;

    @screen xl{
      @apply px-0;
    }
  }
}
</style>
