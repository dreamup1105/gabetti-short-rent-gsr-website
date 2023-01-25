<template>
  <div>
    <!-- Full size type -->
    <div v-if="width >= breakpoints.lg" class="flex w-full p-4">
      <section class="m-auto flex flex-col justify-center max-w-screen-xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 m-auto">
          <div class="grid grid-cols-1 gap-4">
            <div class="flex w-full h-full">
              <div class="m-auto ml-0">
                <h2 class="text-4xl font-semibold">{{ data.title }}</h2>
                <h3 class="text-2xl font-normal pt-6 leading-relaxed">{{ data.subtitle }}</h3>
              </div>
            </div>
            <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <template v-for="(item, index) in data.items">
                <SuggestionCard v-if="index <2"
                              :title="item.title"
                              :image="item.image"
                              :subtitle="item.subtitle"
                              :link="`${item.permalink}`"
                />
              </template>

            </div>
          </div>
          <div class="grid grid-cols-1 gap-4">
            <template v-for="(item, index) in data.items">
              <SuggestionCard v-if="index > 1"
                            v-bind="item"
                            :link="`${item.permalink}`"
              />
            </template>
          </div>
        </div>
        <GsrDivider class="my-12"/>
      </section>
    </div>
    <!-- Scroll Type -->
    <div v-else class="flex w-full h-full px-6 lg:hidden">
      <div class="m-auto ml-0">
        <h2 class="text-2xl font-semibold">{{ data.title }}</h2>
        <h3 class="text-lg font-normal pt-6 leading-relaxed">{{ data.subtitle }}</h3>
      </div>
    </div>
    <GsrScroller :data="data.items" class="lg:hidden mt-16">
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
    <div class="flex w-full mt-8 mb-16 px-6 lg:hidden">
      <GsrDivider/>
    </div>
  </div>
</template>

<script>
import {reactiveBreakpoints} from '@/mixins/reactiveBreakpoints'

export default {
  name: "GsrHomepageSuggestionsFirstType",
  mixins: [reactiveBreakpoints],
  props: {
    data: {
      type: Object,
      default: () => {
      },
      required: true,
    },
  },
}
</script>

