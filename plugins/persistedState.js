import createPersistedState from 'vuex-persistedstate';
import SecureLS from 'secure-ls';

const ls = new SecureLS({ isCompression: false });

export default async ({
  store, isHMR,
// eslint-disable-next-line require-await
}) => {
	// Just in case nuxt.config.js gets a change in ssr:false when adding this plugin.
	// Notice isClient and  process.browser is deprecated, instead use process.client.
	if (process.client) {
		// In case of HMR, mutation occurs before nuxtReady, so previously saved state
		// gets replaced with original state received from server. So, we've to skip HMR.
		// Also nuxtReady event fires for HMR as well, which results multiple registration of
		// vuex-persistedstate plugin
		if (isHMR) {
			return;
		}
		createPersistedState({
			storage: {
				getItem: key => ls.get(key),
				setItem: (key, value) => ls.set(key, value),
				removeItem: key => ls.remove(key),
			},
			// An array of any paths to partially persist the state.
			// Paths are using dots to indicate nestedness.
			paths: ['auth.accessToken', 'app.cookieAccepted'],
		})(store); // vuex plugins can be connected to store, even after creation
	}
};
