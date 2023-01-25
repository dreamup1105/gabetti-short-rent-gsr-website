<template>
  <section class="gsr-contacts-list">
    <div class="gsr-contacts-list__inner">
			<span class="uppercase font-bold md:pr-4 text-base leading-none">
				{{ $t('footer.contactsList.menu') }}
			</span>
      <ul class="text-sm w-20 md:w-full leading-snug capitalize text-gray-700">
        <li class="flex flex-col mt-2 text-gray-700">
          <span>{{ $t('footer.contactsList.reservations') }}:</span>
          <a class="lowercase hover:text-gray-900" :href="`mailto:${data.email}`">{{data.email}}</a>
        </li>

        <li class="flex flex-col mt-4 text-gray-700">
          <span>{{ $t('footer.contactsList.telephone') }}:</span>
          <a class="lowercase hover:text-gray-900" :href="`tel:${data.phone}`">{{data.phone}}</a>
          <a v-if="data.secondaryPhone" class="lowercase hover:text-gray-900" :href="`tel:${data.secondaryPhone}`">{{data.secondaryPhone}}</a>
        </li>

        <li class="flex flex-col mt-4 text-gray-700">
          <span>{{ $t('footer.contactsList.address') }}:</span>
          <span>{{data.name}}</span>
          <span><a :href="data.mapsLink" target="_blank">{{ data.address }}</a></span>
        </li>
      </ul>
    </div>

    <div class="flex items-end hidden md:block">
    </div>
  </section>
</template>
<script>
import FooterData from '@/api_footer_data.json';
export default {
  name: 'ContactsList',
  data(){
    return{
      data:FooterData
    }
  }
};
</script>

<style lang="scss" scoped>

.gsr-contacts-list {
  @apply flex flex-col items-start ;

  &__inner {
    @apply grid grid-cols-1 gap-4;

  }
}
</style>
