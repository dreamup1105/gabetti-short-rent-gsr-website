<template>
  <div class="gsr-select" :class="{error:error}">
    <select
      class=""
      :value="value"
      @input="onInput($event.target.value)"
      :disabled="disabled"
    >
      <option v-if="placeholderOption" value="">{{$t('common.select_option')}}</option>
      <option
        v-for="option in options"
        :key="option[optionKey]"
        :label="option[optionValue]"
        :value="option[optionKey]"
      >
        {{ option[optionValue] }}
      </option>
    </select>
  </div>
</template>

<script>

export default {
  name: 'GsrInput',
  props: {
    id: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String,Number],
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    error: {
      type: Boolean,
      default: false
    },
    options: {
      elements: Array,
      required: true
    },
    optionKey: {
      type: String,
      default: 'key'
    },
    optionValue: {
      type: String,
      default: 'value'
    },
    placeholderOption:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    onInput(value) {
      this.$emit('input', value);
    },
  },
};
</script>
<style lang="scss" scoped>

.gsr-select{
  select{
    @apply m-auto w-full outline-none text-sm bg-transparent;
  }
  &.error {
    @apply border-red-500;

    label {
      @apply text-red-500;
    }
  }
}
</style>
