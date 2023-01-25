<template>
  <h3 class="font-normal">{{ content }}</h3>
</template>

<script>
export default {
  name: "GsrCmsH3",
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
