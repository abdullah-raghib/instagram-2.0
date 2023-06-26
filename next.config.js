/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  ssr: false,
  serverOptions: {
    // Here, you can specify the IP address to use
    // for example, use localhost:3000
    host: '127.0.0.1',
  },
  port:4000,
  images:{
    domains:["links.papareact.com", "lh3.googleusercontent.com"],
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/v0/b/instagram-50430.appspot.com/o?name=posts%2FDrz8aK5K9MS1FgFP7WzP%2Fimage',
      },
    ]
  },
}
