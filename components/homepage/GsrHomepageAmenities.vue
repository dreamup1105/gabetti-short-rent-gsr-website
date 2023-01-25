<template>
  <div class="w-full flex mt-36 lg:px-6 xl:px-0">
    <section class="flex m-auto justify-center max-w-screen-lg">
      <div class="grid grid-cols-1 gap-8">
        <div class="grid grid-cols-1 gap-4 text-center px-8">
          <h2 class="text-2xl lg:text-4xl font-medium pl-6 lg:pl-0">{{ data.title }}</h2>
          <span class="text-xl lg:text-2xl font-normal leading-normal">{{ data.subtitle }}</span>
        </div>
        <div v-if="width > breakpoints.lg" class="lg:grid lg:grid-cols-3 gap-4 mt-16">
          <GsrAmenityCard v-for="(item,index) in data.items" :key="index"
                          v-bind="item"
          />
        </div>
        <GsrScroller v-else :data="data.items" class="md:hidden">
          <template v-slot="item">
            <GsrAmenityCard :title="item.data.title"
                            :image="item.data.image"
                            :link="item.data.permalink"
            />
          </template>
        </GsrScroller>
      </div>
    </section>
  </div>
</template>

<script>
import {reactiveBreakpoints} from '@/mixins/reactiveBreakpoints'
export default {
  name: "GsrHomepageOtherDestinations",
  mixins: [reactiveBreakpoints],
  props: {
    data: {
      type: Object,
      default: () => {
      }
    },
  },
}
</script>
