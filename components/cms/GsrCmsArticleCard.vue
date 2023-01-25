<template>
  <article class="gsr-cms-article-card">
    <div class="gsr-cms-article-card__text-wrapper">
      <div class="m-auto flex flex-col ml-0 py-3">
        <h3 v-if="data.content.title" v-html="$sanitize(data.content.title.value)"/>
        <small v-if="data.content.author">{{data.content.author.value}}</small>
        <small v-if="data.content.date">{{moment(data.content.date.value).format('DD-MM-YYYY')}}</small>
        <span v-if="data.content.subtitle" v-html="$sanitize(data.content.subtitle.value)" class="text-base font-normal mt-2"/>
        <GsrCmsDocument class="mt-2" :media="data.media"/>
      </div>
    </div>
  </article>
</template>

<script>
import moment from "moment";
export default {
  name: "GsrCmsArticleCard",
  props: {
    data:{
      type:Object
    },
  },
  components:{
    GsrCmsDocument: () => import('@/components/cms/GsrCmsDocument'),
  },
  data(){
    return {
      moment
    }
  }
}
</script>

<style lang="scss" scoped>
.gsr-cms-article-card {
  @apply cursor-pointer flex flex-col outline-none m-0 h-full w-full border-b border-gray-200 pb-4;

  &__image {
    @apply w-full bg-cover;

  }

  &__text-wrapper {
    @apply flex pt-2;
    h3 {
      @apply font-semibold text-lg;
    }

  }


}
</style>
