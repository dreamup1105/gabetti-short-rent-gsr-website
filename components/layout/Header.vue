<template>
  <header class="gsr-header" :class="{'shadow-none':isSearchbarVisible}">
    <div
      :class="{plain:filledSidebar || computedFilledSidebar,'gsr-over-content':overContent,'gsr-no-shadow':isSearchbarVisible}"
      class="gsr-header__container">
      <div :class="{'gsr-boxed':boxedContent}" class="gsr-header__container-inner">
        <!-- Logo -->
        <nuxt-link :to="localePath('/')">
          <div class="gsr-logo-wrapper">
            <nuxt-img
              class="gsr-logo"
              :src="pathURL(headerLogo)"
              alt="logo"
              width="120"
              height="45"
            />
          </div>
        </nuxt-link>
        <!-- Small Searchbar -->
        <transition name="expand">
          <LazyGsrSearchbarSmall
            class="lg:block"
            v-if="width >= breakpoints.lg && isSearchbarSmallVisible && !isSearchbarVisible"
            @click="onSearchbarSmallClick"
          />
        </transition>
        <!-- Menu -->
        <nav
          class="gsr-nav flex" v-if="width >= breakpoints.md"
        >
          <!--          Language picker-->
          <GsrDropdown button-name="Language">
            <template v-slot:button>
              <svg-icon name="global" class="h-6 w-6"/>
            </template>
            <ul class="bg-white rounded-lg border border-gray-100 w-32">
              <li
                class="cursor-pointer p-4 rounded-lg hover:bg-gray-100 text-sm"
                v-for="(route, key) in localePaths"
                :key="key"
              >
                <nuxt-link :to="route.path" @click.native="handleMissingLocales(route.isMissing, key)">
                  {{ route.name }}
                </nuxt-link>
              </li>
            </ul>
          </GsrDropdown>
          <!--          Logged menu-->
          <client-only>
            <GsrDropdown class="ml-6" button-name="Menu">
              <template v-slot:button>
                <svg-icon name="profile-circle-bold" class="h-7 w-7"/>
              </template>
              <ul v-if="loggedIn" class="bg-white rounded-lg border border-gray-100 w-64">
                <li @click="$router.push({path: localePath(`/reservations`)})"
                    class="cursor-pointer rounded-t-lg p-4 hover:bg-gray-100 text-sm">
                  <span>{{ $t('common.reservations') }}</span>
                </li>
                <li
                  @click="$router.push({path: localePath(`/wishlists`)})"
                  class="cursor-pointer p-4 hover:bg-gray-100 text-sm">
                  <span>{{ $t('common.wishlists') }}</span>
                </li>
                <GsrDivider/>
                <li @click="$router.push({path: localePath(`/account`)})"
                    class="cursor-pointer p-4 hover:bg-gray-100 text-sm">
                  <span>{{ $t('common.account') }}</span>
                </li>
                <GsrDivider/>
<!--                <li @click="$router.push({path: localePath(`/help`)})"
                    class="cursor-pointer p-4 hover:bg-gray-100 text-sm">
                  <span>{{ $t('common.help') }}</span>
                </li>-->
                <li @click="$router.push({path: localePath(`/contact-request`)})"
                    class="cursor-pointer p-4 hover:bg-gray-100 text-sm">
                  <span>{{ $t('common.send_request') }}</span>
                </li>
                <li @click="onLogout" class="cursor-pointer rounded-b-lg p-4 hover:bg-gray-100 text-sm">
                  <span>{{ $t('common.logout') }}</span>
                </li>
              </ul>
              <ul class="bg-white rounded-lg border border-gray-100 rounded-lg w-32" v-else>
                <li @click="isLoginModalOpened=true" class="cursor-pointer p-4 rounded-t-lg hover:bg-gray-100 text-sm">
                  <span>{{ $t('common.sign_in') }}</span>
                </li>
                <li @click="isLoginModalOpened=true" class="cursor-pointer p-4 rounded-b-lg hover:bg-gray-100 text-sm">
                  <span>{{ $t('common.login') }}</span>
                </li>
              </ul>
            </GsrDropdown>
          </client-only>
        </nav>
      </div>
    </div>
    <transition name="fade-y">
      <div class="gsr-header__sub-container" v-if="isSearchbarVisible">
        <transition name="scale-in" appear>
          <div class="gsr-header__sub-container-inner" v-if="isSearchbarVisible">
            <GsrSearchbar @search="isSearchbarVisible=false" class="gsr-custom-searchbar"/>
          </div>
        </transition>
      </div>
    </transition>
    <LazyGsrOverlay class="gsr-header__custom-overlay" @click.native="isSearchbarVisible = false"
                :visible="isSearchbarVisible"/>
    <LazyGsrLoginModal @close="isLoginModalOpened = false" :opened="isLoginModalOpened" :loaded="appleLoginScriptLoaded" />
    <LazyGsrWishlistsModal v-if="isWishlistsModalOpened" @close="isWishlistsModalOpened = false"
                       :accommodation-id="wishlistAccommodationId"
                       :opened="isWishlistsModalOpened"/>
  </header>
