<template>
  <button :disabled="disabled || loading"
          class="gsr-button"
          :class="classObject"
          v-on="$listeners"
  >
    <div class="flex flex-row items-center transition-all duration-200 ease-in-out">
      <svg class="animate-spin h-4 w-4 mr-2 text-white" v-if="loading" xmlns="http://www.w3.org/2000/svg"
           fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <slot></slot>
    </div>
  </button>
</template>

<script>
export default {
  name: "GsrButton",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    simple: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    selected: {
      type: [Boolean, String],
      default: false,
    },
    variant: {
      type: String,
      validator: value => ['plain', 'outline', 'text'].includes(value),
      default: 'plain',
    },
    border: {
      type: String,
      validator: value => ['rounded', 'squared'].includes(value),
      default: 'squared',
    },
    bgColor: {
      type: String,
      validator: value => ['default', 'red'].includes(value),
      default: 'default'
    }
  },
  computed: {
    classObject() {
      return {
        [this.variant]: true,
        [this.border]: true,
        [this.bgColor]: true,
        disabled: this.disabled,
        selected: this.computedSelected,
      };
    },
    computedSelected() {
      if (typeof this.selected === 'string' || this.selected instanceof String) {
        return this.selected === 'true'
      } else {
        return this.selected
      }
    }
  },
  methods: {
    onClick() {
      this.$emit('click');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_variables.scss';

.gsr-button {
  @apply bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 px-4 py-2 rounded-lg text-white transition-all duration-200 ease-in-out;

  &:hover {
    @apply bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800;
  }

  &.red {
    @apply from-red-500 via-red-600 to-red-700;

    &:hover {
      @apply bg-gradient-to-r from-red-400 via-red-500 to-red-600;
    }
  }

  &:disabled {
    @apply opacity-50 pointer-events-none cursor-not-allowed;

  }

  &.text {
    @apply bg-transparent text-gray-800;
    background-image: none;
  }

  &.outline {
    @apply border border-gray-300 hover:border-gray-800 bg-transparent;
    color: $primary-dark;
    background-image: none;

    &.selected {
      @apply border-gray-800 bg-gray-100;
    }
  }

  &.rounded {
    @apply rounded-full;
  }
}
</style>
