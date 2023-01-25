export default $axios => ({
  /**
   * @desc Register user
   * @returns {Promise<any>}
   * @param payload
   * @param locale
   */
  register(payload, locale = 'en') {
    return $axios.$post(`register`, payload, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Find user by a given email
   * @returns {Promise<any>}
   * @param email
   * @param locale
   */
  findUserByEmail(email, locale = 'en') {
    return $axios.$post(`users/find-by-email`, {email}, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Send password forgot email
   * @returns {Promise<any>}
   * @param email
   * @param locale
   */
  passwordForgot(email, locale = 'en') {
    return $axios.$post(`password-forgot`, {email}, {
      headers: {
        'Accept-Language': locale
      },
    });
  },
  /**
   * @desc Update password
   * @returns {Promise<any>}
   * @param payload
   * @param locale
   */
  passwordReset(payload, locale = 'en') {
    return $axios.$post(`password-reset`, payload, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Social login
   * @returns {Promise<any>}
   * @param payload
   * @param provider
   * @param locale
   */
  socialLogin(payload,provider, locale = 'en') {
    return $axios.$post(`social-login/${provider}`, payload, {
      headers: {
        'Accept-Language': locale
      },
    });
  },
});
