<template>
  <div class="gsr-homepage-hero">
    <div v-if="width >= breakpoints.md " class="image-wrapper overflow-hidden">

      <template v-show="data">
        <nuxt-img class="object-cover w-full h-full bg-gray-200"
                  :src="pathURL(data.image.fallback_url)"
                  alt="Hero"
                  width="1600"
                  height="900"
                  sizes="xl:100vw lg:100vw"
                  provider="twicpics"
        />
      </template>
    </div>
    <div v-if="width <= breakpoints.md && responsivemedia.image.additional" class="hero-section">
      <video preload="none" autoplay loop muted playsinline>
        <source v-for="item in responsivemedia.image.additional"
                :key="item.original_url"
                :src="item.original_url"
                :type="item.mime_type">
        Sorry, your browser doesn't support embedded videos.
      </video>
    </div>
    <div class="absolute flex w-full inset-0">
      <div class="m-auto w-full flex max-w-screen-xl">
        <div class="m-auto w-full grid grid-cols-1 gap-6 text-center">
          <h1 v-if="width >= breakpoints.lg" class="sr-only text-white text-6xl lg:text-7xl xl:text-9xl">
            {{ data.title }}
          </h1>
          <div v-if="width <= breakpoints.md || width >= breakpoints.lg" class="hero-call2action-xl block max-w-screen-xl w-full h-full px-8">
            <nuxt-img responsive v-if="!data.title"
                      class="mx-auto"
                      :src="pathURL('https://gabettishortrent.fra1.digitaloceanspaces.com/static/call2action-white.svg')"
                      alt="calltoaction"
                      width="789"
                      height="126"
                      sizes="lg:100vw xl:100vw"
            />
          </div>

          <div v-if="width >= breakpoints.md" class="px-8 xl:px-0">
            <Searchbar :title="data.title"/>
          </div>
          <div v-if="width >= breakpoints.lg" class="flex flex-row flex-wrap w-full">
            <h2 class="text-white text-2xl font-medium m-auto">
              {{ data.subtitle }}
              <nuxt-link
                class="underline"
                :to="localePath('/catalog')"
              >{{ data.subtitle_action }}
              </nuxt-link
              >
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {imageHelper} from "@/mixins/imageHelper";
import {reactiveBreakpoints} from '@/mixins/reactiveBreakpoints'

export default {
  name: "GsrHomepageHero",
  mixins: [imageHelper, reactiveBreakpoints],
  components: {
    Searchbar: () => import("~/components/common/GsrSearchbar.vue"),
  },
  props: {
    data: {
      type: Object,
      default: () => {
      },
    },
    responsivemedia: {
      type: Object,
      default: () => {
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.gsr-homepage-hero {
  @apply relative;
  height: 50vh;
  h1 {
    z-index: 2;
  }

  .hero-section {
    @apply relative w-full grid;
    height: 50vh;
    place-content: center;
  }

  video {
    @apply absolute w-full;
    object-fit: cover;
    height: 50vh;
  }

  @screen md {
    height: 80vh;
    .image-wrapper {
      @apply w-full h-full;

      img {
        aspect-ratio: 16/9;
        max-height: 80vh;
        filter: brightness(0.75);
      }
    }
  }

  @screen lg {
    .hero-call2action-xl {
      margin-bottom: 150px;

      img {
        aspect-ratio: 263/42;
      }
    }
  }

}

</style>
