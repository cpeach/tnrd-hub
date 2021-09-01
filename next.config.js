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
        source: '/test',
        destination: 'http://localhost:3004/test',
      },
      {
        source: '/test/:path*',
        destination: 'http://localhost:3004/test/:path*',
      }

    ]
  },

}
