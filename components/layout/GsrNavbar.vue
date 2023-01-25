<template>
  <div class="gsr-navbar" v-if="width <= breakpoints.md">
    <div class="gsr-navbar__inner" v-if="loggedIn">
      <nuxt-link :to="localePath('/')">
        <svg-icon name="search-normal"/>
        <span>{{$t('common.explore')}}</span>
      </nuxt-link>
      <nuxt-link :to="localePath('/reservations')">
        <svg-icon name="reserve-outline"/>
        <span>{{$t('common.reservations')}}</span>
      </nuxt-link>
      <nuxt-link :to="localePath('/wishlists')">
        <svg-icon name="heart-outline"/>
        <span>{{$t('common.wishlists')}}</span>
      </nuxt-link>
      <nuxt-link :to="localePath('/account')">
        <svg-icon name="profile-circle-bold"/>
        <span>{{$t('common.account')}}</span>
      </nuxt-link>
    </div>
    <div class="gsr-navbar__inner" v-else>
      <nuxt-link :to="localePath('/')">
        <svg-icon name="search-normal"/>
        <span>{{$t('common.explore')}}</span>
      </nuxt-link>
      <div class="cursor-pointer" @click="onAccessClick">
        <svg-icon name="heart-outline"/>
        <span>{{$t('common.wishlists')}}</span>
      </div>
      <div class="cursor-pointer" @click="onAccessClick">
        <svg-icon name="profile-circle-bold"/>
        <span>{{$t('common.login')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {reactiveBreakpoints} from '@/mixins/reactiveBreakpoints'
export default {
  name: "GsrNavbar",
  mixins: [reactiveBreakpoints],
  computed: {
    loggedIn() {
      return this.$store.state.auth.loggedIn;
    },
    user() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    /**
     * @desc On access click
     */
    onAccessClick() {
      this.$nuxt.$emit('_onOpenLoginModal')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_variables.scss';

.gsr-navbar {
  @apply flex w-full px-8 fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 py-2 z-50;

  &__inner {
    @apply flex flex-row m-auto justify-between w-full max-w-md;

    a, div {
      @apply flex flex-col justify-center items-center space-y-1 cursor-pointer;

      &.nuxt-link-exact-active {
        svg {
          color: $primary-red;
        }
      }

      svg {
        @apply h-6 w-6;
      }

      span {
        @apply text-xs font-normal;
      }
    }
  }
}
</style>
