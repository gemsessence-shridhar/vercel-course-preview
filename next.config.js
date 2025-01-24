const withNextIntl = require("next-intl/plugin");

const nextConfig = {
  /* config options here */
};

const config = withNextIntl()(nextConfig);

module.exports = config;
