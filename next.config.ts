import { NextConfig } from "next";
import withNextIntl from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
};

const config = withNextIntl()(nextConfig);

export default config;
