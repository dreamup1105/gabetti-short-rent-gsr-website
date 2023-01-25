export default $axios => ({

  /**
   * @desc Retrieve accommodation
   * @param permalink
   * @param locale
   * @returns {Promise<any>}
   */
  getAccommodation(permalink, locale) {
    return $axios.$get(`accommodations/${permalink}`, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Get accommodations permalink catalog
   * @param permalink
   * @param locale
   * @param query
   * @returns {Promise<any>}
   */
  getAccommodationsPermalinkCatalog(permalink, locale, query = '') {
    return $axios.$get(`accommodations/catalog/permalink/${permalink}${query ? '?' + query : ''}`, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Get accommodations flexible catalog
   * @param locale
   * @param query
   * @returns {Promise<any>}
   */
  getAccommodationsFlexibleCatalog(locale, query) {
    return $axios.$get(`accommodations/catalog/flexible?${query}`, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Get accommodations filterable attributes
   * @param locale
   * @returns {Promise<any>}
   */
  getAccommodationsFilterableAttributes(locale) {
    return $axios.$get(`accommodations/attributes/filterable-attributes`, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Get accommodation calendar blocked days
   * @param permalink
   * @param locale
   * @returns {Promise<any>}
   */
  getAccommodationBlockedDays(permalink, locale) {
    return $axios.$get(`accommodations/${permalink}/blocked-days`, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Get accommodation prices
   * @param permalink
   * @param locale
   * @returns {Promise<any>}
   */
  getAccommodationPrices(permalink, locale) {
    return $axios.$get(`accommodations/${permalink}/prices`, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Get accommodation price
   * @param permalink
   * @param payload
   * @param locale
   * @returns {Promise<any>}
   */
  getAccommodationPrice(permalink, payload, locale) {
    return $axios.$post(`accommodations/${permalink}/price`, payload,{
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Get availability for certain dates
   * @param startDate
   * @param endDate
   * @param permalink
   * @param locale
   * @returns {Promise<any>}
   */
  getAvailability(startDate, endDate, permalink, locale) {
    return $axios.$post(`accommodations/${permalink}/check-availability`, {
      'start_date': startDate,
      'end_date': endDate
    }, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Get checkout charge
   * @param payload
   * @param locale
   * @returns {Promise<any>}
   */
  getCheckoutCharge(payload, locale) {
    return $axios.$post(`payments/checkout-charge`, payload, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Get payment session
   * @param payload
   * @param locale
   * @returns {Promise<any>}
   */
  getPaymentSession(payload, locale) {
    return $axios.$post(`payments/session`, payload, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Verify coupon
   * @param id
   * @param payload
   * @param locale
   * @returns {Promise<any>}
   */
  verifyCoupon(id, payload, locale) {
    return $axios.$post(`coupons/${id}/verify`, payload, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Get accommodation extra services
   * @param permalink
   * @param query
   * @param locale
   * @returns {Promise<any>}
   */
  getExtraServices(permalink,query, locale) {
    return $axios.$get(`accommodations/${permalink}/extra-services?${query}`, {
      headers: {
        'Accept-Language': locale
      },
    });
  },
});
