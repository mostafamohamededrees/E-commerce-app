/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "m.media-amazon.com",
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com",
    ],
  },
  output: "export",
};

module.exports = nextConfig;
