<template>
  <div class="flex flex-col w-full space-y-2 border-b border-gray-200 pb-4">
    <div class="flex flex-row w-full items-center justify-between">
      <span class="text-base font-medium">{{ title }}</span>
      <span class="text-sm underline font-medium text-red-500 hover:text-red-600 cursor-pointer"
            @click="onEditClick">{{ isContentVisible ? cancelText : editText }}</span>
    </div>
    <span v-if="!isContentVisible" class="text-sm text-gray-500 font-normal mt-1">{{ label && label !== 'null' ? label : $t('common.not_provided') }}</span>
    <div class="mt-2" v-else>
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: "GsrAccountElementEdit",
  props: {
    title: {
      type: String,
      default: ''
    },
    editText: {
      type: String,
      default: function (){
        return this.$t('common.edit')
      }
    },
    cancelText: {
      type: String,
      default: function (){
        return this.$t('common.cancel')
      }
    },
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isContentVisible: false,
    }
  },
  methods: {
    onEditClick() {
      this.isContentVisible = !this.isContentVisible
    }
  }
}
</script>

<style scoped>

</style>
