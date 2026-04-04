/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "m.media-amazon.com",
      "lh3.googleusercontent.com",
      "dhelokmblpwhlgxowiab.supabase.co",
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

module.exports = nextConfig;
