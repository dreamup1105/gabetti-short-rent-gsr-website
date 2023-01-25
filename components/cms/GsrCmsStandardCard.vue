<template>
  <div
    class="gsr-cms-standard-card"
  >
    <div class="flex items-center justify-center rounded-lg flex-1">
      <picture class="h-full w-full">
        <source :srcset="data.media.src_set" type="image/webp">
        <source :srcset="data.media.fallback_url" type="image/jpeg">
        <img loading="lazy"
             class="inset-0 w-full h-full object-cover bg-gray-200 rounded-lg"
             style="aspect-ratio: 4/3"
             :src="data.media.fallback_url"
             :alt="data.media.alt"
             :title="data.media.name"
        >
      </picture>
    </div>
    <div class="gsr-cms-standard-card__text-wrapper">
      <div class="m-auto flex flex-col ml-0 py-3">
        <h3>{{ data.content.title.value }}</h3>
        <span>{{ data.content.subtitle.value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SuggestionCard",
  props: {
    data:{
      type:Object
    },
  },
}
</script>

<style lang="scss" scoped>
.gsr-cms-standard-card {
  @apply cursor-pointer flex flex-col outline-none rounded-xl m-0 h-full w-full;

  &__image {
    @apply w-full bg-cover;

  }

  &__text-wrapper {
    @apply flex pt-2;
    h3 {
      @apply font-semibold text-lg truncate;
    }

  }


}
</style>
