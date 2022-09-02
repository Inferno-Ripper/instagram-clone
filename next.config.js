/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['cloudflare-ipfs.com', 'cdn.pixabay.com'],
	},
};

module.exports = nextConfig;
