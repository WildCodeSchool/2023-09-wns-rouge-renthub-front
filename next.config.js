/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['localhost'],
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: 'http', hostname: '*' },
      { protocol: 'https', hostname: '*' },
    ],
  },
  modularizeImports: {
    '@mui/icons-material': { transform: '@mui/icons-material/{{member}}' },
  },
};

module.exports = nextConfig;
