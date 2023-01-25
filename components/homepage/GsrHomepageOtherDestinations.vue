<template>
  <div class="w-full flex mt-24 lg:px-6 xl:px-0">
    <section class="flex m-auto justify-center max-w-screen-xl">
      <div class="grid grid-cols-1 gap-8">
        <h2 class="text-2xl font-medium pl-6 lg:pl-0">{{data.title}}</h2>
        <div v-if="width >= breakpoints.lg" class="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          <GsrOtherDestinationCard v-for="(item,index) in data.items" :key="index"
                                   :title="item.title"
                                   :image="item.image"
                                   :link="item.permalink"
          />
        </div>
        <GsrScroller v-else :data="data.items" class="lg:hidden">
          <template v-slot="item">
            <GsrOtherDestinationCard :title="item.data.title"
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
    data:{
      type:Object,
      default: () => {}
    },
  },
}
</script>
