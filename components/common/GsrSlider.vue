<template>
    <div class="gsr-slider">
      <ssr-carousel
        class="gsr-carousel"
        :key="slideLength"
        show-arrows
        show-dots
      >
      <!-- slides -->
        <div
          v-for="(item, index) in data" :key="index"
          class="h-full slide"
        >
          <slot :data="{index,...item}" :index="index"/>
        </div>

          <!-- back button -->
          <template #back-arrow="{disabled}">
              <svg class="carousel-back-button"
                   :class="disabled ? 'opacity-50' : 'opacity-100'"
                   @click.prevent
               xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M0 0h24v24H0z" stroke="none"/><path d="m15 6-6 6 6 6"/></svg>
          </template>

          <!-- next button -->
          <template #next-arrow="{disabled}">
            <svg class="carousel-next-button"
                 :class="disabled ? 'opacity-50' : 'opacity-100'"
                 @click.prevent
             xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M0 0h24v24H0z" stroke="none"/><path d="m9 6 6 6-6 6"/></svg>
          </template>

      </ssr-carousel>
    </div>
</template>

<script>

export default {
  name: "GsrSlider",
  props: {
    data: {
      type: Array,
      required: true,
    },
   slideLength: {
      type: Number,
      required: true,
   }
  },
  setup() {
    const prevent = document.querySelectorAll(".ssr-carousel-dot-icon").forEach(dot =>
                     dot.addEventListener("click", (e) => e.preventDefault())
                 )
    return {prevent}
  }
};
</script>

<style lang="scss" scoped>
.gsr-slider {
  @apply relative h-full w-full;
  :deep(.gsr-carousel) {
    @apply h-full w-full;
    .ssr-carousel-dots {
      @apply absolute inset-x-0 bottom-1;
    }

    .ssr-carousel-dot-icon {
      @apply bg-gray-300 border-gray-100;
      width: 8px;
      height: 8px;
    }

    [disabled] > .ssr-carousel-dot-icon {
      @apply bg-white border-gray-100;
    }

    .carousel-next-button,
    .carousel-back-button {
      @apply invisible bg-white rounded-full shadow-lg w-6 h-6 border border-gray-200 duration-100 ease-in-out;
      transition-property: visibility;
    }

    &:hover {
      .carousel-next-button,
      .carousel-back-button {
        @apply visible;
      }
    }
  }
}
</style>
