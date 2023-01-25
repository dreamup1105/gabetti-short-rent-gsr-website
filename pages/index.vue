<template>
  <div class="gsr-homepage">
<!--    <GsrModalBanner />-->
    <!-- GsrHomepageHero -->
    <GsrHomepageHero :data="data.hero" :responsivemedia="data.hero"/>
    <!-- GsrSearchbar -->
    <GsrSearchbar v-if="width <= breakpoints.md" />
    <!--  Features-->
    <GsrHomepageFeatures :data="data.features"/>
    <!-- Video -->
    <GsrHomepageVideo v-if="'video' in data" :data="data.video" class="mt-16 lg:mt-16"/>
    <!-- Grids -->
    <GsrHomepageSuggestionsFirstType :data="data.suggestions_first_type" class="mt-16 lg:mt-24"/>
    <!-- Services -->
    <GsrHomepageServices :data="data.services" class="mt-10"/>
    <!-- Other Destinations -->
    <GsrHomepageOtherDestinations :data="data.other_destinations"/>
    <!-- Solutions -->
    <GsrHomepageSolutions :data="data.solutions"/>
    <!-- Contact request -->
    <GsrHomepageContactRequest/>
    <!-- Amenities -->
    <GsrHomepageAmenities :data="data.amenities"/>
  </div>
</template>

<script>
import {reactiveBreakpoints} from '@/mixins/reactiveBreakpoints'
const heroImageURL = 'https://gabettishortrent.twic.pics/8360/hero.jpg'

export default {
  mixins: [reactiveBreakpoints],
  head() {
    return {
      // reference: https://web.dev/preload-responsive-images/
      link: [
        {
          rel: 'preload',
          as: 'image',
          href: heroImageURL,
          imagesrcset: `${heroImageURL}?twic=v1/cover=1280x720 100vw, ${heroImageURL}?twic=v1/cover=1024x576 1024w, ${heroImageURL}?twic=v1/cover=1280x720 1280w`,
          imagesizes: '100vw'
        },
      ],
    }
  },
  /**
   * @desc Async data
   * @returns {Promise<{accommodation}>}
   * @param ctx
   */
  async asyncData(ctx) {
    // Get route data from path
    const locale = ctx.store.$i18n.locale;
    let data;

    try {
      data = (await ctx.app.$services.homepage.getHomepage(locale)).data
    } catch (e) {
      console.error(e)
    }

    return {
      data,
      locale,
    };
  },
}
</script>

<style lang="scss" scoped>
.gsr-homepage {
  @apply pb-20;
}
</style>
