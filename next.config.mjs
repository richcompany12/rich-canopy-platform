/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  exportPathMap: async function() {
    return {
      '/': { page: '/' },
    };
  },
};

export default nextConfig;