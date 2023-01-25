<template>
  <div>
    <h3 class="text-base font-bold tracking-wider uppercase">
      {{ $t('footer.servicesList.menu') }}
    </h3>
    <ul role="list" class="mt-4 space-y-2 text-sm">
      <li>
        <nuxt-link class="text-gray-700 hover:text-gray-900"
                   :to="localePath('/catalog')">
          {{ $t('footer.servicesList.luxuryHouses') }}
        </nuxt-link>
      </li>
      <li>
        <nuxt-link class="text-gray-700 hover:text-gray-900"
                   :to="localePath('/catalog?tags=corporate-building')">
          {{ $t('footer.servicesList.corporateHouses') }}
        </nuxt-link>
      </li>
      <li>
        <nuxt-link class="text-gray-700 hover:text-gray-900"
                   :to="getPermalink('Services')">
          {{ $t('footer.servicesList.services') }}
        </nuxt-link>
      </li>
      <li>
        <nuxt-link class="text-gray-700 hover:text-gray-900"
                   :to="getPermalink('EasyRentPolicy')">
          {{ $t('footer.servicesList.easyRentPolicy') }}
        </nuxt-link>
      </li>
      <li>
        <nuxt-link class="text-gray-700 hover:text-gray-900"
                   :to="localePath('/host-contact-request')">
          {{ $t('footer.servicesList.hostMembership') }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import ApiRoutes from '@/api_routes.json';

export default {
  name: 'ServicesList',
  components: {},
  methods: {
    getPermalink(type) {
      const locale = this.$i18n.locale
      let elements = ApiRoutes.filter(function (entity) {
        return entity.type === type && entity.locale === locale;
      });

      if (elements.length) {
        return this.localePath(`/${elements[0].permalink}`)
      } else {

      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
