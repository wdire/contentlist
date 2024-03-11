/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "image.tmdb.org",
      },
      {
        hostname: "tiermaker.com",
      },
      {
        hostname: "img.clerk.com",
      },
      {
        hostname: "s4.anilist.co",
      },
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "images.igdb.com",
      },
    ],
  },

  webpack: (config) => {
    config.infrastructureLogging = {
      level: "error",
    };

    return config;
  },
};

export default nextConfig;
