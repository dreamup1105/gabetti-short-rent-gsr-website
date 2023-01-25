<template>
  <nuxt-link
    class="gsr-accommodation-card"
    :class="{ ['gsr-' + this.direction]: true }"
    target="_blank"
    :to="
      localePath(
        `/${accommodation.permalink}//${
          queryString && queryString !== 'null' ? '?' + queryString : ''
        }`
      )
    "
  >
    <div
      class="gsr-accommodation-card__not-reservable"
      v-if="!accommodation.has_minimum_reservable_nights"
    >
      <svg-icon
        name="card-slash"
        class="h-4 w-4 transition-all duration-100 ease-in-out"
      />
    </div>
    <div class="gsr-accommodation-card__slider h-full relative">
      <div
        @click.stop.prevent="onWishlistButtonClick(accommodation.id)"
        class="gsr-accommodation-card__wishlist-button"
        :class="{ 'gsr-selected': !!accommodation.wishlist_id }"
      >
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          style="display: block; height: 24px; width: 24px; stroke-width: 2; overflow: visible;"
        >
          <path
            d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"
          ></path>
        </svg>
      </div>
      <GsrSlider
        class="gsr-accommodation-card__slider-wrapper"
        v-if="accommodation.media.length > 0"
        :data="accommodation.media"
        :slideLength="accommodation.media.length"
      >
        <template v-slot="item">
          <!-- sizes="(max-width: 767px) 310px, ((min-width: 768px) and (max-width: 1279)) 400px,(min-width: 1279px) 310px" -->
          <nuxt-img
            class="gsr-image"
            :src="pathURL(item.data.fallback_url)"
            :alt="item.data.alt"
            :title="accommodation.title"
            width="1920"
            height="1080"
            sizes="xs:100vw"
            provider="twicpics"
            :loading="item.data.index === 0 ? 'eager' : 'lazy'"
            onerror="this.src='/fallback-accommodation-image.jpeg'"
          />
        </template>
      </GsrSlider>
    </div>
    <div
      class="gsr-accommodation-card__container"
      :class="bodyClasses"
      :style="bodyStyle"
    >
      <div class="flex flex-col h-full w-full">
        <div class="grid">
          <span class="text-gray-500 text-sm gsr-accommodation-card__accommodation-address">{{
              parseRegionTitle(accommodation.address)
            }}</span>
          <span class="text-md truncate gsr-accommodation-card__accommodation-title">{{ accommodation.title }}</span>
          <div class="gsr-accommodation-card__accommodation-price mt-2 md:mt-0"
               v-if="'per_night' in accommodation.estimated_price"
          >
          <span class="mr-1" v-if="!computedIsReservableOnlyRequest">
            <strong>{{
                accommodation.estimated_price.per_night_without_taxes
              }}</strong> <span>&euro;</span>
            &#47; {{ $t("common.per_night") }}</span
          >
            <span class="mr-1" v-else>
            <strong>{{$t('common.on_request')}}</strong>
            </span>
          </div>
          <div
            class="flex flex-row items-center mt-2 flex-wrap truncate gsr-accommodation-card__accommodation-amenities"
            v-if="showAmenities"
          >
            <span
              v-for="(amenity, index) in accommodation.amenities"
              :key="index"
              class="mr-1 text-xs text-gray-800 capitalize font-normal"
            >
              {{ amenity.type !== "BOOLEAN" ? amenity.value + " " : null }}
              {{ amenity.name }}
              <span
                v-if="index != Object.keys(accommodation.amenities).length - 1"
              >-</span
              ></span
            >
          </div>
        </div>

        <!-- Description -->
        <!-- <div
          v-if="direction !== 'vertical' && showDescription"
          class="border-b text-gray-200 mt-2"
          style="width: 30px;"
        ></div>
        <div
          class="gsr-description"
          v-html="$sanitize(computedDescription)"
        ></div> -->
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import {imageHelper} from "@/mixins/imageHelper";

