/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ✅ this makes Next.js generate static HTML (good for Netlify)
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

export default nextConfig;
