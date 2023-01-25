<template>
  <div class="gsr-homepage-features">
    <div class="gsr-homepage-features__item" v-for="(item,index) in data.items" :key="index">
      <svg-icon :name="item.icon"/>
      <span>{{ item.value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GsrHomepageFeatures",
  props: {
    data: {
      type: Object,
      default: () => {
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.gsr-homepage-features {
  @apply grid gap-4 grid-cols-1 md:grid-cols-3 bg-gray-50 pl-8 py-4;

  @screen md{
    @apply pl-0;
  }

  &__item {
    @apply flex flex-row items-center justify-start;

    @screen md {
      @apply justify-center;
    }
    svg {
      @apply w-8 h-8 mr-4;
    }
  }
}
</style>
