/** @type {import('next').NextConfig} */

const nextConfig = {
	env: {
		ROZETKA_USERNAME: process.env.ROZETKA_USERNAME,
		ROZETKA_PASSWORD: process.env.ROZETKA_PASSWORD,
	},
	async rewrites() {
		return [
			{
				source: '/api/update-status',
				destination: 'http://localhost:3000/api/update-status',
			},
			{
				source: '/api/:path*',
				destination: 'https://api-seller.rozetka.com.ua/:path*',
			},
		];
	},
};

export default nextConfig;
