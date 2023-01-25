export default $axios => ({

  /**
   * @desc Retrieve page data from permalink
   * @param locale
   * @param permalink
   * @returns {Promise<any>}
   */
  getPage(permalink, locale) {
    return $axios.$get(`cms/${permalink}`, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Retrieve page data from permalink
   * @param type
   * @param locale
   * @returns {Promise<any>}
   */
  getArticlesByType(type,locale) {
    return $axios.$get(`cms/articles/${type}`, {
      headers: {
        'Accept-Language': locale
      },
    });
  },
});
