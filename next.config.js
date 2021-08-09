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
        destination: 'http://localhost:3001/',
      },
      {
        source: '/api-console/:path*',
        destination: 'http://localhost:3001/:path*',
      }
    ]
  },

}
