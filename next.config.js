module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
         destination: 'http://127.0.0.1:8000/:path*'
        // destination: 'https://fastapi-production-26d4.up.railway.app/:path*' // Proxy to Backend
      }
    ]
  }
}