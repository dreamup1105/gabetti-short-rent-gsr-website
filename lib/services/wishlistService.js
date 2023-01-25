export default $axios => ({

  /**
   * @desc Retrieve wishlists
   * @param locale
   * @param query
   * @returns {Promise<any>}
   */
  getWishlists(locale, query = '') {
    return $axios.$get(`wishlists${query ? '?' + query : ''}`, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Retrieve wishlists
   * @param id
   * @param locale
   * @param query
   * @returns {Promise<any>}
   */
  getWishlist(id, locale, query = '') {
    return $axios.$get(`wishlists/${id}${query ? '?' + query : ''}`, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Update wishlists
   * @param id
   * @param payload
   * @param locale
   * @returns {Promise<any>}
   */
  updateWishlist(id, payload, locale) {
    return $axios.$patch(`wishlists/${id}`, payload, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Store wishlists
   * @param payload
   * @param locale
   * @returns {Promise<any>}
   */
  storeWishlist(payload, locale) {
    return $axios.$post(`wishlists`, payload, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Store wishlists
   * @param id
   * @param locale
   * @returns {Promise<any>}
   */
  deleteWishlist(id, locale) {
    return $axios.$delete(`wishlists/${id}`, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Get wishlists accommodations
   * @param id
   * @param locale
   * @param query
   * @returns {Promise<any>}
   */
  getWishlistAccommodations(id, locale, query = '') {
    return $axios.$get(`wishlists/${id}/accommodations${query ? '?' + query : ''}`, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Get wishlists accommodations
   * @param id accommodation id
   * @param locale
   * @returns {Promise<any>}
   */
  getWishlistByAccommodation(id, locale) {
    return $axios.$get(`wishlists/accommodation/${id}`, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Attach accommodation to wishlist
   * @param id
   * @param accommodation_id
   * @param locale
   * @returns {Promise<any>}
   */
  attachAccommodation(id, accommodation_id, locale) {
    return $axios.$post(`wishlists/${id}/attach`, {'accommodation_id': accommodation_id}, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Detach accommodation to wishlist
   * @param id
   * @param accommodation_id
   * @param locale
   * @returns {Promise<any>}
   */
  detachAccommodation(id, accommodation_id, locale) {
    return $axios.$post(`wishlists/${id}/detach`, {'accommodation_id': accommodation_id}, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

});
