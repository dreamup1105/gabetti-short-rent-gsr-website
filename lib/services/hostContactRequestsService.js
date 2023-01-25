export default $axios => ({

  /**
   * @desc Store host contact request
   * @param payload
   * @param locale
   * @returns {Promise<any>}
   */
  store(payload, locale) {
    return $axios.$post(`host-requests`, payload,{
      headers: {
        'Accept-Language': locale
      },
    });
  },
});
