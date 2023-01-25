export default $axios => ({

  /**
   * @desc download media
   * @param id
   * @param locale
   * @returns {Promise<any>}
   */
  download(id, locale) {
    return $axios.get(`media/${id}/download`, {
      responseType: 'blob',
      headers: {
        'Accept-Language': locale
      },
    });
  },

});
