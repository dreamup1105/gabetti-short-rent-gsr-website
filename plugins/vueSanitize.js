import Vue from 'vue';
import VueSanitize from 'vue-sanitize';
const defaultOptions = {
  allowedTags: ['strong'],
};

Vue.use(VueSanitize);
