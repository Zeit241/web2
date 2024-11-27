/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    output: 'standalone',
    missingSuspenseWithCSRBailout: false,
};

export default nextConfig;
