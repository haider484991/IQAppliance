/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  output: 'standalone',
  swcMinify: true,

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    unoptimized: false, // Enable Next.js image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },

  // Webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Optimize chunks
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 70000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const match = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                );
                return match && match[1] 
                  ? `npm.${match[1].replace('@', '')}`
                  : 'npm.vendor';
              },
              priority: 20,
              reuseExistingChunk: true,
            },
            common: {
              minChunks: 2,
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    return config;
  },

  // Handle rewrites
  async rewrites() {
    return {
      beforeFiles: [],
    };
  },

  // Redirects configuration
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/',
        permanent: true,
      }
    ];
  },

  // Headers configuration
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index,follow,max-image-preview:large'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' data: https: *; font-src 'self' data: https:; connect-src 'self' https:;"
          }
        ]
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml'
          },
          {
            key: 'X-Robots-Tag',
            value: 'index,follow'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600'
          }
        ]
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  },
};

module.exports = nextConfig;