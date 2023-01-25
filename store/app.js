export const state = () => ({
  cookieAccepted: state.cookieAccepted ? state.cookieAccepted : false,
  meta: null,
  redirectAfterSocialAuth: null,
});

export const mutations = {
  SET_COOKIE_ACCEPTED(state) {
    state.cookieAccepted = true;
  },
  SET_REDIRECT_AFTER_SOCIAL_AUTH(state, value) {
    localStorage.setItem('redirectAfterSocialAuth',value)
    state.redirectAfterSocialAuth = value;
  },
  SET_META(state, value) {
    state.meta = value;
  },
};

export const getters = {
  cookieAccepted: (state) => {
    return state.cookieAccepted;
  },
  redirectAfterSocialAuth: (state) => {
    return state.redirectAfterSocialAuth;
  },
  meta: (state) => {
    return state.meta;
  },
};
