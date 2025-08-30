export const DB_TYPE: any = process.env.DB_TYPE;
export const DB_HOST: string = process.env.DB_HOST || 'localhost';
export const DB_PORT: number = parseInt(process.env.DB_PORT ?? '3306', 10);
export const DB_USERNAME: string = process.env.DB_USERNAME || 'root';
export const DB_PASSWORD: string = process.env.DB_PASSWORD || '';
export const DB_NAME: string = process.env.DB_NAME || 'test';
