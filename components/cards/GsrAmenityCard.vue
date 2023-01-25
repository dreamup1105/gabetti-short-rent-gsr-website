<template>
  <div class="gsr-amenity-card">

    <figure
        v-if="image"
        class="flex items-center justify-center rounded-2xl flex-1"
        :style="{backgroundImage: `url(${blurImageURL(image.fallback_url)})`}"
    >
      <nuxt-img
        class="gsr-amenity-card__image inset-0 w-full h-full rounded-2xl object-cover"
        :class="imageIsLoaded ? 'opacity-100' : 'opacity-0'"
        :src="pathURL(image.fallback_url)"
        :alt="image.alt"
        width="640"
        height="426"
        loading="eager"
        provider="twicpics"
        @load="onImageLoad"
        onerror="this.src='/fallback-accommodation-image.jpeg'"
      />
      <figcaption class="gsr-amenity-card__text-wrapper">
        <div class="m-auto flex flex-col ml-0 py-2 px-4 md:py-3">
          <h3>{{ title }}</h3>
        </div>
      </figcaption>
    </figure>
  </div>
</template>

<script>
import {imageHelper} from "../../mixins/imageHelper";
export default {
  name: "GsrAmenityCard",
  mixins: [imageHelper],
  props: {
    image: {
      type: Object,
      default: () => {},
    },
    imgAlt: {
      type: String,
      default: '',
    },
    srcSet: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.gsr-amenity-card {
    @apply flex flex-col outline-none rounded-xl m-0 h-full w-full shadow-lg relative;

    &__image {
        min-width: 18rem;
        min-height: 18rem;
        will-change: opacity;
        transition: opacity 1s linear;
    }

    &__text-wrapper {
        @apply flex absolute w-full bottom-0 rounded-b-xl;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(2px);

        h3 {
            @apply font-normal text-base truncate;

            @screen md {
                @apply text-lg;
            }
        }
    }
}

</style>
