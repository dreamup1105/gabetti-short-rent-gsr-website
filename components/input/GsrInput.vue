<template>
  <div class="gsr-field" :class="{error:error}">
    <textarea
      v-if="type==='textarea'"
      :name="name"
      :id="id"
      :disabled="disabled"
      :placeholder="placeholder"
      :value="value"
      :required="required"
      @blur="$emit('blur')"
      @input="onInput($event.target.value)"
    />
    <input
      v-else
      :type="type"
      :name="name"
      :id="id"
      :disabled="disabled"
      :placeholder="placeholder"
      :required="required"
      :value="value"
      :max="maxDate"
      :min="minDate"
      @blur="$emit('blur')"
      @input="onInput($event.target.value)"
    >
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script>

export default {
  name: 'GsrInput',
  $_veeValidate: {
    // fetch the current value from the innerValue defined in the component data.
    value() {
      return this.value;
    },
    name () {
      return this.name;
    }
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    additionalClasses: {
      type: Object,
      default: () => {
      },
    },
    placeholder: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String,Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    rules: {
      type: [String, Object],
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    immediate: {
      type: Boolean,
      default: false,
    },
    maxDate: {
      type: String,
    },
    minDate: {
      type: String,
      default: '1900-01-01'
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onInput(value) {
      this.$emit('input', value);
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('updated', val);
      }
    }
  }
};
</script>
<style lang="scss" scoped>

/**
* Make the field a flex-container, reverse the order so label is on top.
*/

.gsr-field {
  @apply flex flex-col-reverse border border-gray-200 rounded-lg p-2 transition-all duration-200 ease-in-out;

  &.error {
    @apply border-red-500;

    label {
      @apply text-red-500;
    }
  }
}

/**
* Add a transition to the label and input.
* I'm not even sure that touch-action: manipulation works on
* inputs, but hey, it's new and cool and could remove the
* pesky delay.
*/
label, input, textarea {
  transition: all 0.2s;
  touch-action: manipulation;
}

input, textarea {
  border: 0;
  font-family: inherit;
  -webkit-appearance: none;
  border-radius: 0;
  padding: 0;
  cursor: text;
  z-index: 1;
  background: transparent;

  &:disabled {
    @apply opacity-75 cursor-not-allowed pointer-events-none;
  }

}

input:focus, textarea:focus {
  outline: 0;
  //border-bottom: 1px solid #666;
}

label {
  @apply transition-all duration-200 ease-in-out capitalize;
  letter-spacing: 0.05em;
}

/**
* Translate down and scale the label up to cover the placeholder,
* when following an input (with placeholder-shown support).
* Also make sure the label is only on one row, at max 2/3rds of the
* field—to make sure it scales properly and doesn't wrap.
*/
input:placeholder-shown + label, textarea:placeholder-shown + label {
  @apply text-gray-500 font-light text-xs;
  cursor: text;
  max-width: 66.66%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transform-origin: left bottom;
  transform: translate(0, 1rem) scale(1.20);
}

/**
* By default, the placeholder should be transparent. Also, it should
* inherit the transition.
*/

// TODO Fix this things in one rule
::-webkit-input-placeholder,
{
  @apply opacity-0;
  transition: inherit;
}

::-moz-placeholder,
{
  @apply opacity-0;
  transition: inherit;
}

::-ms-input-placeholder,
{
  @apply opacity-0;
  transition: inherit;
}

:-moz-placeholder,
{
  @apply opacity-0;
  transition: inherit;
}

/**
* Show the placeholder when the input is focused.
*/
input:focus::-webkit-input-placeholder, textarea:focus::-webkit-input-placeholder {
  @apply opacity-100;
}

input:focus::-moz-placeholder, textarea:focus::-moz-placeholder {
  @apply opacity-100;
}

input:focus::-ms-input-placeholder, textarea:focus::-ms-input-placeholder {
  @apply opacity-100;
}

input:focus:-moz-placeholder, textarea:focus:-moz-placeholder {
  @apply opacity-100;
}

/**
* When the element is focused, remove the label transform.
* Also, do this when the placeholder is _not_ shown, i.e. when
* there's something in the input at all.
*/
input:not(:placeholder-shown) + label,
input:focus + label {
  @apply text-gray-500 font-light text-xs;
  transform: translate(0, 0) scale(1);
  cursor: pointer;
}

textarea:not(:placeholder-shown) + label,
textarea:focus + label {
  @apply text-gray-500 font-light text-xs;
  transform: translate(0, 0) scale(1);
  cursor: pointer;
}

</style>
