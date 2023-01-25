<template>
  <nuxt-link
    :event="disabledLink ? '' : 'click'"
    :to="localePath(`/wishlists/${data.id}`)"
    class="gsr-wishlist-card"
    :class="{['gsr-'+this.direction]: true}"
  >
    <div class="gsr-wishlist-card__image-wrapper">
      <picture class="h-full w-full">
        <source :srcset="data.image.src_set" type="image/webp">
        <source :srcset="data.image.fallback_url" type="image/jpeg">
        <img
             loading="lazy"
             class="inset-0 w-full h-full object-cover rounded-xl" style="aspect-ratio: 3/2"
             :src="data.image.fallback_url"
             :alt="data.image.alt"
             :title="data.title"
             onerror="this.src='/fallback-accommodation-image.jpeg'"
        >
      </picture>
    </div>
    <div class="gsr-wishlist-card__text-wrapper">
      <div class="m-auto flex truncate flex-col ml-0">
        <h3>{{ data.title }}</h3>
        <span>
          {{ moment(data.start_date).format("D MMM YYYY") }}
          -
          {{ moment(data.end_date).format("D MMM YYYY") }}
        </span>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import moment from "moment";

export default {
  name: "SuggestionCard",
  props: {
    data: {
      type: Object,
    },
    direction: {
      type: String,
      validator: value => ['auto', 'horizontal', 'vertical'].includes(value),
      default: 'auto'
    },
    disabledLink:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      moment,
    }
  }
}
</script>

<style lang="scss" scoped>
.gsr-wishlist-card {
  @apply cursor-pointer flex flex-col outline-none rounded-xl m-0 h-full w-full truncate;

  &__image-wrapper {
    @apply flex items-center justify-center rounded-xl;
    img {
      @apply w-full bg-cover;
    }
  }

  &__text-wrapper {
    @apply flex py-2 flex-1 truncate;
    h3 {
      @apply font-semibold text-xl truncate;
    }

    span {
      @apply text-gray-500 font-normal text-sm;
    }

    @screen lg {

    }
  }

  &.gsr-horizontal {
    @apply flex-row space-x-4;

    .gsr-wishlist-card__image-wrapper{
      width: 5rem;
      height: 5rem;
    }

    h3{
      @apply text-base;
    }
  }


}
</style>
