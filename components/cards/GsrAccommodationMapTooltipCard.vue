<template>
  <nuxt-link class="gsr-accommodation-map-tooltip-card" target="_blank" :to="localePath(`/${data.permalink}`)">
    <div class="gsr-accommodation-map-tooltip-card__slider">
      <GsrSlider
        class="gsr-accommodation-map-tooltip-card__slider-wrapper"
        v-if="data.media.length > 0 "
        :data="data.media"
        :slideLength="data.media.length"
      >
        <template
          v-slot="item"
        >
          <figure class="rounded-t-xl" style="width: 320px;height: 200px"
            :style="item.data.index === 0 ? {backgroundImage: `url(${blurImageURL(item.data.fallback_url)})`} : ''">
            <nuxt-img
              class="h-full w-full object-cover rounded-t-xl"
              :src="pathURL(item.data.original_url)"
              :class="imageIsLoaded ? 'opacity-100' : 'opacity-0'"
              :alt="item.data.alt"
              :title="data.title"
              loading="lazy"
              @load="onImageLoad"
            />
          </figure>
        </template>
      </GsrSlider>
    </div>
    <div @click.stop.prevent="onWishlistButtonClick(data.id)"
         class="gsr-wishlist-button"
         :class="{'gsr-selected':!!data.wishlist_id}"
    >
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"
           focusable="false"
           style="display: block; height: 24px; width: 24px; stroke-width: 2; overflow: visible;">
        <path
          d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
      </svg>
    </div>
    <div class="gsr-accommodation-map-tooltip-card__container">
      <div class="flex flex-col">
        <div class="grid grid-cols-1">
          <span class="text-gray-400 text-sm">Toscana</span>
          <span class="text-lg">{{ data.title }}</span>
        </div>
        <div class="gsr-description">
          {{ data.description }}
        </div>
        <div class="flex flex-row items-center" v-if="'estimated_price' in data">
          {{ data.estimated_price.price }} &euro; &#47; notte
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import {imageHelper} from "@/mixins/imageHelper";
export default {
  name: "GsrAccommodationMapTooltipCard",
  mixins: [imageHelper],
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      accommodation: {
        title: '',
        media: [],
        amenities: [],
        wishlist_id: false,
        short_description: '',
        description: '',
        address: {},
        estimated_price: {}
      }
    }
  },
  watch: {
    data: {
      deep: true,
      handler(val, oldVal) {
        this.accommodation = val;
      }
    },
  },
  methods: {
    /**
     * @desc On wishlist button click
     */
    onWishlistButtonClick(id) {
      if (this.data.wishlist_id) {
        this.detachFromWishlist()
      } else {
        this.$nuxt.$emit('_onOpenWishlistsModal', id)
      }
    },
    /**
     * @desc Detach accommodation from wishlist
     * @param id
     * @returns {Promise<void>}
     */
    async detachFromWishlist() {
      try {
        await this.$services.wishlists.detachAccommodation(this.accommodation.wishlist_id, this.accommodation.id, this.$i18n.locale)
        this.accommodation.wishlist_id = false;
      } catch (err) {
        console.error(err)
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/css/main.scss' as *;

.gsr-accommodation-map-tooltip-card {
    @apply flex flex-col w-full;

    &__slider {
        width: 300px;
        height: 200px;
        @apply rounded-xl;

        &-wrapper {
            width: 300px;
            height: 200px;
        }
    }

    .gsr-wishlist-button {
        @apply p-2 absolute rounded-full cursor-pointer right-0 z-20;

        svg {
            @apply transition-all duration-200 ease-in-out;
            stroke: #FFF;
            fill: gray;
            fill-opacity: 0.5;

            &:hover {
                transform: scale(1.1);
                transform-origin: 50% 50%;
            }

            @screen md {
                stroke: $primary-dark;
                fill: #FFF;
            }
        }

        @screen md {
            &:hover {
                @apply bg-gray-50;
            }
        }

        &.gsr-selected {
            svg {
                fill: rgb(255, 56, 92) !important;
                stroke: #FFF !important;
                fill-opacity: 1;
            }
        }
    }

    &__container {
        @apply p-4;

        .gsr-description {
            @apply text-xs text-gray-200;
            @include rows-truncate(2);
        }
    }
}

</style>
