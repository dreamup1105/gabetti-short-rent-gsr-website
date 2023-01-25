export default $axios => ({

  /**
   * @desc Retrieve user
   * @param id
   * @param locale
   * @returns {Promise<any>}
   */
  getUser(id, locale) {
    return $axios.$get(`users/${id}`, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Update user
   * @param payload
   * @param locale
   * @returns {Promise<any>}
   */
  updateUser(payload, locale) {
    return $axios.$patch(`users/update`, payload, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Change password
   * @param payload
   * @param locale
   * @returns {Promise<any>}
   */
  changePassword(payload, locale) {
    return $axios.$post(`users/change-password`, payload, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Destroy user
   * @param locale
   * @returns {Promise<any>}
   */
  destroyUser(locale) {
    return $axios.$delete(`users/destroy`, {
      headers: {
        'Accept-Language': locale
      },
    });
  },
});
