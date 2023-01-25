<template>
  <div class="flex flex-col">
    <section class="space-y-4 py-6" v-for="block in blocks" :key="block.id">
      <template v-for="item in block.items">
      <component
        :is="componentName(item.component)"
        v-if="item.component !== 'Custom'"
        :key="item.id"
        v-bind="item"
      />
      </template>
    </section>
  </div>
</template>

<script>
export default {
  name: "GsrBlocksList",
  components: {
    GsrCmsH1: () => import('@/components/cms/GsrCmsH1'),
    GsrCmsH2: () => import('@/components/cms/GsrCmsH2'),
    GsrCmsH3: () => import('@/components/cms/GsrCmsH3'),
    GsrCmsText: () => import('@/components/cms/GsrCmsText'),
    GsrCmsMedia: () => import('@/components/cms/GsrCmsMedia'),
    GsrCmsBodyMedia: () => import('@/components/cms/GsrCmsBodyMedia'),
    GsrCmsDocument: () => import('@/components/cms/GsrCmsDocument'),
    GsrCmsTable: () => import('@/components/cms/GsrCmsTable'),
  },
  props: {
    blocks: {
      type: Array,
      default: () => []
    },
    typesToAvoid:{
      type:Array,
      default:() => []
    }
  },
  methods: {
    /**
     * @∂esc Get component name
     * @param component
     * @returns {string}
     */
    componentName(component) {
      return `GsrCms${component}`
    }
  }
}
</script>

<style scoped>

</style>
