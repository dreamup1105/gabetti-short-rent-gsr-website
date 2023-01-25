<template>
  <div class="gsr-skeleton-card">
    <div class="gsr-skeleton-card__inner" :class="{['gsr-'+this.direction]: true}">
      <div class="gsr-skeleton-card__inner-image"></div>
      <div class="gsr-skeleton-card__inner-content">
        <div class="">
          <div class="h-3 bg-gray-200 rounded w-2/6"></div>
          <div class="h-4 bg-gray-200 rounded mt-2 w-3/6"></div>
          <div class="h-4 bg-gray-200 rounded mt-5 w-5/6"></div>
          <div class="h-4 bg-gray-200 rounded mt-5 w-5/6"></div>
          <div class="h-4 bg-gray-200 rounded mt-3 w-2/6"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GsrSkeletonCard",
  props: {
    direction: {
      type: String,
      validator: value => ['auto', 'horizontal', 'vertical'].includes(value),
      default: 'auto'
    }
  },
}
</script>

<style lang="scss" scoped>
.gsr-skeleton-card {
  @apply rounded-md w-full mx-auto;

  &__inner {
    @apply animate-pulse flex space-x-4;

    &-image {
      aspect-ratio: 3 / 2;
      @apply rounded-xl bg-gray-200;

      @screen md {
        width: 300px;
        height: 200px;
        aspect-ratio: initial;
      }
    }

    &-content {
      @apply flex-1 space-y-4 py-2;
    }

    &.gsr-vertical {
      @apply flex-col pb-4;

      .gsr-skeleton-card__inner{
        @apply space-x-0 bg-red-500;
      }

      .gsr-skeleton-card__inner-image {
        @apply w-full h-full;
        aspect-ratio: 3 / 2;
      }

      .gsr-skeleton-card__inner-content {
        @apply mr-0 pt-4;
      }
    }
  }
}
</style>
