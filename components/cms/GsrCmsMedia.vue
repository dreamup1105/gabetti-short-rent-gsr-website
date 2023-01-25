<template>
  <div class="gsr-cms-media" v-if="media">
    <picture class="h-full w-full">
      <source :srcset="media.src_set" type="image/webp">
      <source :srcset="media.fallback_url" type="image/jpeg">
      <img loading="lazy"
           class="h-full w-full object-cover rounded-lg"
           style="aspect-ratio: 3/2"
           :src="media.fallback_url"
           :alt="media.alt"
           :title="media.name"
      >
    </picture>
  </div>
</template>

<script>
export default {
  name: "GsrCmsMedia",
  props: {
    media: {
      type: Object,
      default: () => {},
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.gsr-cms-media {
  height: 50vh;
}
</style>
