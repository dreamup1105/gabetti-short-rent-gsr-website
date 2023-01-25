<template>
	<section class="w-full flex flex-col justify-between items-center md:items-start">
		<!--		First logo-->
		<nuxt-link :to="localePath('/')" class="flex justify-start w-48">
      <nuxt-img
          :src="pathURL('https://gabettishortrent.fra1.digitaloceanspaces.com/static/logo.svg')"
          alt="gabettishortrent"
      />
		</nuxt-link>
		<!--		Contacts-->
		<div class="pt-6 text-xs text-center md:text-left">
      <p>
        {{ $t('footer.aboutUs.text') }}
      </p>
		</div>
	</section>
</template>

<script>
import {imageHelper} from "@/mixins/imageHelper";
export default {
	name: 'AboutUs',
  mixins: [imageHelper],
};
</script>
