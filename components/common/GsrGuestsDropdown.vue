<template>
  <GsrDropdown :nav-classes="{'w-full':true}">
    <template v-slot:button>
      <div class="flex flex-row w-full items-center justify-between">
        <div class="font-light text-sm">
          <span>{{ guests }} {{ $t('common.guests') }}</span>
          <span v-if="value.newborns !== 0">, {{ value.newborns }} {{ $t('common.newborns') }}</span>
        </div>
        <svg-icon name="arrow-down" class="h-4 w-4"/>
      </div>
    </template>
    <div class="grid grid-cols-1 gap-6 bg-white w-full rounded-lg py-6 px-4 border border-gray-100">
      <div class="flex flex-row justify-between items-center">
        <span class="w-full font-medium">{{ $t('common.adults') }}</span>
        <div class="w-36">
          <GsrInputNumber readonly
                          :min="1"
                          :max="20"
                          :value="value.adults"
                          :increment-button-disabled="hasReachedMaximumGuests"
                          @input="onInput('adults',$event)"
          />
        </div>
      </div>
      <div class="flex flex-row justify-between items-center">
        <div class="flex flex-col w-full">
          <span class="font-medium">{{ $t('common.children') }}</span>
          <span>{{ $t('common.age') }} 2-12</span>
        </div>
        <div class="w-36">
          <GsrInputNumber readonly :max="20"
                          :value="value.children"
                          :increment-button-disabled="hasReachedMaximumGuests"
                          @input="onInput('children', $event)"
          />
        </div>
      </div>
      <div class="flex flex-row justify-between items-center">
        <div class="flex flex-col w-full">
          <span class="font-medium">{{ $t('common.newborns') }}</span>
          <span>{{ $t('common.up_to_2_years') }}</span>
        </div>
        <div class="w-36">
          <GsrInputNumber readonly :max="20"
                          :value="value.newborns"
                          @input="onInput('newborns', $event)"
          />
        </div>
      </div>
      <div class="flex flex-row justify-between items-center">
        <span class="w-full font-medium">{{ $t('common.pets') }}</span>
        <div class="w-36">
          <GsrInputNumber readonly :max="20"
                          :value="value.pets"
                          @input="onInput('pets', $event)"
          />
        </div>
      </div>
      <slot/>
    </div>
  </GsrDropdown>
</template>

<script>
const GsrDropdown = () => import('~/components/common/GsrDropdown.vue');
const GsrInputNumber = () => import('~/components/input/GsrInputNumber.vue');

export default {
  name: "GsrGuestsDropdown",
  components: {
    GsrInputNumber,
    GsrDropdown
  },
  props: {
    value: {
      type: Object,
      required: true
    },
    maxGuests: {
      type: Number,
      default: Infinity
    }
  },
  mounted() {
    this.onInput();
  },
  methods: {
    /**
     * @desc On input
     * @param key
     * @param value
     */
    onInput(key, value) {
      this.$emit("input", {...this.value, [key]: value});
    }
  },
  computed: {
    guests() {
      return this.value.adults + this.value.children
    },
    hasReachedMaximumGuests() {
      return this.guests >= this.maxGuests
    }
  }
}
</script>

<style scoped>

</style>
