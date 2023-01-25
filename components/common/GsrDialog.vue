<template>
  <transition name="gsr-fade">
    <div
      v-if="opened" class="gsr-dialog" :class="{'gsr-fullscreen':fullscreen}"
      @click="$emit('close')"
    >
      <div class="gsr-dialog__wrapper">
        <div class="gsr-dialog-container" :class="{[containerClasses]:true}" :style="containerStyle" @click.stop>
          <div class="gsr-dialog-container__header" v-if="!noHeader">
            <span class="text-xl cursor-pointer" @click="$emit('close')">x</span>
            <span class="capitalize-phrase font-medium text-base truncate">
              {{ title }}
            </span>
            <span></span>
          </div>
          <div class="gsr-dialog-container__body
          capitalize-phrase"
               :class="{[bodyClasses]:true}"
               :style="bodyStyle">
            <slot></slot>
          </div>
          <div class="gsr-dialog-container__footer" v-if="!noFooter">
            <slot name="footer">
              <div class="flex flex-row w-full justify-end space-x-2">
                <GsrButton :loading="loading" @click.native="$emit('confirm')">
                  {{ buttonTitle }}
                </GsrButton>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'GsrDialog',
  components: {
    GsrButton :() => import('@/components/common/GsrButton')
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    opened: {
      type: Boolean,
      default: false,
    },
    loading:{
      type:Boolean,
      default:false,
    },
    buttonTitle: {
      type: String,
      default: 'Ok',
    },
    noHeader: {
      type: Boolean,
      default: false,
    },
    noFooter: {
      type: Boolean,
      default: false,
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    containerClasses: {
      type: String,
      default: ''
    },
    bodyClasses: {
      type: String,
      default: ''
    },
    containerStyle: {
      type: Object,
      default: () => {}
    },
    bodyStyle: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    hasHeaderSlot() {
      return !!this.$slots.header || this.title;
    },
    hasBodySlot() {
      return !!this.$slots.body || this.content;
    },
  },
  watch: {
    opened(value) {
      value ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto"
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/_variables.scss';

.gsr-dialog {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;

  &__wrapper {
    display: table-cell;
    vertical-align: middle;
    @apply px-2;

    .gsr-dialog-container {
      @apply rounded-xl shadow-lg bg-white w-full m-auto max-w-screen-md;

      &__header {
        @apply inline-flex w-full border-b border-gray-200 items-center justify-between px-4;
        margin-top: 0;
        min-height: 64px;
      }

      &__body {
        @apply px-6 py-4 overflow-auto;
        max-height: 70vh;
      }

      &__footer {
        @apply w-full p-4 border-t border-gray-200;
      }
    }
  }

  &.gsr-fullscreen {
    .gsr-dialog__wrapper {
      @apply px-0;
      .gsr-dialog-container {
        @apply w-full h-full max-w-full rounded-none;

        &__body {
          @apply max-h-full;
        }
      }
    }
  }
}
</style>
