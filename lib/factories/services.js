import accommodationsService from '~/lib/services/accommodationsService';
import routeService from '~/lib/services/routeService';
import homepageService from '~/lib/services/homepageService';
import authService from '~/lib/services/authService';
import reservationsService from '~/lib/services/reservationsService';
import paymentsService from '~/lib/services/paymentsService';
import userService from '~/lib/services/userService';
import countriesService from '~/lib/services/countriesService';
import cmsService from '~/lib/services/cmsService';
import mediaService from '~/lib/services/mediaService';
import wishlistService from '~/lib/services/wishlistService';
import contactRequestService from '~/lib/services/contactRequestsService';
import hostContactRequestService from '~/lib/services/hostContactRequestsService';

export default $axios => ({
  route: routeService($axios),
  accommodations: accommodationsService($axios),
  homepage: homepageService($axios),
  auth: authService($axios),
  reservations: reservationsService($axios),
  payments: paymentsService($axios),
  users: userService($axios),
  countries: countriesService($axios),
  cms: cmsService($axios),
  media: mediaService($axios),
  wishlists: wishlistService($axios),
  contactRequest: contactRequestService($axios),
  hostContactRequest: hostContactRequestService($axios),
});
