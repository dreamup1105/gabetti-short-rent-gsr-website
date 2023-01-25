
export default $axios => ({

  /**
   * @desc Fetch homepage data
   * @param locale
   * @returns {Promise<any>}
   */
  getHomepage(locale) {
    return $axios.$get(`homepage`, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Search location
   * @param text
   * @param locale
   * @returns {Promise<any>}
   */
  getSearchResult(text, locale) {
    return $axios.$get(`search?text=${ text }`, {
      headers: {
        'Accept-Language': locale
      },
    });
  },

  /**
   * @desc Extract locale and permalink from route
   * @param routePath
   * @returns {{locale: string, permalink: string}}
   */
	extractLocaleAndPermalinkFromRoute(routePath) {
		if (!routePath) {
			throw new Error('Route Path must exists');
		}
		const path = routePath.trim();
		let locale = path.substring(0, 4);
		let isDefault = false;

		if (!['/it/', '/en/'].includes(locale)) {
			locale = 'en';
			isDefault = true;
		}
		else {
			locale = locale.substring(1, 3);
		}

		let permalink = path.substring(1);
		if (!isDefault) {
			permalink = path.substring(4);
		}

		if (permalink === '') {
			permalink = '/';
		}

		return {
			locale,
			permalink,
		};
	},
});
