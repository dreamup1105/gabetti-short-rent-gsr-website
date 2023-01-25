<template>
  <h1 class="mt-2 block text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">{{ content }}</h1>
</template>

<script>
export default {
  name: "GsrCmsH1",
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
