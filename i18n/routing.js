const { createNavigation } = require('next-intl/navigation');
const { defineRouting } = require('next-intl/routing');

const routing = defineRouting({
  locales: [
    'en-us', // English - United States
    'de-de', // German
    'fr-fr', // French - France
    'es-419', // Spanish - Latin America
    'pt-br', // Portuguese - Brazil
    'zh-cn', // Chinese - China
    'ja-jp', // Japanese - Japan
    'it-it', // Italian - Italy
    'tr-tr', // Turkish - Turkey
  ],
  defaultLocale: 'en-us',
  pathnames: {
    '/': '/',
    '/pathnames': {
      'en-us': '/pathnames',
      'de-de': '/pfadnamen',
      'fr-fr': '/noms-de-chemin',
      'es-419': '/nombres-de-ruta',
      'pt-br': '/nomes-de-caminho',
      'zh-cn': '/路径名称',
      'ja-jp': '/パス名',
      'it-it': '/nomi-dei-percorsi',
      'tr-tr': '/yol-adlari',
    },
  },
});

const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);

module.exports = {
  routing,
  Link,
  getPathname,
  redirect,
  usePathname,
  useRouter,
};
