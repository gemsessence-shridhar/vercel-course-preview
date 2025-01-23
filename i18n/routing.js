const { createNavigation } = require('next-intl/navigation');
const { defineRouting } = require('next-intl/routing');

const routing = defineRouting({
  locales: ['en-us', 'de'],
  defaultLocale: 'en-us',
  pathnames: {
    '/': '/',
    '/pathnames': {
      'en-us': '/pathnames',
      'de': '/pfadnamen',
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
