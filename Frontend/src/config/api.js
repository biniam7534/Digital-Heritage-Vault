const rawUrl = import.meta.env.VITE_API_URL || 'https://digital-heritage-vault.onrender.com';
const API_PREFIX = '/api/v1';
export const API_BASE_URL = rawUrl.endsWith(API_PREFIX) || rawUrl.includes(API_PREFIX)
	? rawUrl
	: `${rawUrl.replace(/\/+$/,'')}${API_PREFIX}`;

