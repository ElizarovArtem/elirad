/** @type {import('next').NextConfig} */
const path = require('path');
const config = require('./config');

const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['localhost'],
		deviceSizes: [320, 360, 375, 640, 768, 828, 1080, 1200, 1920, 2048, 3840],
	},
	experimental: {
		appDir: true,
	},
	publicRuntimeConfig: config,
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
};

module.exports = nextConfig;
