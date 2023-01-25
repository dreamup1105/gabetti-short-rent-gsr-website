<template>
  <transition name="gsr-fade">
    <div v-if="visible" class="gsr-overlay" :style="{'z-index':zIndex}"/>
  </transition>
</template>

<script>
export default {
  name: "GsrOverlay",
  props: {
    zIndex: {
      type: Number,
      default: 1
    },
    visible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.gsr-overlay {
  @apply bg-gray-800 opacity-10 inset-0 fixed;
  height: 100vh;
}
</style>
