<template>
  <div class="w-full flex mt-24 md:px-6 xl:px-0">
    <section class="flex m-auto justify-center max-w-screen-xl">
      <div class="grid grid-cols-1 gap-8">
        <h2 class="text-2xl font-medium pl-6 md:pl-0">{{ data.title }}</h2>

        <div v-if="width >= breakpoints.md" class="grid cols-1 md:grid-cols-3 gap-4">
          <SuggestionCard v-for="(item,index) in data.items" :key="index"
                          v-bind="item"
                          :link="`${item.permalink}`"
          />
        </div>

        <GsrScroller v-else :data="data.items">
          <template v-slot="item">
            <SuggestionCard
              style="width: 18rem"
              :title="item.data.title"
              :image="item.data.image"
              :subtitle="item.data.subtitle"
              :link="`${item.data.permalink}`"
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
  name: "GsrHomepageSolutions",
  mixins: [reactiveBreakpoints],
  props: {
    data:{
      type:Object,
      default: () => {}
    },
  },
}
</script>
