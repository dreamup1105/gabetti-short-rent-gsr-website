<template>
  <GsrBoxedLayout>
    <GsrBlocksList :blocks="blocks"/>
    <div id="CookieDeclaration"/>
  </GsrBoxedLayout>
</template>

<script>

export default {
  name: 'Cookie',
  head() {
    return {
      script: [
        {
          id: "CookieBot",
          'data-cbid': "4e4f179b-7696-4ecc-ad4c-b44e618b0059",
          'data-blockingmode':"auto",
          src: "https://consent.cookiebot.com/uc.js"
        },
        {
          id: "CookieDeclaration",
          src: "https://consent.cookiebot.com/4e4f179b-7696-4ecc-ad4c-b44e618b0059/cd.js",
          body:true,
          async:true
        }
      ]
    }
  },
  components: {
    GsrBoxedLayout: () => import('@/components/layout/GsrBoxedLayout'),
    GsrBlocksList: () => import('@/components/cms/GsrBlocksList'),
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
    let blocks;
    try {
      blocks = (await app.$services.cms.getPage(routeData.permalink, routeData.locale)).data
    } catch (e) {
      console.error(e)
    }

    return {
      routeData,
      blocks,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
<!--
<script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="4e4f179b-7696-4ecc-ad4c-b44e618b0059" data-blockingmode="auto" type="text/javascript"></script>-->
<!--
<script id="CookieDeclaration" src="https://consent.cookiebot.com/4e4f179b-7696-4ecc-ad4c-b44e618b0059/cd.js" type="text/javascript" async></script>-->
