<template>
  <div class="flex items-center justify-center space-x-1">
    <div :class="sizeClasses" class="bg-gray-700 rounded-full animate-bounce"></div>
    <div :class="sizeClasses" class="bg-gray-700 rounded-full animate-bounce" style="animation-delay: 100ms"></div>
    <div :class="sizeClasses" class="bg-gray-700 rounded-full animate-bounce" style="animation-delay: 200ms"></div>
  </div>
</template>

<script>
export default {
  name: "GsrLoader",
  props: {
    size: {
      type: Number,
      default: 3
    }
  },
  computed: {
    sizeClasses() {
      return `w-${this.size} h-${this.size}`
    }
  }
}
</script>

<style scoped>

</style>
