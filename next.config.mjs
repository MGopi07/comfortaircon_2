/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev.api.comfortair.co.in',
      },
      {
        protocol: 'https',
        hostname: 'staging.api.comfortair.co.in',
      },
      {
        protocol: 'https',
        hostname: 'staging-api.comfortair.co.in',
      },
      {
        protocol: 'https',
        hostname: 'api.comfortair.co.in',
      },
      {
        protocol: 'https',
        hostname: 'comfortair.co.in',
      },
      {
        protocol: 'https',
        hostname: '**.comfortair.co.in',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/contact-us',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
