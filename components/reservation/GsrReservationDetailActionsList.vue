<template>
  <div class="gsr-items-list">
    <div class="gsr-items-list__item" @click="onElementClick(item.action)" v-for="(item, index) in items" :key="index">
      <div class="gsr-items-list__item--inner">
        <svg-icon :name="item.icon" class="h-4 w-4"/>
        <span>{{ item.title }}</span>
      </div>
      <svg-icon name="arrow-right" class="h-3 w-3"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "GsrReservationDetailActionsList",
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onElementClick(action) {
      this.$emit('onElementClick', action)
    }
  }
}
</script>

<style lang="scss" scoped>
.gsr-items-list {
  @apply grid grid-cols-1 w-full pt-6;

  &__item {
    @apply flex flex-row w-full items-center justify-between py-4 border-t border-gray-200 cursor-pointer;

    &--inner {
      @apply flex flex-row items-center space-x-2;
    }
  }
}
</style>
