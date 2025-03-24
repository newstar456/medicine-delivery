/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'soracom.io',
            port: '',
            pathname: '/wp-content//**',
            search: '',
          },
          {
            protocol: 'https',
            hostname: 'npr.brightspotcdn.com',
            port: '',
            pathname: '/legacy/**',
            search: '',
          },
                    {
            protocol: 'https',
            hostname: 'm.media-amazon.com',
            port: '',
            pathname: '/images/**',
            search: '',
          },
        ],
    },
};

export default nextConfig;
