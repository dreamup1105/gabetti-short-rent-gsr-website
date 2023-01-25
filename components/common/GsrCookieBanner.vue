<template>
  <transition name="gsr-fade-top" mode="out-in">
    <div class="gsr-cookie-banner">
      <div class="gsr-cookie-banner__inner">
        <div class="w-full text-center sm:text-left">
          <div class="font-bold text-2xl mb-2">
            {{ $t('cookie.title') }}
          </div>
          <p class="text-gray-700 text-base">
            {{ $t('cookie.message') }}
          </p>
        </div>
        <div class="flex flex-col md:flex-row items-center mt-8 space-y-4 md:space-x-4 md:space-y-0">
          <GsrButton @click="onRedirectToCookie">
            {{ $t('cookie.more_informations') }}
          </GsrButton>
          <GsrButton @click="onAccept">
            {{ $t('common.accept') }}
          </GsrButton>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ApiRoutes from '@/api_routes.json';

export default {
  name: 'GsrCookieBanner',
  components: {
    GsrButton : () => import('@/components/common/GsrButton'),
  },
  methods: {
    onAccept() {
      this.$store.commit('app/SET_COOKIE_ACCEPTED');
    },
    onRedirectToCookie() {
      const locale = this.$i18n.locale
      let elements = ApiRoutes.filter(function (entity) {
        return entity.type === 'Cookie' && entity.locale === locale;
      });

      if (elements.length) {
        this.$router.push({path: this.localePath(`/${elements[0].permalink}`)});
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/_variables.scss';

.gsr-cookie-banner {
  @apply w-full fixed overflow-hidden border-t border-gray-400 bg-white p-6 bottom-0 flex;
z-index: 999999;
  box-shadow: 0 40px 70px 35px rgba(0, 0, 0, 0.5);

  &__inner {
    @apply max-w-screen-xl m-auto w-full flex items-center flex-col;

    @screen sm {
      @apply items-start;
    }
  }
}
</style>
