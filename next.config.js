module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['tnrd-assets.s3.ca-central-1.amazonaws.com'],
  },
  
 	
  async rewrites() {
    return [

      {
        source : '/',
        destination : '/content/home'
      },
      {
        source : '/signin',
        destination : '/content/signin'
      },
      {
        source : '/applications/:_id',
        destination : '/content/applications/:_id'
      },
      {
        source : '/profile',
        destination : '/content/profile'
      },
      {
        source : '/notifications',
        destination : '/content/notifications'
      },

      {
        source : '/api-console',
        destination : '/apps/api-console'
      },
      {
        source : '/api-console/:path*',
        destination : '/apps/api-console/:path*'
      },
      {
        source : '/hub-console/:path*',
        destination : '/apps/hub-console/:path*'
      },

    ]
  },

}
