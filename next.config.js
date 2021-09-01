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
      }
    ]
  },

}
