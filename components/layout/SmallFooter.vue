<template>
  <div>
    <footer v-if="width >= breakpoints.md" class="bg-gray-100 fixed bottom-0 left-0 right-0 w-full z-40 border-t border-gray-200">
      <div class="mx-auto max-w-7xl py-2 px-6 xl:px-0 md:flex md:items-center md:justify-between text-gray-700">
        <div class="flex justify-center space-x-2 md:order-2" style="font-size: 14px">

          <nuxt-link class="text-gray-700 hover:text-gray-900"
                     :to="getPermalink('About')">
            {{ $t('footer.legal.about') }}
          </nuxt-link>
          <span class="leading-none">&#46;</span>
          <nuxt-link class="text-gray-700 hover:text-gray-900"
                     :to="getPermalink('Terms')">
            {{ $t('footer.legal.salesTermsShort') }}
          </nuxt-link>
          <span class="leading-none">&#46;</span>
          <nuxt-link class="text-gray-700 hover:text-gray-900"
                     :to="getPermalink('Cookie')">
            {{ $t('footer.legal.cookiePolicyShort') }}
          </nuxt-link>
          <span class="leading-none">&#46;</span>
          <nuxt-link class="text-gray-700 hover:text-gray-900"
                     :to="getPermalink('PressReview')">
            {{ $t('footer.informationsList.pressReview') }}
          </nuxt-link>
          <span class="leading-none">&#46;</span>
          <nuxt-link class="text-gray-700 hover:text-gray-900"
                     :to="getPermalink('InvestorRelations')">
            {{ $t('footer.informationsList.investorRelations') }}
          </nuxt-link>
          <span class="leading-none">&#46;</span>
          <nuxt-link class="text-gray-700 hover:text-gray-900"
                     :to="getPermalink('Contacts')">
            {{ $t('footer.informationsList.contacts') }}
          </nuxt-link>
          <div class="m-auto ml-4 cursor-pointer" @click="isBigFooterVisible = !isBigFooterVisible">
            <svg-icon name="arrow-up" class="h-4 w-4"/>
          </div>
        </div>
        <div class="mt-8 md:order-1 md:mt-0">
          <p class="text-center text-sm text-gray-700">&copy; {{ currentYear }} G Rent S.p.A.</p>
        </div>
      </div>
    </footer>
    <transition name="fade">
      <div v-if="isBigFooterVisible" class="bg-black opacity-20 fixed inset-0" style="z-index: 9998"
           @click="isBigFooterVisible=false"/>
    </transition>
    <transition name="slide-up" mode="out-in">
      <div v-if="isBigFooterVisible" class="fixed bottom-0 transition-all left-0 right-0 w-full pt-6 bg-white rounded-t-lg shadow-lg"
           style="z-index: 9999">
        <span @click="isBigFooterVisible=false" class="font-light cursor-pointer text-base pl-4">X</span>
        <div class="max-w-screen-xl mx-auto pb-10 pt-4 px-6 xl:px-0">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div class="md:grid md:grid-cols-2 md:gap-8">
              <ServicesList/>
              <LegalList class="mt-12 md:mt-0"/>
            </div>
            <div class="md:grid md:grid-cols-2 md:gap-8">
              <InformationsList/>
              <ContactsList class="mt-12 md:mt-0"/>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {ref} from 'vue'
import {reactiveBreakpoints} from '@/mixins/reactiveBreakpoints'
import ApiRoutes from '@/api_routes.json';

const BigFooter = () => import('@/components/layout/BigFooter.vue');

export default {
  setup() {
    const date = ref(new Date());
    let currentYear = date.value.getFullYear()

    return {currentYear}
  },
  name: "SmallFooter",
  mixins: [reactiveBreakpoints],
  components: {
    BigFooter,
  },
  data() {
    return {
      isBigFooterVisible: false,
    }
  },
  watch: {
    isBigFooterVisible(value) {
      value ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto"
    },
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
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: opacity .2s ease;
}

.slide-up-enter, .slide-up-leave-to /* .fade-leave-active below version 2.1.8 */
{
  transform: translateY(20rem);
  opacity: 0
}
</style>
