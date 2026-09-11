/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export' retiré pour permettre les routes API /api/chat avec @netlify/plugin-nextjs
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
