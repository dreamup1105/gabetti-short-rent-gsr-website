<template>
  <GsrBoxedLayout>
    <div class="flex flex-col mt-12 max-w-2xl m-auto pb-12">
      <div class="flex flex-col space-y-4 items-start text-left">
        <h1 class="text-2xl md:text-4xl font-bold">{{
            status === 'initial' ? $t('common.host_contact_request_title') : $t('common.contact_request_success_title')
          }}</h1>
        <h2 class="text-xl md:text-2xl font-normal">{{
            status === 'initial' ? $t('common.host_contact_request_subtitle') : $t('common.contact_request_success_subtitle')
          }}</h2>
      </div>
      <div class="mt-8 flex flex-col space-y-4">
        <div v-if="status === 'initial'" class="flex flex-col space-y-4">
          <GsrHostContactRequestForm v-model="form" :is-loading="isLoading" @submit="onSave"/>
        </div>
        <div v-if="status==='success'" class="pb-4 flex flex-col space-y-6">
          <nuxt-link :to="localePath('/')">
            <GsrButton
              variant="outline"
            >
              {{ $t('common.back_to_home') }}
            </GsrButton>
          </nuxt-link>
          <!-- OTHER OPTIONS -->
          <div class="mt-6 w-full">
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
                @click="status = 'initial'"
                variant="outline"
              >
                {{ $t('common.send_new_request') }}
              </GsrButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </GsrBoxedLayout>
</template>

<script>
export default {
  name: "contact-request",
  components: {
    GsrBoxedLayout: () => import('@/components/layout/GsrBoxedLayout'),
    GsrHostContactRequestForm: () => import('@/components/forms/GsrHostContactRequestForm.vue'),
    GsrButton: () => import('@/components/common/GsrButton'),
    GsrSelect: () => import('@/components/input/GsrSelect')
  },
  data() {
    return {
      form: {},
      isLoading: false,
      status: 'initial'
    }
  },
  methods: {
    /**
     * @desc On save
     * @returns {Promise<void>}
     */
    async onSave() {
      this.isLoading = true
      try {
        await this.$services.hostContactRequest.store(this.form, this.$i18n.locale)
        this.$gtm.push({event: 'invioFormOk', form_name: 'host-contact-request'})
        this.status = 'success'
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (e) {
        this.$toast.error(e.response.data.message)
      } finally {
        this.isLoading = false
      }
    },
  }
}
</script>

<style scoped>

</style>
