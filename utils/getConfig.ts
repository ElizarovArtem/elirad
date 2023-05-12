const nextConfig = require('../next.config');

export type TConfig = {
	apiUrl: string;
	apiImageUrl: string;
};

export default function getConfig() {
	return nextConfig.publicRuntimeConfig as TConfig;
}
