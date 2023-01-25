<template>
  <div class="gsr-dropdown">
    <div class="flex items-center">
      <button type="button" class="m-auto w-full" :aria-label="buttonName" :name=buttonName>
        <slot name="button"></slot>
      </button>
    </div>
    <nav tabindex="0">
      <slot/>
    </nav>
  </div>
</template>

<script>
export default {
  name: "GsrDropdown",
  props: {
    navClasses: {
      type: Object,
      default: () => {
      }
    },
    buttonName: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>

.gsr-dropdown {
  @apply relative;

  button {
    @apply cursor-pointer;
  }

  nav {
    @apply absolute top-full right-0 opacity-0 invisible rounded-lg shadow-xl;
    z-index: 99;
    transition-duration: 300ms;
    transition-property: transform, opacity, visibility;
  }

  &:hover nav,
  &:focus-within nav,
  &:focus nav {
    @apply opacity-100 visible;
    transform: translateY(0.25rem);
  }
}
</style>
