module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://fastapi-production-26d4.up.railway.app/:path*' // Proxy to Backend
      }
    ]
  }
}