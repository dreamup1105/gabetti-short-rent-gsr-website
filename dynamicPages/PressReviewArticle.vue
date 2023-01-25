<template>
  <GsrBoxedLayout>
    <GsrBlocksList :blocks="blocks.filter((block) => !['body', 'documents'].includes(block.key))"/>
    <!-- Main Container -->
    <div class="gsr-columns-wrapper">
      <!-- LEFT COLUMN -->
      <div class="gsr-left-column">
        <GsrBlocksList :blocks="blocks.filter((block) => ['body', 'documents'].includes(block.key))"/>
      </div>
      <!-- RIGHT COLUMN -->
      <div class="gsr-right-column">
        <div class="flex flex-col space-y-4 p-6">
          <span class="text-lg font-medium">PRESS</span>
          <ul class="flex flex-col space-y-3">
            <nuxt-link class="text-base text-red-700 hover:text-red-900"
                       :to="getPermalink('PressReview')">
              <li>{{ $t('common.press_review_index') }}</li>
            </nuxt-link>
            <nuxt-link
              :to="localePath('/'+article.permalink)"
              v-for="(article,index) in articles" :key="index"
              class="text-base text-red-700 hover:text-red-900"
              :class="{'pl-4':!!article.parent_id}"
            >
              <li>{{ article.title }}</li>
            </nuxt-link>
          </ul>
        </div>
      </div>
    </div>
  </GsrBoxedLayout>
</template>

<script>
import ApiRoutes from '@/api_routes.json';

export default {
  name: 'PressReviewArticle',
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
    let articles;
    try {
      blocks = (await app.$services.cms.getPage(routeData.permalink, routeData.locale)).data
      articles = (await app.$services.cms.getArticlesByType('press-review', routeData.locale)).data
    } catch (e) {
      console.error(e)
    }

    return {
      routeData,
      blocks,
      articles
    };
  },
  methods: {
    getPermalink(type) {
      const locale = this.$i18n.locale
      let elements = ApiRoutes.filter(function (entity) {
        return entity.type === type && entity.locale === locale;
      });

      if (elements.length) {
        return this.localePath(`/${elements[0].permalink}`)
      } else {

      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/_variables.scss';

.gsr-columns-wrapper {
  @apply flex flex-col mt-8 bg-gray-100;

  @screen lg {
    @apply mt-16;
    flex-direction: initial;
  }

  .gsr-left-column {
    @apply w-full bg-white;

    @screen lg {
      width: 65%;
      @apply pr-8;
    }
  }

  .gsr-right-column {
    @apply h-full w-full mt-8;
    top: $navbar-height;

    @screen lg {
      width: 35%;
      @apply sticky mt-0;
    }

    .gsr-price-box {
      @apply fixed bottom-0 top-0 right-0 left-0 rounded-xl shadow-lg p-6 border border-gray-100 bg-white transition-transform duration-300 ease-in-out;
      z-index: 99999;
      transform: translateY(1000px);

      &.gsr-visible {
        transform: translateY(0);
      }

      @screen lg {
        transform: translateY(0);
        position: initial;
      }
    }

    .gsr-preview-price-box {
      @apply fixed flex flex-row right-0 left-0 px-4 py-2 bg-white border-t border-gray-100 z-50;
      bottom: 60px;

      @screen md {
        @apply bottom-0;
      }

      @screen lg {
        @apply hidden;
      }

      &__inner {
        @apply w-full m-auto;

        @screen md {
          @apply max-w-full;
        }
      }
    }
  }

  &.only-left {
    .gsr-left-column {
      @apply w-full pr-0;
    }

    .gsr-right-column {
      @apply hidden;
    }
  }
}
</style>
