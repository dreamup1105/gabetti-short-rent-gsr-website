<template>
  <nuxt-link class="bg-white rounded-lg shadow-lg w-full hover:shadow-xl transition-all duration-200 ease-in-out" :to="`/${link}`">
    <div class="p-4 flex flex-col">
      <svg-icon class="h-8 w-8 mb-4" :name="icon"/>
      <div class="flex flex-col">
        <span class="text-base font-medium mb-2">{{title}}</span>
        <span class="text-sm font-normal leading-tight">{{description}}</span>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: "GsrAccountActionCard",
  props: {
    link: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
