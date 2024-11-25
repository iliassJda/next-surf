import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'gray-tough-goldfish-319.mypinata.cloud',
                port: '',
                pathname: '/files/**', // This will match any path that starts with /files/
            },
            {
                protocol: 'https',
                hostname: "lh3.googleusercontent.com",
                port: '',
                pathname: '/**', // This will match any path that starts with /files/
            },
            // You can add more patterns as needed:
            // {
            //   protocol: 'https',
            //   hostname: '*.example.com', // Supports wildcards
            //   port: '',
            //   pathname: '/images/**',
            // },
        ],
    },
};

export default nextConfig;
