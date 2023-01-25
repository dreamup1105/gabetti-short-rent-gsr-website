<template>
  <div class="bg-gray-100 px-2 md:px-6 flex w-full rounded-lg">
    <div class="py-12 flex flex-col justify-center items-center w-full">
      <h3 class="text-2xl lg:text-4xl font-medium space-y-4 text-center">
        <span class="block">{{$t('common.contact_request_title')}}</span>
        <span class="text-xl lg:text-2xl font-normal leading-normal">{{$t('common.contact_request_subtitle')}}</span>
      </h3>
      <div class="pt-8 flex lg:mt-0 lg:flex-shrink-0">
        <nuxt-link :to="localePath('/contact-request')">
          <GsrButton class="w-full">
            <div class="flex flex-row items-center justify-center w-full text-white">
              <span class="text-lg font-medium">{{ $t('common.send_request') }}</span>
            </div>
          </GsrButton>
        </nuxt-link>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "GsrContactRequestCta",
  components: {
    GsrButton: () => import('@/components/common/GsrButton'),
  }
}
</script>

<style scoped>

</style>
