<template>
  <section class="w-full">
    <div v-if="hasHeaderSlot" class="w-full">
      <slot name="header">
        <div class="flex pb-12">
          <h2 class="font-medium text-2xl">
            {{ title }}
          </h2>
        </div>
      </slot>
    </div>
    <div class="section-content">
      <slot/>
    </div>
  </section>
</template>

<script>
export default {
  name: "AccommodationSection",
  props: {
    title: {
      type: String,
      default: '',
    },
    footerClasses: {
      type: String,
      default: '',
    },
  },
  computed: {
    hasHeaderSlot() {
      return !!this.$slots.header || this.title;
    },
    hasFooterSlot() {
      return !!this.$slots.footer;
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_variables.scss';


</style>
