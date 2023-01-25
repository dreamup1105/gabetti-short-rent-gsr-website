<template>
  <div class="flex flex-col space-y-4">
    <div v-for="document in media" :key="document.id">
      <span class="cursor-pointer text-red-600 hover:text-red-700" @click="onDownload(document.id)">{{
          document.name
        }}</span>
    </div>
  </div>
</template>

<script>
import FileSaver from 'file-saver';

export default {
  name: "GsrCmsDocument",
  props: {
    media: {
      type: Array,
      default: () => []
    },
  },
  methods: {
    /**
     * @∂esc Download file
     * @param id
     * @returns {Promise<void>}
     */
    async onDownload(id) {
      try {
        this.loading = true;
        const response = await this.$services.media.download(id);

        const filename = response.headers['content-disposition']
          .split(';')
          .find(n => n.includes('filename='))
          .replace('filename=', '')
          .trim()
          .replace(/['"]+/g, '');

        FileSaver.saveAs(response.data, filename);
      } catch (e) {
        console.error(e)
        this.$toast.error(this.$t('agencyDashboard.exportError'));
      } finally {
        this.loading = false;
      }
    }
  },
}
</script>

<style scoped>

</style>
