<template>
  <div class="gsr-destinations-footer-container">
    <template v-for="(item, key) in items">
      <div class="mb-8 mt-4">
        <nuxt-link :to="parsePermalink(item.permalink)">
          <strong>{{ item.name }}</strong>
        </nuxt-link>
      </div>
      <template v-for="city in item.cities">
        <nuxt-link :to="parsePermalink(city.permalink)" class="mb-2">
          {{ city.name }}
        </nuxt-link>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: "AllDestinations",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    parsePermalink(permalink) {
      return this.localePath(`/q/${permalink}`);
    }
  },
}
</script>

<style lang="scss" scoped>
.gsr-destinations-footer-container {
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
  color: #222222;
  flex-direction: column;


  @screen lg{
    flex-direction: initial;
    -webkit-flex-flow: column wrap;
    -ms-flex-flow: column wrap;
    flex-flow: column wrap;
    max-height: 2600px;
  }
}
</style>
