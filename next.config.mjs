/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    output: 'standalone',
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;
