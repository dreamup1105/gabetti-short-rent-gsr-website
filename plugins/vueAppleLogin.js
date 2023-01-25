import Vue from "vue";
import VueAppleLogin from 'vue-apple-login';
export default () => {
  Vue.use(VueAppleLogin, {
    clientId: process.env.appleClientId,
    scope: 'name email',
    redirectURI: process.env.appURL + '/social-login/apple',
    state: new Date().toString(),
    usePopup: true,
  });
}
