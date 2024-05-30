import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const CORS: CorsOptions = {
	origin: true,
	methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
	//allowedHeaders: 'Content-Type, Authorization',
	credentials: true,
};
