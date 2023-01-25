
export default $axios => ({

  /**
   * @desc Extract locale and permalink from route
   * @param routePath
   * @returns {{locale: string, permalink: string}}
   */
	extractLocaleAndPermalinkFromRoute(routePath) {
		if (!routePath) {
			throw new Error('Route Path must exists');
		}
		let path = routePath.trim();
    path = path.replace('q/', '');
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

    // Check last element of string
    if(permalink.slice(-1) === '/'){
      permalink = permalink.substring(0,permalink.length - 1)
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
