<template>
  <nav v-if="data" class="gsr-pagination-nav">
    <div class="gsr-pagination-nav__arrow" @click="onArrowClick('prev')" :class="{disabled:data.current_page === 1}">
      <!-- Heroicon name: solid/chevron-left -->
      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
           aria-hidden="true">
        <path fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"/>
      </svg>
    </div>
    <div v-for="index in data.last_page" :key="index" @click="onClick(index)"
         class="gsr-pagination-nav__item" :class="{selected:data.current_page === index}">
      {{ index }}
    </div>
    <div class="gsr-pagination-nav__arrow" @click="onArrowClick('next')"
         :class="{disabled:data.current_page === data.last_page}">
      <!-- Heroicon name: solid/chevron-right -->
      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
           aria-hidden="true">
        <path fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"/>
      </svg>
    </div>
  </nav>
</template>

<script>
export default {
  name: "GsrPagination",
  props: {
    data: {
      type: Object,
      required: true
    },
  },
  methods: {
    /**
     * @desc On click event
     * @param value
     */
    onClick(value) {
      this.$emit('change', value);
    },
    /**
     * @desc On arrow click
     * @param direction
     */
    onArrowClick(direction) {
      if (direction === 'prev') {
        if (this.data.current_page >= 1) {
          this.onClick(this.data.current_page - 1)
        }
      }
      if (direction === 'next') {
        if (this.data.current_page < this.data.last_page) {
          this.onClick(this.data.current_page + 1)
        }
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.gsr-pagination-nav {
  @apply relative z-0 inline-flex rounded-md;

  &__arrow {
    @apply relative inline-flex items-center rounded-full px-2 py-2 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50;

    &:first-child {
      @apply mr-4
    }

    &:last-child {
      @apply ml-4
    }

    &.disabled {
      @apply pointer-events-none text-gray-200 hover:text-gray-200;
    }
  }

  &__item {
    @apply z-10 rounded-full text-gray-500 relative inline-flex items-center px-4 py-2 text-sm font-medium cursor-pointer hover:bg-gray-50 mx-1;

    &.selected {
      @apply bg-gray-800 text-white;
    }


  }
}
</style>
