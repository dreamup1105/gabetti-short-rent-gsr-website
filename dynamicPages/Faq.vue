<template>
  <GsrBoxedLayout>
    <section v-for="(item, index) in pageData" :key="index">
      <div v-if="item.type !== 'JSON' && item.type !== 'OBJECT'" v-html="item.content"/>
    </section>
    <GsrFaq :items="pageData"/>
  </GsrBoxedLayout>
</template>

<script>
export default {
  name: 'Faq',
  components: {
    GsrBoxedLayout: () => import('@/components/layout/GsrBoxedLayout'),
    GsrFaq: () => import('~/components/common/GsrFaq.vue'),
  },
  async asyncData({app, error, route}) {
    const routeData = app.$services.route.extractLocaleAndPermalinkFromRoute(route.path);
    let pageData;

    try {
      pageData = (await app.$services.cms.getPage(routeData.permalink, routeData.locale)).data;
    } catch (e) {
      const statusCode = e.response.status;
      error({
        statusCode,
        message: app.i18n.t(`common.errors.${statusCode}`),
      });
    }

    return {
      pageData,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/_variables.scss';

.gsr-custom-page {
  @apply p-2;

  @screen sm {
    @apply p-8;
  }
}
</style>