export default {
  name: "GsrAccommodationCard",
  mixins: [imageHelper],
  props: {
    data: {
      type: Object,
      required: true
    },
    direction: {
      type: String,
      validator: value => ["auto", "horizontal", "vertical"].includes(value),
      default: "auto"
    },
    queryString: {
      type: String,
      default: ""
    },
    showAmenities: {
      type: Boolean,
      default: true
    },
    showDescription: {
      type: Boolean,
      default: true
    },
    bodyClasses: {
      type: String,
      default: ""
    },
    bodyStyle: {
      type: String,
      default: ""
    }
  },
  created() {
    this.$nuxt.$on("_onAccommodationAddedToWishlist", data => {
      if (this.accommodation.id === data.accommodation_id) {
        this.accommodation.wishlist_id = data.wishlist_id;
      }
    });
  },
  beforeDestroy() {
    this.$nuxt.$off("_onAccommodationAddedToWishlist");
  },
  mounted() {
    this.$nextTick(() => {
      if (this.data) {
        this.accommodation = this.data;
        this.sliderKey += 1;
      }
    });
  },
  data() {
    return {
      sliderKey: 0,
      accommodation: {
        title: "",
        media: [],
        amenities: [],
        wishlist_id: false,
        short_description: "",
        description: "",
        address: {},
        estimated_price: {}
      }
    };
  },
  watch: {
    data: {
      deep: true,
      handler(val) {
        this.accommodation = val;
      }
    }
  },
  computed: {
    computedDescription() {
      let string = this.accommodation.short_description
        ? this.accommodation.short_description
        : this.accommodation.description;

      if (string && typeof string === "string" && string.length > 100) {
        //trim the string to the maximum length
        const trimmedString = string.substr(0, 300);

        //re-trim if we are in the middle of a word
        return (
          trimmedString.substr(
            0,
            Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
          ) + "..."
        );
      } else {
        return string;
      }
    },
    /**
     * @desc Computed is payable
     * @returns {boolean|*}
     */
    computedIsReservableOnlyRequest() {
      if (this.accommodation && this.accommodation.is_reservable_only_on_request !== null) {
        return this.accommodation.is_reservable_only_on_request
      } else {
        return false
      }
    },
  },
  methods: {
    /**
     * @desc On wishlist button click
     */
    onWishlistButtonClick(id) {
      if (this.accommodation.wishlist_id) {
        this.detachFromWishlist();
      } else {
        this.$nuxt.$emit("_onOpenWishlistsModal", id);
      }
    },
    /**
     * @desc Parse region title
     * @param address
     * @returns {*}
     */
    parseRegionTitle(address) {
      if (address.region) {
        return address.region;
      } else if (address.country) {
        return address.country;
      } else if (address.city) {
        return address.city;
      }
    },

    /**
     * @desc Detach accommodation from wishlist
     * @param id
     * @returns {Promise<void>}
     */
    async detachFromWishlist() {
      try {
        await this.$services.wishlists.detachAccommodation(
          this.accommodation.wishlist_id,
          this.accommodation.id,
          this.$i18n.locale
        );
        this.accommodation.wishlist_id = false;
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@use '@/assets/css/main.scss' as *;

.gsr-accommodation-card {
  @apply flex flex-col w-full relative;

  &__not-reservable {
    @apply p-2 absolute left-0 z-20 text-white;
  }

  &__wishlist-button {
    @apply p-2 absolute rounded-full cursor-pointer right-0 z-20;

    svg {
      @apply transition-all duration-200 ease-in-out;
      stroke: #fff;
      fill: gray;
      fill-opacity: 0.5;

      &:hover {
        transform: scale(1.1);
        transform-origin: 50% 50%;
      }

      @screen md {
        stroke: $primary-dark;
        fill: #fff;
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
        stroke: #fff !important;
        fill-opacity: 1;
      }
    }
  }

  &__slider {
    @apply rounded-xl w-full h-auto;
    aspect-ratio: 3 / 2;

    @screen md {
      width: 300px;
      height: 200px;
      aspect-ratio: initial;
    }

    @screen lg {
      width: 450px;
    }
  }

  &__container {
    .grid {
      grid-template-columns: 1fr auto;
      grid-template-rows: 1fr 1fr 1fr;
      grid-template-areas: "Address Price"
                           "Title Title"
                           "Amenities Amenities";
    }
  }

  &__accommodation-address {
    grid-area: Address;
  }

  &__accommodation-title {
    grid-area: Title;
  }

  &__accommodation-price {
    grid-area: Price;
  }

  &__accommodation-amenities {
    grid-area: Amenities;
  }

  .gsr-image {
    aspect-ratio: 3 / 2;
    @apply h-full w-full object-cover cursor-pointer rounded-xl blur-3xl;
  }

  &__container {
    @apply pt-4 w-full;

    @screen md {
      @apply px-4 pt-0;
    }
  }

  .gsr-description {
    @apply text-xs text-gray-600 font-light mt-4;
    @include rows-truncate(3);
  }

  @screen md {
    @apply flex-row;
  }

  &.gsr-vertical {
    @apply flex-col;

    .gsr-accommodation-card__slider {
      @apply w-full h-auto;
      aspect-ratio: 3 / 2;

      &-wrapper {
        @apply w-full h-full;
        aspect-ratio: 3 / 2;
      }
    }

    .gsr-accommodation-card__container {
      @apply pt-4 px-0 pb-0;
    }

    .gsr-description {
      @include rows-truncate(2);
    }
  }
}

:deep(.gsr-accommodation-card__slider-wrapper) {
  @apply w-full;
  height: auto !important;
  aspect-ratio: 3 / 2;

  @screen md {
    width: 300px;
    aspect-ratio: initial;
  }

  @screen lg {
    width: 450px;
  }
}

:deep(.gsr-accommodation-card__wishlist-button) {
  &:hover {
    @apply bg-transparent;
  }

  &:not(.gsr-selected) {
    svg {
      stroke: #fff !important;
      fill: transparent;
      fill-opacity: 0.5;
    }
  }
}
</style>
