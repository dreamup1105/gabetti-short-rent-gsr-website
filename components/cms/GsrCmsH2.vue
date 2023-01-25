<template>
  <h2 v-if="content" class="mt-2 block text-xl font-medium leading-8 tracking-tight text-gray-700 sm:text-2xl">{{ content }}</h2>
</template>

<script>
export default {
  name: "GsrCmsH2",
  props: {
    content: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>

<style scoped>

</style>
