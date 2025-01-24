const { getRequestConfig } = require('next-intl/server');
const { routing } = require('./routing');

module.exports = getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = requestLocale;

  // Ensure that the incoming `locale` is valid
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (
      await (locale === 'en-us'
        ? // When using Turbopack, this will enable HMR for `en-us`
          import('../app/locales/en-us.json')
        : import(`../app/locales/${locale}.json`))
    ).default,
  };
});
