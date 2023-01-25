<template>
  <footer class="bg-gray-100">
    <div class="max-w-screen-xl mx-auto py-12 px-6 lg:py-16 xl:px-0">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="space-y-8 xl:col-span-1">
          <nuxt-link :to="localePath('/')" class="flex justify-start h-14">
            <nuxt-img
              :src="pathURL('https://gabettishortrent.fra1.digitaloceanspaces.com/static/logo.svg')"
              alt="Gabettishortrent Logo"
              loading="eager"
              width="145"
              height="56"
            />
          </nuxt-link>
          <p class="text-gray-500 text-base">{{ $t('footer.aboutUs.text') }}</p>
        </div>
        <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
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
      <div class="mt-12 border-t border-gray-200 pt-8">
        <p class="text-base text-gray-400 xl:text-center">&copy; {{currentYear}} G Rent S.p.A. Tutti i diritti riservati P.IVA 10752440965 | <span class="credits">designed by <a rel="nofollow" target="_blank" href="https://shinesoftware.it">Shine Software</a></span></p>
      </div>
    </div>
  </footer>
</template>

<script>
import {ref} from "vue";
import {imageHelper} from "@/mixins/imageHelper";

const AboutUs = () => import('@/components/footer/AboutUs.vue');
const ContactsList = () => import('@/components/footer/ContactsList.vue');
const ServicesList = () => import('@/components/footer/ServicesList');
const LegalList = () => import('@/components/footer/LegalList');
const InformationsList = () => import('@/components/footer/InformationsList');
export default {
  setup() {
    const date = ref(new Date());
    let currentYear = date.value.getFullYear()

    return {currentYear}
  },
  name: "BigFooter",
  mixins:[imageHelper],
  components:{
    AboutUs,
    ContactsList,
    ServicesList,
    LegalList,
    InformationsList,
  }
}
</script>

<style scoped>

</style>
