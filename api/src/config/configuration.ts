export interface ConfigData {
  env: string;
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
}

export default (): Record<keyof ConfigData, unknown> => ({
  env: process.env.ENV,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_DB,
});
