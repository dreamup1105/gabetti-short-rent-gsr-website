<template>
  <client-only>
    <div class="w-full justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <div class="flex flex-col w-full m-auto px-6 xl:px-0 pt-12 max-w-screen-xl">
        <div class="flex flex-row">
          <h1 class="text-3xl font-semibold">{{ $t(`common.errors.${statusCode}`) }}</h1>
        </div>
        <div class="mt-6">
          <span>{{ $t(`common.errors.page.description`) }}</span>
          <GsrDivider class="my-6"/>
          <div class="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 items-center">
            <GsrButton
              @click="$router.push({path: localePath(`/catalog`)})"
            >
              <div class="m-auto">
                <span class="capitalize">{{ $t(`common.explore_the_catalog`) }}</span>
              </div>
            </GsrButton>
            <span class="text-sm text-gray-600">{{ $t('common.or') }}</span>
            <GsrButton
              variant="outline"
              @click="$router.push({path: localePath(`/`)})"
            >
              <div class="m-auto">
                <span class="capitalize">{{ $t(`common.back_to_home`) }}</span>
              </div>
            </GsrButton>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
const GsrButton = () => import('@/components/common/GsrButton');
const GsrDivider = () => import('~/components/common/GsrDivider.vue');
import RedirectRoutes from '@/api_redirects.json'

export default {
  name: 'Error',
  layout({ redirect, route }) {
    // Find route inside redirect
    const redirectsFound = RedirectRoutes.filter(item => item.from === route.path)
    if(redirectsFound.length){
      redirect(redirectsFound[0].status_code, redirectsFound[0].to)
    }

    return 'layout'
  },
  components: {
    GsrButton,
    GsrDivider
  },
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500;
    },
  },
  head() {
    return {
      title: this.message,
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, viewport-fit=cover',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/_variables.scss';

.csi-error-page {
  @apply flex justify-center p-8;
  &__inner-container {
    @apply text-center;
    max-width: 1000px;
    @screen md {
      @apply text-left;
    }
    .csi-divider {
      @apply w-24 h-1 mx-auto mt-3;
      background-color: $secondary-green;

      @screen md {
        @apply ml-0;
      }
    }
  }
}
</style>
