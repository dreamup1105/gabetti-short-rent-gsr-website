<template>
  <div class="flex flex-col lg:flex-row items-start lg:items-center">
<!--    <svg-icon v-if="data.content.icon && data.content.icon.value" :name="data.content.icon.value" class="h-6 w-6 mb-4 lg:h-8 lg:w-8 lg:mb-0"/>-->
    <div class="grid grid-cols-1 gap-2">
      <span v-if="data.content.title && data.content.title.value" class="text-lg font-semibold text-red-700">{{ data.content.title.value }}</span>
      <span v-if="data.content.subtitle && data.content.subtitle.value" class="text-base font-normal leading-normal">{{ data.content.subtitle.value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SuggestionCard",
  props: {
    data:{
      type:Object
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
