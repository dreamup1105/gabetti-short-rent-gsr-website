export default $axios => ({

  /**
   * @desc Store contact request
   * @param payload
   * @param locale
   * @returns {Promise<any>}
   */
  store(payload, locale) {
    return $axios.$post(`contact-requests`, payload,{
      headers: {
        'Accept-Language': locale
      },
    });
  },
});
