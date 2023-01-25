export default $axios => ({

  storeCheckoutCharge(payload, locale) {
    return $axios.$post(`payment/checkout-charge`, payload, {
      headers: {
        'Accept-Language': locale
      },
    });
  }
});
