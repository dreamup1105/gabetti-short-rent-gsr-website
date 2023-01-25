<template>
  <div v-if="isBannerVisible" class="gsr-modal-banner relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" @click.prevent="onCloseModal">
    <div class="fixed inset-0 bg-gray-800 bg-opacity-80 transition-opacity"></div>
    <div class="fixed inset-0 z-10 flex min-h-full items-center justify-center">
      <div class="gsr-modal-banner__content text-center relative">
              <button type="button" @click.prevent="onCloseModal" class="gsr-modal-banner__close-btn absolute right-0 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g data-name="Layer 2"><path d="m13.41 12 4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" data-name="close"/></g></svg>
      </button>
      <nuxt-link :to="localePath('/meetings')">
      <figure class="rounded-lg shadow-lg"
            :style="{backgroundImage: `url(${blurImageURL(BannerImageURL)})`}">
        <nuxt-img class="mx-auto rounded-lg" :src="pathURL(BannerImageURL)"
                  :class="imageIsLoaded ? 'opacity-100' : 'opacity-0'"
                  alt="Charity gala callout"
                  width="1920"
                  height="960"
                  sizes="sm:100vw md:100vw lg:100vw xl:100vw"
                  @load="onImageLoad"
                  />
      </figure>
      </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import {imageHelper} from "@/mixins/imageHelper";
export default {
  name: "GsrModalBanner",
  mixins: [imageHelper],
   data() {
    return {
      BannerImageURL: 'https://gabettishortrent.fra1.digitaloceanspaces.com/static/charity-gala-callout-banner.png',
      isBannerVisible: true
    }
  },
  methods: {
    onCloseModal() {
      this.isBannerVisible = false
    }
  }
}
</script>

<style scoped lang="scss">
.gsr-modal-banner {
  &__content{
    max-width: 95%;
    @screen md {
      max-width: 700px;
    }
    @screen lg {
      max-width: 900px
    }
    image {
      will-change: opacity;
    }
  }
  &__close-btn {
    right: 5px;
    top: 5px;
    svg {
      fill: #db213a
    }
  }
}
</style>
