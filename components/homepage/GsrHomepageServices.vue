<template>
  <div class="w-full flex px-6 xl:px-0">
    <section class="flex m-auto justify-center max-w-screen-xl border-b border-gray-300 pb-12 lg:pb-24">
      <div class="grid grid-cols-1 gap-24">
        <div class="flex flex-col lg:flex-row justify-between">
          <h3 class="text-2xl lg:text-4xl font-semibold w-full pb-8 lg:pb-0">{{ data.title }}</h3>
          <div class="grid grid-cols-1 gap-2 w-full">
            <h4 class="text-lg lg:text-2xl font-normal leading-relaxed">{{ data.subtitle }}</h4>
            <nuxt-link class="underline font-medium" :to="localePath('/catalog')">
              {{ data.subtitle_action }}
            </nuxt-link>
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4">
          <div class="flex flex-col lg:flex-row items-start lg:items-center" v-for="(item, index) in data.items" :key="index">
            <svg-icon :name="item.icon" class="h-6 w-6 mb-4 lg:h-12 lg:w-12 lg:mb-0"/>
            <div class="grid grid-cols-1 gap-2 lg:ml-4">
              <span class="text-lg font-semibold">{{ item.title }}</span>
              <span class="text-base font-normal leading-normal">{{ item.subtitle }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "GsrHomepageServices",
  props: {
    data: {
      type: Object,
      default: () => {},
      required: true,
    },
  }
}
</script>

<style scoped>

</style>
