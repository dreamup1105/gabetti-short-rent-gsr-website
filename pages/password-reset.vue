<template>
  <GsrBoxedLayout>
    <div class="flex flex-col mt-12">
      <span class="text-2xl font-bold">{{ $t('common.reset_password') }}</span>
      <div class="mt-8 flex flex-col space-y-4">
        <div v-if="status === 'initial'" class="flex flex-col space-y-4">
          <GsrChangePasswordForm v-model="form" @validate="onValidate"/>
          <div>
            <GsrButton
              :disabled="!isValid || isLoading"
              @click="onSave"
            >
              {{ $t('common.save') }}
            </GsrButton>
          </div>
        </div>
        <div class="pb-4" v-if="status==='resend'">
          <span class="font-medium text-base">{{$t('password.reset_link_sent')}}</span>
        </div>
        <div class="pb-4 flex flex-col space-y-6" v-if="status==='success'">
          <span class="font-medium text-base">{{$t('password.reset_success')}}</span>
          <nuxt-link :to="localePath('/')">
            <GsrButton
              variant="outline"
            >
              {{ $t('common.back_to_home') }}
            </GsrButton>
          </nuxt-link>
        </div>
        <!-- OTHER OPTIONS -->
        <div class="mt-6 w-full md:w-1/2">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"/>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">{{ $t('common.or') }}</span>
            </div>
          </div>

          <div class="flex items-center w-full mt-6 space-x-6">
            <nuxt-link :to="localePath('/catalog')">
              <GsrButton
              >
                {{ $t('common.explore_the_catalog') }}
              </GsrButton>
            </nuxt-link>
            <GsrButton
              :disabled="isLoading"
              v-show="!!email && status === 'initial'"
              @click="onRequestLink"
              variant="outline"
            >
              {{ $t('common.request_new_link') }}
            </GsrButton>

          </div>
        </div>
      </div>
    </div>
  </GsrBoxedLayout>
</template>

<script>
export default {
  name: "password-reset",
  components: {
    GsrBoxedLayout: () => import('@/components/layout/GsrBoxedLayout'),
    GsrChangePasswordForm: () => import('@/components/forms/GsrChangePasswordForm'),
    GsrButton: () => import('@/components/common/GsrButton'),
  },
  data() {
    return {
      form: {},
      token: '',
      email: '',
      isLoading: false,
      isValid: false,
      status: 'initial'
    }
  },
  mounted() {
    if (!this.$route.query.token || !this.$route.query.email) {
      this.$router.push({path: this.localePath(`/`)})
    } else {
      this.token = this.$route.query.token
      this.email = this.$route.query.email
    }
  },
  methods: {
    /**
     * @desc On validate callback
     * @param isValid
     */
    onValidate(isValid) {
      this.isValid = isValid
    },
    /**
     * @desc On save
     * @returns {Promise<void>}
     */
    async onSave() {
      if (this.isValid) {
        this.isLoading = true
        try {
          const payload = {
            token: this.token,
            email: this.email,
            ...this.form
          }
          await this.$services.auth.passwordReset(payload, this.$i18n.locale)
          this.status = 'success'
        } catch (e) {
          this.$toast.error(e.response.data.message)
        } finally {
          this.isLoading = false
        }
      }
    },
    async onRequestLink() {
      this.isLoading = true;
      try {
        await this.$services.auth.passwordForgot(this.email, this.$i18n.locale)
        this.status = 'resend'
      } catch (err) {
        this.$toast.error(this.$t('error.generic'))
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>

</style>
