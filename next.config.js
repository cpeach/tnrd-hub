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
        source : '/testing',
        destination : '/content/testing'
      },
    
      {
        source : '/hub-console/:path*',
        destination : '/apps/hub-console/:path*'
      },
      {
        source : '/expiring-patrons/:path*',
        destination : '/apps/expiring-patrons/:path*'
      },
      {
        source : '/hashad/:path*',
        destination : '/apps/hashad/:path*'
      },
      {
        source : '/incident-reports/:path*',
        destination : '/apps/incident-reports/:path*'
      },
      {
        source : '/stats-counter/:path*',
        destination : '/apps/stats-counter/:path*'
      }
    ]
  },

}
