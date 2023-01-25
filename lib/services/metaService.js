function _title(entity) {
  if (entity && entity.seo_title && entity.seo_title !== '') {
    return entity.seo_title + ' - Gabetti Short Rent: Luxury & Corporate Short Rent';
  }
}

function _description(entity) {
  if (entity && entity.seo_description && entity.seo_description !== '') {
    return entity.seo_description;
  }
}

function _applicationName(entity) {
  if (entity && entity.seo_application_name && entity.seo_application_name !== '') {
    return entity.seo_application_name  + ' - Gabetti Short Rent: Luxury & Corporate Short Rent';
  }
}

function _siteUrl(entity, locale) {
  const appUrl = process.env.APP_URL;
  if (entity && entity.seo_permalink && entity.seo_permalink !== '') {
    return `${appUrl}${locale}/${entity.seo_permalink}`;
  } else {
    return appUrl;
  }
}

function _image(entity) {
  const imageUrl = process.env.APP_URL + '/logo-bg-red.png';
  if (entity && entity.seo_image && entity.seo_image !== '') {
    return entity.seo_image;
  } else {
    return imageUrl;
  }
}

function _common(entity) {
  const common = [];
  if (_title(entity)) {
    common.push({
      hid: 'title',
      name: 'title',
      content: _title(entity),
    });
  }
  if (_description(entity)) {
    common.push({
      hid: 'description',
      name: 'description',
      content: _description(entity),
    });
  }
  if (entity && entity.seo_keywords && entity.seo_keywords !== '') {
    common.push({
      hid: 'keywords',
      name: 'keywords',
      content: entity.seo_keywords,
    });
  }
  if (_applicationName(entity)) {
    common.push({
      hid: 'application-name',
      name: 'application-name',
      content: _applicationName(entity),
    });
  }
  return common;
}

function _facebook(entity, locale) {
  const facebook = [];
  if (_title(entity)) {
    facebook.push({
      hid: 'og:title',
      property: 'og:title',
      content: _title(entity),
    });
    facebook.push({
      hid: 'og:site_name',
      property: 'og:site_name',
      content: _title(entity),
    });
  }
  if (_description(entity)) {
    facebook.push({
      hid: 'og:description',
      property: 'og:description',
      content: _description(entity),
    });
  }
  if (_siteUrl(entity, locale)) {
    facebook.push({
      hid: 'og:url',
      property: 'og:url',
      content: _siteUrl(entity, locale),
    });
  }
  if (_image(entity)) {
    facebook.push({
      hid: 'og:image',
      property: 'og:image',
      content: _image(entity),
    });
  }
  facebook.push(
    {
      hid: 'og:type',
      property: 'og:type',
      content: 'website',
    },
    {
      hid: 'og:image:width',
      property: 'og:image:width',
      content: '300',
    },
    {
      hid: 'og:image:height',
      property: 'og:image:height',
      content: '200',
    },
  );
  return facebook;
}

function _twitter(entity) {
  const twitter = [];
  if (_title(entity)) {
    twitter.push({
      hid: 'twitter:title',
      name: 'twitter:title',
      content: _applicationName(entity),
    });
  }
  if (_description(entity)) {
    twitter.push({
      hid: 'twitter:description',
      name: 'twitter:description',
      content: _description(entity),
    });
  }
  if (_image(entity)) {
    twitter.push({
      hid: 'twitter:image',
      name: 'twitter:image',
      content: _image(entity),
    });
  }
  twitter.push(
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary',
    },
    {
      hid: 'twitter:site',
      property: 'twitter:site',
      content: '@gabettishortrent',
    },
    {
      hid: 'twitter:creator',
      property: 'twitter:creator',
      content: '@gabettishortrent',
    },
  );
  return twitter;
}

function _google(entity) {
  const google = [];
  if (_title(entity)) {
    google.push({
      hid: 'g:name',
      name: 'g:name',
      content: _title(entity),
    });
  }
  if (_description(entity)) {
    google.push({
      hid: 'g:description',
      name: 'g:description',
      content: _description(entity),
    });
  }
  if (_image(entity)) {
    google.push({
      hid: 'g:image',
      name: 'g:image',
      content: _image(entity),
    });
  }
  return google;
}

export default {
  // nuxtI18nSeo needs to replace with nuxtI18nHead({ addSeoAttributes: true })
  head(entity, nuxtI18nSeo, locale, links = []) {
    const title = _title(entity);
    return {
      title,
      meta: [
        ..._common(entity),
        ..._facebook(entity, locale),
        ..._twitter(entity),
        ..._google(entity),
        ...nuxtI18nSeo.meta,
      ],
      htmlAttrs: {
        ...nuxtI18nSeo.htmlAttrs,
      },
      bodyAttrs: {
        class: 'font-sans leading-normal tracking-normal',
      },
      link: [
        {
          hid: 'apple-touch-icon',
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        ...nuxtI18nSeo.link,
        ...links
      ],
      script: [],
    };
  },
};
