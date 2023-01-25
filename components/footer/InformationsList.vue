<template>
  <div>
    <h3 class="text-base font-bold tracking-wider uppercase">
      {{ $t('footer.informationsList.menu') }}
    </h3>
    <ul role="list" class="mt-4 space-y-2 text-sm">
      <li>
        <nuxt-link class="text-gray-700 hover:text-gray-900"
                   :to="localePath('/')">
          {{ $t('footer.informationsList.homepage') }}
        </nuxt-link>
      </li>
      <li>
        <nuxt-link class="text-gray-700 hover:text-gray-900"
                   :to="getPermalink('PressReview')">
          {{ $t('footer.informationsList.pressReview') }}
        </nuxt-link>
      </li>
      <li>
        <nuxt-link class="text-gray-700 hover:text-gray-900"
                   :to="getPermalink('InvestorRelations')">
          {{ $t('footer.informationsList.investorRelations') }}
        </nuxt-link>
      </li>
      <li>
        <nuxt-link class="text-gray-700 hover:text-gray-900"
                   :to="getPermalink('Contacts')">
          {{ $t('footer.informationsList.contacts') }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import ApiRoutes from '@/api_routes.json';
export default {
	name: 'InformationsList',
	components: {
	},
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
