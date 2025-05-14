/** @type {import('next').NextConfig}1 */
const nextConfig = {
  output: 'export', // 👈 This enables static export for Netlify

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
