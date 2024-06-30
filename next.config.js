const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: "export",
  //trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '3.128.94.171',
        port: '4500',
        pathname: '/**',
      },
    ],
    domains: ['3.128.94.171'],
  },
};

module.exports = withNextIntl(nextConfig);
