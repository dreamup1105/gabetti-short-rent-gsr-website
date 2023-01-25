<template>
  <div>
    <h3 class="text-base font-bold tracking-wider uppercase">
      {{ $t('footer.legal.menu') }}
    </h3>
    <ul role="list" class="mt-4 space-y-2 text-sm">
      <li>
        <nuxt-link class="text-gray-700 hover:text-gray-900"
                   :to="getPermalink('About')">
          {{ $t('footer.legal.about') }}
        </nuxt-link>
      </li>
      <li>
        <nuxt-link class="text-gray-700 hover:text-gray-900"
                   :to="getPermalink('Terms')">
          {{ $t('footer.legal.salesTerms') }}
        </nuxt-link>
      </li>
      <li>
        <nuxt-link class="text-gray-700 hover:text-gray-900"
                   :to="getPermalink('Cookie')">
          {{ $t('footer.legal.cookiePolicy') }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import ApiRoutes from '@/api_routes.json';

export default {
  name: 'LegalList',
  methods: {
    getPermalink(type) {
      const locale = this.$i18n.locale
      let elements = ApiRoutes.filter(function (entity) {
        return entity.type === type && entity.locale === locale;
      });

      if (elements.length) {
        return this.localePath(`/${elements[0].permalink}`)
      }else{

      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
