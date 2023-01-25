<template>
  <div class="gsr-input-number">
    <div class="gsr-input-number__inner">
      <button @click="decrementCount" :disabled="decrementDisabled || disabled">
        <span>-</span></button>
      <input
        :readonly="readonly"
        id="input-number"
        v-model="count"
        pattern="[0-9]*"
        inputmode="numeric"
        :max="max"
        :min="min"
        :class="{disabled: disabled}"
        class="input-number"
        name="input-number"
        type="text"
        @input="input"
      >
      <button @click="incrementCount" :disabled="incrementDisabled || disabled">
        <span>+</span></button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GsrInputNumber',
  props: {
    keyId: {
      type: String,
      default: null,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 999,
    },
    label: {
      type: String,
      default: null,
    },
    value: {
      type: Number,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    incrementButtonDisabled:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      count: 0,
      // visible: this.price,
      arrowUp: 'https://img.icons8.com/android/24/000000/collapse-arrow.png',
      arrowDown: 'https://img.icons8.com/android/24/000000/expand-arrow.png',
    };
  },
  watch: {
    value() {
      if (this.value) {
        this.count = this.value;
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.value) {
        this.count = this.value;
      }
    });
  },
  computed: {
    decrementDisabled() {
      return this.count <= this.min;
    },
    incrementDisabled() {
      return this.count >= this.max || this.incrementButtonDisabled;
    },
  },
  methods: {
    /**
     * @desc on Input
     */
    input() {
      // Remove all characters expect numbers
      if (isNaN(this.count)) {
        this.count = this.count.replace(/[^0-9]/g, '');
        this.count = parseInt(this.count);
        return;
      }
      // Check for mobile input
      if (this.count < this.min || this.count > this.max) {
        this.count = 1;
      }
      this.$emit('input', this.count, this.keyId);
    },
    /**
     * @desc Increment count
     */
    incrementCount() {
      if (!this.disabled && this.count < this.max) {
        this.count++;
        this.input();
      }
    },
    /**
     * @decrement count
     */
    decrementCount() {
      if (!this.disabled && this.count > this.min) {
        this.count--;
        this.input();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/_variables.scss';

.gsr-input-number {
  @apply w-full flex flex-col font-bold uppercase relative cursor-default;

  &__label-wrapper {
    @apply text-center mx-auto;

  }

  .disabled {
    @apply text-gray-400;
  }

  &__inner {
    @apply inline-flex justify-between items-center rounded-full font-light w-full;

    button {
      -webkit-box-pack: center;
      -webkit-box-align: center;
      -webkit-box-flex: 0;
      width: 32px;
      height: 32px;
      flex-grow: 0;
      flex-shrink: 0;
      cursor: pointer;
      display: inline-flex;
      margin: 0;
      padding: 0;
      text-align: center;
      text-decoration: none;
      border-width: 1px;
      border-style: solid;
      border-color: rgb(176, 176, 176);
      color: rgb(113, 113, 113);
      font-family: inherit;
      outline: none;
      touch-action: manipulation;
      align-items: center;
      justify-content: center;
      background: rgb(255, 255, 255);
      border-radius: 50%;

      &:disabled:hover {
        color: rgb(235, 235, 235);
        border-color: rgb(235, 235, 235);
        background: rgb(255, 255, 255);
      }

      &:hover {
        color: rgb(34, 34, 34);
        border-color: rgb(34, 34, 34);
        background: rgb(255, 255, 255);
      }

      &:disabled {
        cursor: not-allowed;
        color: rgb(235, 235, 235);
        border-color: rgb(235, 235, 235);
        background: rgb(255, 255, 255);
      }
    }

    input {
      min-width: 2.75rem;
      @apply w-full bg-transparent font-medium text-center outline-none;
    }

    /*TO HIDE DEFAULT INPUT ARROWS*/
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type=number] {
      -moz-appearance: textfield;
    }
  }
}
</style>
