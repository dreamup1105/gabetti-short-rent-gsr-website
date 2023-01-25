export default $axios => ({

  /**
   * @desc Get countries
   * @param locale
   * @returns {Promise<any>}
   */
  getCountries(locale) {
    return $axios.$get(`countries`, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

});
