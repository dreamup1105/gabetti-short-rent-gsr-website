<template>
  <GsrBoxedLayout>
    <div class="flex flex-col mt-12">
      <span class="text-2xl font-bold">{{ $t('common.congratulations') }}</span>
      <span class="text-base font-normal">{{ $t('common.email_already_verified_message') }}</span>
      <div class="mt-8">
        <nuxt-link :to="localePath('/catalog')">
          <GsrButton>
            {{ $t('common.explore_the_catalog') }}
          </GsrButton>
        </nuxt-link>
      </div>
    </div>
  </GsrBoxedLayout>
</template>

<script>
import GsrBoxedLayout from "../../../components/layout/GsrBoxedLayout";
const GsrButton = () => import('@/components/common/GsrButton');

export default {
  name: "success",
  components: {
    GsrButton,
    GsrBoxedLayout
  }
}
</script>

<style scoped>

</style>
