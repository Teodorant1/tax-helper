/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Enable more verbose build output
  output: "standalone",
};

// Log environment information during build
if (process.env.VERCEL) {
  console.log("Building on Vercel...");
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("VERCEL_ENV:", process.env.VERCEL_ENV);
  console.log("VERCEL_URL:", process.env.VERCEL_URL);
}

module.exports = config;
