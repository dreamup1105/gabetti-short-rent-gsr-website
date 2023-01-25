<template>
  <div>
    <div v-if="!user" class="flex flex-row justify-center w-full md:space-x-28">
      <GsrLoader/>
    </div>
    <div v-else class="flex flex-row w-full md:space-x-28">
      <div class="w-full md:w-3/5">
        <slot name="left"/>
      </div>
      <div class="hidden md:block w-2/5">
        <slot name="right"/>
      </div>
    </div>
  </div>
</template>

<script>
const GsrLoader = () => import('@/components/common/GsrLoader');
export default {
  name: "GsrAccountItemLayout",
  components: {
    GsrLoader
  },
  computed: {
    /**
     * @desc Return logged user data
     * @returns {*}
     */
    user() {
      return this.$store.state.auth.user;
    },
  }
}
</script>

<style scoped>

</style>
