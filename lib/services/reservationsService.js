export default $axios => ({

  /**
   * @desc Retrieve accommodation
   * @param locale
   * @param query
   * @returns {Promise<any>}
   */
  getReservations(locale, query = null) {
    return $axios.$get(query ? `reservations?${query}` : `reservations`, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Retrieve accommodation
   * @param id
   * @param locale
   * @returns {Promise<any>}
   */
  getReservation(id, locale) {
    return $axios.$get(`reservations/${id}`, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Store reservations
   * @param payload
   * @param locale
   * @returns {Promise<any>}
   */
  storeReservation(payload, locale) {
    return $axios.$post(`reservations`, payload, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Update reservations
   * @param id
   * @param payload
   * @param locale
   * @returns {Promise<any>}
   */
  updateReservation(id,payload, locale) {
    return $axios.$patch(`reservations/${id}`, payload, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Crypt reservations data
   * @param payload
   * @param locale
   * @returns {Promise<any>}
   */
  crypt(payload, locale) {
    return $axios.$post(`reservations/actions/crypt`, payload, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Crypt reservations data
   * @param string
   * @param locale
   * @returns {Promise<any>}
   */
  decrypt(string, locale) {
    return $axios.$get(`reservations/actions/decrypt/${string}`, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc download order
   * @param id
   * @param locale
   * @returns {Promise<any>}
   */
  downloadOrder(id, locale) {
    return $axios.get(`reservations/${id}/order/download`, {
      responseType: 'blob',
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /********************************************************************************************
   * GUESTS
   */

  /**
   * @desc Retrieve accommodation
   * @param locale
   * @param id
   * @param query
   * @returns {Promise<any>}
   */
  getReservationGuests(id,locale, query = null) {
    return $axios.$get(query ? `reservations/${id}/guests?${query}` : `reservations/${id}/guests`, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Store reservation guest
   * @param id
   * @param payload
   * @param locale
   * @returns {Promise<any>}
   */
  storeReservationGuest(id,payload, locale) {
    return $axios.$post(`reservations/${id}/guests`, payload, {
      headers: {
        'Accept-Language': locale,
        'Content-Type': 'multipart/form-data'
      },
    });
  },

  /**
   * @desc Update reservation guest
   * @param id
   * @param guestId
   * @param payload
   * @param locale
   * @returns {Promise<any>}
   */
  updateReservationGuest(id,guestId,payload, locale) {
    return $axios.$post(`reservations/${id}/guests/${guestId}`, payload, {
      headers: {
        'Accept-Language': locale,
        'Content-Type': 'multipart/form-data'
      },
    });
  },
  /**
   * @desc Delete reservation guest
   * @param id
   * @param guestId
   * @param locale
   * @returns {Promise<any>}
   */
  deleteReservationGuest(id,guestId, locale) {
    return $axios.$delete(`reservations/${id}/guests/${guestId}`, {
      headers: {
        'Accept-Language': locale
      },
    });
  },
});
