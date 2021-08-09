module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['tnrd-assets.s3.ca-central-1.amazonaws.com'],
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `/:path*`,
      },
      {
        source: '/api-console',
        destination: `localhost:3001/api-console`,
      },
      {
        source: '/api-console/:path*',
        destination: `localhost:3001/api-console:path*`,
      },
    ]
  },

}
