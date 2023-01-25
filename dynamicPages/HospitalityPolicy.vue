<template>
  <GsrBoxedLayout>
    <GsrBlocksList :blocks="blocks"/>
  </GsrBoxedLayout>
</template>

<script>

export default {
  name: 'HospitalityPolicy',
  components:{
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