</template>

<script>
import {imageHelper} from "@/mixins/imageHelper";
import {reactiveBreakpoints} from '@/mixins/reactiveBreakpoints';
export default {
  name: "Header",
  mixins: [imageHelper, reactiveBreakpoints],
  props: {
    overContent: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.$nuxt.$on('_onOpenLoginModal', () => {
      this.isLoginModalOpened = true
    })
    this.$nuxt.$on('_onOpenWishlistsModal', (value) => {
      this.wishlistAccommodationId = value;
      if (this.loggedIn) {
        this.isWishlistsModalOpened = true
      } else {
        this.isLoginModalOpened = true
      }
    })
  },
  mounted() {
    this.onScroll();

    // Check if necessary to login before going to protected route
    if(this.$route.query.after_login_redirect && !this.loggedIn){
      this.isLoginModalOpened = true;
    }
  },
  beforeMount() {
    if (process.browser) {
      window.addEventListener('scroll', this.onScroll);
    }
  },
  beforeDestroy() {
    this.$nuxt.$off('_onOpenLoginModal')
    this.$nuxt.$off('_onOpenWishlistsModal')
    this.onScroll();
    if (process.browser) {
      window.removeEventListener('scroll', this.onScroll);
    }
  },
  data() {
    return {
      wishlistAccommodationId: '',
      filledSidebar: false,
      isLoginModalOpened: false,
      isWishlistsModalOpened: false,
      isSearchbarVisible: false,
      appleLoginScriptLoaded: false,
    };
  },
  head() {
    const skip = !this.isLoginModalOpened
    return {
      script:[
       {
        once: true,
         skip,
         hid: "apple-login",
         type: "text/javascript",
         src: "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js",
         integrity: "sha384-bF3JSZo0N9uTQ7ejmX03pU+u8Dg+YcvqKVNbfaXMii/gIS/j/1BuNNk6gUMajgeU",
         crossorigin: "anonymous",
         callback: () => { this.appleLoginScriptLoaded = true }
      },
     ]
    }
  },
  computed: {
    /**
     * @desc Get all locales
     * @returns {{}}
     */
    localePaths() {
      const routeObject = {};
      this.$i18n.locales.filter(i => i.code !== this.$i18n.locale).forEach((locale) => {
        const newRoute = {
          path: this.internalSwitchLocalePath(locale.code),
          name: locale.name,
        };
        if (newRoute.path === this.$route.path && locale.code !== this.$route.path.substring(1, 3)) {
          newRoute.isMissing = true;
        }
        routeObject[locale.code] = newRoute;
      });
      return routeObject;
    },
    /**
     * @desc Get current locale name
     * @returns {*}
     */
    currentLocaleName() {
      const [locale] = this.$i18n.locales.filter(i => i.code === this.$i18n.locale);
      return locale.name;
    },
    loggedIn() {
      return this.$store.state.auth.loggedIn;
    },
    user() {
      return this.$store.state.auth.user;
    },
    boxedContent() {
      if (this.$route && this.$route.name) {
        const conditions = ['destination', 'reservations-code', 'wishlists-id']
        return !conditions.some(el => this.$route.name.includes(el))
      } else {
        return false
      }
    },
    isSearchbarSmallVisible() {
      if (this.$route && this.$route.name) {
        const conditions = ['destination', 'catalog','Accommodation']
        return conditions.some(el => this.$route.name.includes(el))
      } else {
        return false
      }
    },
    computedFilledSidebar() {
      if (this.$route && this.$route.name) {
        const conditions = ['account', 'catalog', 'destination', 'wishlist', 'Accommodation']
        return conditions.some(el => this.$route.name.includes(el))
      } else {
        return false
      }
    },
    headerLogo() {
      let logURL = 'https://gabettishortrent.fra1.digitaloceanspaces.com/static/logo-white.svg'
      if(this.filledSidebar || this.computedFilledSidebar || !this.overContent) {
        logURL = 'https://gabettishortrent.fra1.digitaloceanspaces.com/static/logo.svg'
      }

      return logURL
    }
  },

  watch: {
    '$route': {
      handler: function () {
        this.isSearchbarVisible = false;
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    /**
     * @desc On logout
     * @returns {Promise<void>}
     */
    async onLogout() {
      this.$auth.strategies.local.options.endpoints.user.headers.Authorization = null;
      this.$auth.setToken('local', false);
      this.$auth.setRefreshToken('local', false);
      this.$auth.setUser(null);
      this.$auth.reset();
      this.$axios.setHeader('Authorization', false);
      await this.$auth.logout('local');
      this.$nuxt.$emit('_onLogout')

      const conditions = ['account', 'reservations']
      if (conditions.some(el => this.$route.name.includes(el))) {
        await this.$router.push({path: this.localePath(`/`)})
      }
    },
    /**
     * @desc On scroll callback
     */
    onScroll() {
      this.filledSidebar = document.documentElement.scrollTop > 1;
      this.isSearchbarVisible = false
    },
    internalSwitchLocalePath(localeCode) {
      return this.switchLocalePath(localeCode);
    },
    handleMissingLocales(isMissing, code) {
      if (isMissing) {
        //this.$toast.error(this.$t('common.missingLocale', code));
      }
    },
    onSearchbarSmallClick() {
      this.isSearchbarVisible = !this.isSearchbarVisible
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_variables.scss';

.gsr-header {
  // duration-200 transition-all ease-in-out
  @apply flex flex-col;
  &__container {
    @apply mt-0 fixed w-full z-50 top-0 shadow-none flex justify-center bg-transparent ease-in-out;
    transition: 250ms background-color, 350ms box-shadow;
    height: $navbar-height;

    &.gsr-no-shadow {
      box-shadow: none !important;
    }

    &.gsr-over-content {
      svg {
        @apply text-white;
      }
    }

    &.plain {
      @apply shadow bg-white;

    }

    &.plain.gsr-over-content {
      svg {
        color: $primary-dark;
      }
    }

    &-inner {
      @apply w-full h-full flex items-center justify-between px-6;

      &.gsr-boxed {
        @apply max-w-screen-xl;
      }

      .gsr-logo-wrapper {
        @apply flex flex-row;
        .gsr-logo {
          height: 45px;

          &.white {
            height: 50px;
          }
        }
      }

      nav.gsr-nav {
        @apply justify-end items-center;
      }

      @screen xl {
        @apply px-6;

        &.gsr-boxed {
          @apply px-0;
        }
      }
    }
  }

  &__sub-container {
    @apply z-40 mt-0 fixed bg-white w-full shadow flex justify-center duration-200 ease-in-out;
    transition-property: transform, opacity;
    top: $navbar-height;

    &-inner {
      @apply w-full h-full flex items-center justify-center max-w-4xl pt-4 pb-8;
    }
  }

  &__custom-overlay {
    top: $navbar-height;
  }

}

:deep(.gsr-header__sub-container-inner .gsr-custom-searchbar) {
   @apply shadow-none rounded-full border border-gray-200 bg-gray-50;
    .gsr-button {
      @apply rounded-full;
    }
}
</style>
