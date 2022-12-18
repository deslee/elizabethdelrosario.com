/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites() {
    return [
      {
        source: '/graphql',
        destination: `${process.env.STRAPI_BASE_URL}/graphql`
      },
      {
        source: '/uploads/:path*',
        destination: `${process.env.STRAPI_BASE_URL}/uploads/:path*`
      }
    ]
  }
}

module.exports = nextConfig
