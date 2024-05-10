/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
      remotePatterns:[
          {
              protocol: 'https',
              hostname: 'cdn.weatherbit.io'
          }
      ]
  }
};

export default nextConfig;
