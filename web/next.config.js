/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: `${process.env.STRAPI_BASE_URL}/uploads/:path*`
      }
    ]
  }
}

module.exports = nextConfig
