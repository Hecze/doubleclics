const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: "export",
  //trailingSlash: true,
  images: {
    domains: ['3.128.94.171'],
  },
};

module.exports = withNextIntl(nextConfig);
