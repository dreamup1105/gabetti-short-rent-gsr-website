<template>
  <div class="flex items-center justify-center w-full">
    <label class="flex items-center cursor-pointer">
      <!-- toggle -->
      <div class="relative">
        <!-- input -->
        <input type="checkbox" @input="onInput($event)" :checked="value" class="sr-only">
        <!-- line -->
        <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
        <!-- dot -->
        <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
      </div>
      <!-- label -->
      <div class="ml-3 text-gray-700 font-medium" v-if="label">
        {{ label }}
      </div>
    </label>

  </div>
</template>

<script>
export default {
  name: "GsrToggle",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
  },
  methods: {
    /**
     * @desc on Input
     */
    onInput(event) {
      this.$emit('input', event.target.checked);
    },
  }
}
</script>

<style lang="scss" scoped>
/* Toggle B */
input:checked ~ .dot {
  transform: translateX(100%);
  background-color: #48bb78;
}
</style>
