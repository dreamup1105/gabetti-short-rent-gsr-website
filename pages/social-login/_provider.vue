<template>
  <GsrBoxedLayout>
    <div class="flex flex-col mt-12">
      <GsrLoader/>
    </div>
  </GsrBoxedLayout>
</template>

<script>

export default {
  name: "Provider",
  components: {
    GsrBoxedLayout: () => import('@/components/layout/GsrBoxedLayout'),
    GsrLoader: () => import('@/components/common/GsrLoader'),
  },
  mounted() {
    this.onSocialLogin(this.$route.params.provider)
  },
  methods: {
    /**
     * @desc On register user
     * @returns {Promise<void>}
     */
    async onSocialLogin(provider) {

      let payload = {
        provider
      }
      switch (provider) {
        case 'google':
          let query = this.$route.hash.split('#')[1].split('?')
          const queryString = Object.fromEntries(new URLSearchParams(query[0]))
          payload.token = queryString.access_token
          break;
        case 'linkedin':
          payload.token = this.$route.query.code
      }

      this.isLoading = true;
      try {
        const response = (await this.$services.auth.socialLogin(payload, provider, this.$i18n.locale)).data
        const oldRedirect = this.$auth.options.redirect;
        this.$auth.options.redirect = false;
        this.$auth.setToken('local', 'Bearer ' + response.access_token);
        this.$auth.setStrategy('local')
        this.$auth.fetchUser()
        this.$auth.options.rewriteRedirects = oldRedirect;
        //this.$auth.fetchUser()
        this.$nuxt.$emit('_onLoggedIn')
        if (localStorage.getItem('redirectAfterSocialAuth')) {
          const redirect = localStorage.getItem('redirectAfterSocialAuth')
          localStorage.removeItem('redirectAfterSocialAuth')
          this.$router.push({path: redirect})
        } else {
          await this.$router.push({path: this.localePath(`/`)})
        }
      } catch (err) {
        this.$toast.error(this.$t('error.generic'))
      } finally {
        this.isLoading = false;
      }
    },
  }
}
</script>

<style scoped>

</style>
