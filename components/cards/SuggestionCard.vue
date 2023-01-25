<template>
  <nuxt-link
    :to="localePath('/'+link)"
    class="gsr-suggestion-card"
  >
    <figure
        v-if="image"
        class="flex items-center justify-center rounded-2xl flex-1"
        :style="{backgroundImage: `url(${blurImageURL(image.fallback_url)})`}"
    >
      <nuxt-img class="gsr-suggestion-card__image h-full w-full inset-0 object-cover aspect-[4/3] aspect-4/3 rounded-2xl"
        :class="imageIsLoaded ? 'opacity-100' : 'opacity-0'"
        :src="pathURL(image.fallback_url)"
        :alt="image.alt ? image.alt : 'Suggested location'"
        sizes="xs:100vw"
        loading="eager"
        provider="twicpics"
        @load="onImageLoad"
      />
      <figcaption class="gsr-suggestion-card__text-wrapper">
        <div class="m-auto flex flex-col ml-0 min-w-0">
          <span>{{ subtitle }}</span>
          <h3>{{ title }}</h3>
        </div>
      </figcaption>
    </figure>
  </nuxt-link>
</template>

<script>
import {imageHelper} from "../../mixins/imageHelper";
export default {
  name: "SuggestionCard",
  mixins: [imageHelper],
  props: {
    image: {
      type: Object,
      default: () => {},
    },
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
      required: false,
    },
    imageLoading:{
      type:String,
      default:'eager'
    }
  },
}
</script>

<style lang="scss" scoped>
.gsr-suggestion-card {
    @apply cursor-pointer flex flex-col outline-none rounded-xl m-0 h-full w-full shadow-lg relative rounded-xl;

    &__img {
        will-change: opacity;
        transition: opacity 1s linear;
    }

    &__text-wrapper {
        @apply flex py-2 px-4 absolute w-full bottom-0 rounded-b-xl;
        background: rgba(255,255,255,0.9);
        backdrop-filter: blur(2px);
        h3 {
            @apply mt-1 font-semibold text-lg truncate;

            @screen lg {
                @apply text-xl mt-2;
            }
        }

        span {
            @apply text-gray-500 font-normal text-sm truncate;

            @screen lg {
                @apply text-base;
            }
        }

        @screen lg {
            @apply p-4;
        }
    }
}

</style>
