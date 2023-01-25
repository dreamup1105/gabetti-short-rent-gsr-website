<template>
  <div class="gsr-cms-text" v-html="$sanitize(content)"/>
</template>

<script>
export default {
  name: "GsrCmsText",
  props: {
    content: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
    .gsr-cms-text {
        line-height: 2;
        color: #524e4e;
    }

    :deep() {

        ul, ol  {
            margin: 20px 0 20px 0;
        }
        ul li, ol li {
            list-style: none;
            position: relative;
            padding: 4px 0 2px 20px;
        }

       ul li::before, ol li::before {
            content: '*';
            position: absolute;
            top: 6px;
            left: 0;
        }
    }
</style>
