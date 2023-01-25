<template>
  <nuxt-link
    :to="localePath(`/${link}`)"
    class="gsr-other-destination-card"
  >
    <figure v-if="image"
            class="flex items-center justify-center rounded-2xl flex-1"
            :style="{backgroundImage: `url(${blurImageURL(image.fallback_url)})`}"
      >
      <nuxt-img class="gsr-other-destination-card__image h-full w-full inset-0 object-cover rounded-2xl"
        :class="imageIsLoaded ? 'opacity-100' : 'opacity-0'"
        :src="pathURL(image.fallback_url)"
        :alt="image.alt ? image.alt : 'Suggested location'"
        onerror="this.src='/fallback-accommodation-image.jpeg'"
        width="2248"
        height="1536"
        sizes="xs:100vw"
        loading="eager"
        provider="twicpics"
        @load="onImageLoad"
      />
      <figcaption class="gsr-other-destination-card__text-wrapper">
        <div class="m-auto flex flex-col ml-0 py-2 px-4 md:py-3">
          <h3>{{ title }}</h3>
        </div>
      </figcaption>
    </figure>
  </nuxt-link>
</template>

<script>
import {imageHelper} from "../../mixins/imageHelper";
export default {
  name: "GsrOtherDestinationCard",
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
    link: {
      type: String,
      default: '',
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.gsr-other-destination-card {
    @apply cursor-pointer flex flex-col outline-none rounded-xl m-0 h-full w-full shadow-lg  relative;

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
            @apply font-semibold text-lg truncate;
        }
    }
}

</style>
