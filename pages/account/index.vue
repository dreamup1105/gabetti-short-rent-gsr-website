<template>
  <div class="w-full justify-center">
    <div class="flex flex-col w-full m-auto px-6 xl:px-0 pt-12 max-w-screen-xl" v-if="!user">
    <GsrLoader/>
    </div>
    <div class="flex flex-col w-full m-auto px-6 xl:px-0 pt-12 max-w-screen-xl" v-else>
      <div class="flex flex-col space-y-1">
        <span class="text-3xl font-semibold">{{ $t('common.account') }} of {{ user ? user.data.name : null }}</span>
        <span class="text-lg font-normal">{{ user ? user.data.email : null }}</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 md:mt-12">
        <GsrAccountActionCard
          link="account/personal-information"
          icon="security-user"
          :title="$t('common.personal_informations')"
          description="Comunica i tuoi dati personali e le modalità per contattarti"
        />
        <GsrAccountActionCard
          link="account/login-and-security"
          icon="shield-security-outline"
          :title="$t('common.login_and_security')"
          description="Update your password and secure your account"
        />

        <div class="cursor-pointer bg-white rounded-lg shadow-lg w-full hover:shadow-xl transition-all duration-200 ease-in-out">
            <div class="p-4 flex flex-col" @click="onLogoutClick">
                <svg-icon class="h-8 w-8 mb-4" name="logout"/>
                <div class="flex flex-col">
                    <span class="text-base font-medium mb-2">{{$t('common.logout')}}</span>
                    <span class="text-sm font-normal leading-tight">{{$t('common.logout_description')}}</span>
                </div>
            </div>
        </div>
        
<!--        <GsrAccountActionCard
          link="account/payments"
          icon="money"
          :title="$t('common.payments')"
          description="Review payments, coupons"
        />
        <GsrAccountActionCard
          link="account/notifications"
          icon="megaphone"
          :title="$t('common.notifications')"
          description="Choose notification preferences and how you want to be contacted"
        />
        <GsrAccountActionCard
          link="account/global-preferences"
          icon="toggles"
          :title="$t('common.global_preferences')"
          description="Set your default language,currency and timezone"
        />-->
      </div>
    </div>
  </div>
</template>

<script>
const GsrAccountActionCard = () => import('~/components/account/GsrAccountActionCard.vue');
const GsrLoader = () => import('@/components/common/GsrLoader');

export default {
  name: "index",
  middleware:"logged",
  components: {
    GsrAccountActionCard,
    GsrLoader
  },
  mounted() {
    // If user is not logged in return to homepage
    if (!this.$store.state.auth.loggedIn) {
      this.$router.push({path: this.localePath(`/`)})
    }
  },

  methods: {
    /**
     * @desc On logout click
     */
    onLogoutClick() {
      this.$store.state.auth.loggedIn = false;
      this.$router.push({path: this.localePath(`/`)})
    }
  },
  computed: {
    /**
     * @desc Return logged user data
     * @returns {*}
     */
    user() {
      return this.$store.state.auth.user;
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
