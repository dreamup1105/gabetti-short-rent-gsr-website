<template>
  <GsrBoxedLayout class="pb-12">
    <GsrBlocksList :blocks="blocks"/>
    <section class="space-y-4 py-6" v-for="block in blocks.filter((block) => block.key ==='cards')"
             :key="block.id">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-12">
        <GsrCmsStandardCard v-for="item in block.items" :key="item.id" :data="item"/>
      </div>
    </section>
    <section class="space-y-4 py-6" v-for="block in blocks.filter((block) => block.key ==='services')"
             :key="block.id">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-12">
        <GsrCmsIconCard v-for="item in block.items" :key="item.id" :data="item"/>
      </div>
    </section>
  </GsrBoxedLayout>
</template>

<script>

export default {
  name: 'Services',
  components: {
    GsrBoxedLayout: () => import('@/components/layout/GsrBoxedLayout'),
    GsrBlocksList: () => import('@/components/cms/GsrBlocksList'),
    GsrCmsStandardCard: () => import('@/components/cms/GsrCmsStandardCard'),
    GsrCmsIconCard: () => import('@/components/cms/GsrCmsIconCard'),

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
