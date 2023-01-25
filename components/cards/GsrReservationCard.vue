<template>
  <nuxt-link
    :to="localePath('/'+link)"
    class="gsr-reservation-card"
  >
    <div class="flex items-center justify-center rounded-t-xl flex-1">
      <picture v-if="image" class="h-full w-full">
        <source :srcset="image.src_set" type="image/webp">
        <source :srcset="image.fallback_url" type="image/jpeg">
        <img class="inset-0 w-full h-full object-cover rounded-t-xl"
             loading="lazy"
             style="aspect-ratio: 3/2"
             :src="image.fallback_url"
             :alt="image.alt"
             onerror="this.src='/fallback-accommodation-image.jpeg'"
        >
      </picture>

    </div>
    <div class="gsr-reservation-card__text-wrapper">
      <div class="m-auto flex flex-col w-full ml-0">
        <div class="flex flex-row w-full justify-between items-center">
          <div class="flex flex-col space-y-2">
            <span class="font-normal">{{ accommodation }}</span>
            <h3>{{ title }}</h3>
          </div>
          <div class="px-2 bg-gray-100 rounded-lg">
            <span class="text-sm font-medium">{{ $t(`reservation.status.${status.toLowerCase()}`)}}</span>
          </div>
        </div>
        <GsrDivider class="my-4"/>
        <div class="flex flex-row items-center">
          <div class="flex flex-row justify-between items-center w-full">
            <span class="text-lg font-normal">{{ dates }}</span>
            <div class="h-4 bg-gray-200 border-r border-gray-200 mx-2"/>
            <span class="text-lg font-normal">{{ address }}</span>
          </div>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
const GsrDivider = () => import('~/components/common/GsrDivider.vue');
export default {
  name: "GsrReservationCard",
  components: {
    GsrDivider
  },
  props: {
    image: {
      type: Object,
      default: () => {
      },
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
    dates: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
      required: false,
    },
    accommodation: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: ''
    }
  },
}
</script>

<style lang="scss" scoped>
.gsr-reservation-card {
  @apply cursor-pointer flex flex-col outline-none rounded-xl m-0 h-full w-full shadow-lg;

  &__image {
    @apply w-full bg-cover;

  }

  &__text-wrapper {
    @apply flex p-4;
    h3 {
      @apply mt-1 font-semibold text-xl truncate mt-0;
    }

    span {
      @apply text-gray-500 text-xs;
    }

    @screen lg {

    }
  }


}
</style>
