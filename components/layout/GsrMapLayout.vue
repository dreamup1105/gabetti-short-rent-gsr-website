<template>
  <div class="gsr-map-layout">
    <main class="gsr-map-layout__list">
      <div class="gsr-map-layout__list-inner">
        <slot name="left"/>
      </div>
    </main>
    <div class="gsr-map-layout__map-container" :key="mapContainerKey" :class="{'gsr-visible':isMapVisible}">
      <div class="gsr-map-layout__map-container-inner">
        <slot name="right"/>
      </div>
    </div>
    <div class="gsr-map-layout__action" @click="onToggleMainView">
      <GsrButton border="rounded">
        <div class="m-auto">
          <span class="capitalize text-sm font-normal">{{
              isMapVisible ? $t('catalog.show_list') : $t('catalog.show_map')
            }}</span>
        </div>
      </GsrButton>
    </div>
  </div>
</template>

<script>
export default {
  name: "GsrMapLayout",
  components: {
    GsrButton: () => import('@/components/common/GsrButton')
  },
  data() {
    return {
      isMapVisible: false,
      mapContainerKey: 0,
    }
  },
  methods: {
    onToggleMainView() {
      this.isMapVisible = !this.isMapVisible
      this.mapContainerKey += 1;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_variables.scss';

.gsr-map-layout {
  @apply flex w-full h-full relative;

  &__action {
    @apply fixed bottom-20 z-50;
    left: 50vw;
    -webkit-transform: translateX(-50%) !important;
    -ms-transform: translateX(-50%) !important;
    transform: translateX(-50%) !important;

    @screen lg {
      @apply hidden;
    }
  }

  &__list {
    width: 100%;

    @screen lg {
      width: 60%;
    }

    @screen xl {
      @apply w-full max-w-screen-md;
    }

    &-inner {
      @apply px-6 py-8;
    }
  }

  &__map-container {
    @apply hidden;
    width: 0;
    height: unset;
    position: unset;
    top: unset;
    visibility: unset;

    &-inner {
      @apply sticky z-10 w-full inline-block;
      top: $navbar-height;
      height: calc(100vh - #{$navbar-height});
    }

    @screen lg {
      @apply block;
      width: 40%;
    }
    @screen xl {
      @apply w-full;
    }

    &.gsr-visible {
      @media (max-width: 1024px) {
        @apply w-full h-full block absolute;
      }
    }

  }
}
</style>
