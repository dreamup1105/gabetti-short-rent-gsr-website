<template>
  <div id="app" class="app">
    <Header :over-content="isUnderHeader"/>
    <div class="main-container" :class="{'under-header':isUnderHeader}">
      <Nuxt :key="$route.fullPath"/>
    </div>
    <Footer/>
    <!--    <modals-container />-->
<!--    <client-only>
      <GsrCookieBanner v-if="isCookieBannerVisible"/>
    </client-only>-->
    <GsrNavbar/>
  </div>
</template>

<script>

import metaService from '~/lib/services/metaService';
import ApiMetas from '~/api_metas.json';

export default {
  name: "default",
  components: {
    Header: () => import('~/components/layout/Header.vue'),
    Footer: () => import('~/components/layout/Footer.vue'),
    GsrNavbar: () => import('~/components/layout/GsrNavbar.vue'),
    // GsrCookieBanner: () => import('~/components/common/GsrCookieBanner.vue')
  },
  computed: {
    routeData() {
      return this.$services.route.extractLocaleAndPermalinkFromRoute(this.$route.path);
    },
    defaultMetaTags() {
      const defaultMetaTags = ApiMetas;
      const localizedMetaTag = defaultMetaTags
        .find(element => element.locale === this.routeData.locale);
      if (!localizedMetaTag) {
        return false;
      }
      return localizedMetaTag;
    },
    isUnderHeader() {
      if (this.$route && this.$route.name) {
        return this.$route.name.includes("index__");
      }
      return false;
    },
    isCookieBannerVisible() {
      return !this.$store.getters['app/cookieAccepted'];
    },
  },
  head() {
    return metaService.head(this.defaultMetaTags, this.$nuxtI18nHead({ addSeoAttributes: true }), this.$i18n.locale);
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_variables.scss';

html {
  scroll-behavior: smooth;
}

html, body {
  height : -webkit-fill-available;
}

#app {
  @apply flex flex-col min-h-screen w-full;
  min-height : -webkit-fill-available;
}

.main-container {
  @apply relative w-full;
  min-height: calc(100vh - #{$navbar-height});
  margin-top: $navbar-height;
  background-color: $background-color;

  &.under-header {
    @apply mt-0;
  }
}

</style>
