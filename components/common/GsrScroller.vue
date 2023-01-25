<template>
  <div class="gsr-scroller">
    <div class="gsr-scroller__inner">
      <div class="gsr-scroller__inner-wrapper">
        <template v-for="(item, index) in data">
            <slot :data="{index,...item}" :index="index"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "GsrScroller",
  components: {
    SuggestionCard : () => import('~/components/cards/SuggestionCard.vue'),
  },
  props: {
    data: {
      type: Array,
      default: null,
      required: true,
    },
  }
}
</script>

<style lang="scss" scoped>

.gsr-scroller {
  &__inner {
    @apply block items-stretch justify-start flex-wrap w-full flex-col mx-auto px-6;

    &-wrapper {
      @apply grid grid-flow-col gap-3;
      overflow: auto hidden;
      scroll-snap-type: x mandatory;
      margin: 0px -24px;
      padding: 4px 24px 24px;
      scroll-padding: 0 24px;

      &:nth-child(n) > * {
        scroll-snap-align: start;
      }
    }
  }
}
</style>
