<template>
  <div class="gsr-global-search">
    <input
      @focusin="isDropdownVisible = true"
      @focusout.prevent="isDropdownVisible = false"
      @input="onSearch($event.target.value)"
      v-model="query"
      :placeholder="$t('common.everywhere')"
    >
    <div
      v-show="isDropdownVisible && items.length"
      class="gsr-global-search__menu"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1">
      <div class="py-2" role="none">
        <div v-for="(item,index) in items"
             @mousedown="onSelect(item)"
             @click="onSelect"
             :key="index"
             class="gsr-global-search__menu-item"
             role="menuitem"
             tabindex="-1"
        >
          <div v-if="item.type ==='accommodation'"
               class="w-12 h-12 bg-gray-100 border-gray-50 flex rounded-lg mr-4 flex-shrink-0">
            <picture>
              <source sizes="50px" :srcset="item.image.src_set" type="image/webp">
              <source sizes="50px" :srcset="item.image.fallback_url" type="image/jpeg">
              <img class="inset-0 w-full h-full bg-gray-100 object-cover rounded-lg"
                   style="aspect-ratio: 3/2"
                   loading="eager"
                   :src="item.image.fallback_url"
                   :alt="item.image.alt"
                   :title="item.name"
                   width="48"
                   height="48"
                   sizes="50px"
                   onerror="this.src='/img-loading-bg.jpg'"
              >
            </picture>
          </div>
          <div v-else class="w-12 h-12 bg-gray-100 border-gray-50 flex rounded-lg mr-4 flex-shrink-0">
            <svg-icon class="h-4 w-4 m-auto" :name="getIconName(item.type)"/>
          </div>
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'GlobalSearch',
  props: {
    focusOnMounted: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      selectedItem: {},
      items: [],
      timeout: null,
      query: '',
      showNoResults: false,
      isLoading: false,
      isDropdownVisible: false
    };
  },
  mounted() {
    if (this.focusOnMounted) {
      this.$refs.globalSearchSelect.$el.focus();
    }
  },
  watch: {
    value: {
      // the callback will be called immediately after the start of the observation
      deep: true,
      immediate: true,
      handler(val, oldVal) {
        this.selectedItem = val
        if (val) {
          this.query = val.name
        }
      }
    },
  },
  methods: {
    /**
     * @desc On search callback
     * @param query
     */
    onSearch(query) {
      this.$emit('input', {
        'name':query,
        'permalink':query.toLowerCase(),
        'type':'custom'
      });
      clearTimeout(this.timeout);
      const vm = this;
      this.timeout = setTimeout(function () {
        vm._search(query);
      }, 400);
    },
    /**
     * @desc On select
     * @param value
     */
    onSelect(value) {
      this.$emit('input', value);
    },

    /**
     * @desc Get icon name by type
     * @param type
     * @returns {string}
     */
    getIconName(type){
      switch (type){
        case 'city':
        case 'region':
        case 'country':
        case 'zone':
          return 'location-outline'
        case 'tag':
          return 'hashtag'
      }
    },
    /**
     * @desc Search data
     * @param query
     * @returns {Promise<void>}
     * @private
     */
    async _search(query) {
      if (!query) {
        return;
      }
      this.showNoResults = false;
      this.isLoading = true;
      try {
        this.items = (await this.$services.homepage.getSearchResult(query, this.$i18n.locale)).data;
      } catch (e) {
        console.error(e);
      } finally {
        this.showNoResults = true;
        this.isLoading = false;
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.gsr-global-search {
  @apply w-full relative inline-block text-left;

  input {
    @apply w-full outline-none bg-transparent;
  }

  &__menu {
    @apply origin-top-right z-10 absolute right-0 mt-6 w-full min-w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none;

    &-item {
      @apply block px-4 py-2 cursor-pointer flex flex-row items-center transition-all duration-100 ease-in-out;

      &:hover {
        @apply bg-gray-50;
      }

      span {
        @apply text-base font-normal truncate;
      }
    }
  }
}
</style>
