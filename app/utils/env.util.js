export const isDev = () => process.env.NODE_ENV === 'development';
export const isProd = () => process.env.NODE_ENV === 'production';
export const isDebugProd = () => process.env.DEBUG_PROD === 'true';
