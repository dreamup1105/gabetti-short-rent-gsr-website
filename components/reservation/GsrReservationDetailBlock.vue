<template>
  <div class="p-6 bg-white" :class="{'border-t-8 border-gray-100':bordered}">
    <slot name="header">
      <span class="text-lg md:text-xl pt-2 font-medium">{{ title }}</span>
    </slot>
    <slot/>
  </div>
</template>

<script>
export default {
  name: "GsrReservationDetailBlock",
  props: {
    title: {
      type: String,
      default: ''
    },
    bordered: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
