<template>
  <div class="gsr-accordion">
    <div
      class="gsr-accordion__trigger"
      :class="{'accordion__trigger_active': isOpen}"
      @click="open">

      <!-- This slot will handle the title/header of the accordion and is the part you click on -->
      <span class="text-sm font-regular">{{title}}</span>
      <svg-icon :class="{'gsr-rotated-icon':!isOpen}" name="arrow-up" class="h-3 w-3 transition-all duration-100 ease-in-out"/>
    </div>

    <transition
      name="accordion"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end">

      <div class="gsr-accordion__content"
           v-show="isOpen">
        <slot/>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "GsrAccordion",
  props: {
    title:{
      type:String,
      required:true
    },
    isInitiallyOpen:{
      type:Boolean,
      default:false
    }
  },
  mounted() {
    this.isOpen = this.isInitiallyOpen
  },
  data() {
    return {
      index: null,
      isOpen:false
    };
  },
  methods: {
    open() {
      this.isOpen = !this.isOpen;
    },
    start(el) {
      el.style.height = el.scrollHeight + "px";
    },
    end(el) {
      el.style.height = "";
    }
  },
};
</script>

<style lang="scss" scoped>

.gsr-accordion{
  @apply flex flex-col w-full;

  &__trigger{
    @apply flex flex-row justify-between cursor-pointer items-center;
  }

  &__content{
    @apply py-2 px-1;
  }
}

.gsr-rotated-icon{
  transform: rotate(180deg)
}

/* Animation */
.accordion-enter-active,
.accordion-leave-active {
  will-change: height, opacity;
  transition: height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.accordion-enter,
.accordion-leave-to {
  height: 0 !important;
  opacity: 0;
}
</style>
