<template>
  <div>
    <div class="w-full flex pl-6 xl:pl-0" v-if="isAllDestinationsVisible">
      <section class="gsr-all-destinations" :class="{'gsr-collapsed':!isAllDestinationsExpanded}">
        <h2>{{ $t('footer.all_our_destinations') }}</h2>
        <AllDestinations class="mt-16" :items="destinations"/>
        <div class="gsr-all-destinations__show-all-container">
          <button v-if="!isAllDestinationsExpanded"
                  @click="isAllDestinationsExpanded = true">
            {{ $t('footer.show_all_destinations') }}
          </button>
        </div>
      </section>
    </div>
    <SmallFooter v-if="isSmall"/>
    <BigFooter v-else/>
  </div>
</template>

<script>
import {imageHelper} from "@/mixins/imageHelper";
import Destinations from '@/api_footer_destinations.json';

const AllDestinations = () => import('@/components/footer/AllDestinations.vue');
const BigFooter = () => import('@/components/layout/BigFooter.vue');
const SmallFooter = () => import('@/components/layout/SmallFooter.vue');
import {ref} from 'vue'
export default {
  setup() {
    const date = ref(new Date());
    let currentYear = date.value.getFullYear()

    return {currentYear}
  },
  name: 'Footer',
  mixins: [imageHelper],
  components: {
    SmallFooter,
    BigFooter,
    AllDestinations,
  },
  data() {
    return {
      isAllDestinationsExpanded: false
    }
  },
  computed: {
    destinations() {
      return Destinations.filter(
        item => item.locale === this.$i18n.locale,
      );
    },
    isAllDestinationsVisible() {
      if (this.$route && this.$route.name) {
        return this.$route.name.includes('index')
      } else {
        return false
      }
    },
    isVisible(){
      if (this.$route && this.$route.name) {
        return !this.$route.name.includes('destination')
      } else {
        return true
      }
    },
    isSmall(){
      if (this.$route && this.$route.name) {
        const conditions = ['destination', 'catalog']
        return conditions.some(el => this.$route.name.includes(el))
      } else {
        return false
      }
    }
  },
};
</script>

<style lang="scss" scoped>

.gsr-all-destinations {
    @apply flex flex-col w-full m-auto max-w-screen-xl relative;
    &.gsr-collapsed {
        height: 310px;
        overflow: hidden;
        @apply mb-6;
    }

    &__show-all-container {
        @apply absolute bottom-0 pt-4 w-full bg-white;

        button {
            @apply text-base underline font-medium text-left;
        }
    }
}

.gsr-wrapper {
    @apply bg-gray-100 px-8 py-16 w-full flex flex-col items-center;

    &__inner {
        @apply flex flex-col w-full m-auto max-w-screen-xl;
        section {
            @apply mb-10 flex-1;
        }

        @screen lg {
            @apply grid grid-cols-5 gap-8 w-full;
            height: 50%;
            section {
                @apply mb-0 justify-between h-full;
            }
        }
    }
}

</style>
