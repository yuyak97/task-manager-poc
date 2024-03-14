import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../../.env') });

const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_PORT = process.env.DATABASE_PORT;
const DATABASE_DB = process.env.DATABASE_DB;
if (
  !DATABASE_HOST ||
  !DATABASE_USER ||
  !DATABASE_PASSWORD ||
  !DATABASE_PORT ||
  !DATABASE_DB
) {
  console.log({ DATABASE_HOST });

  throw new Error('Environment Database Error');
}

const source = new DataSource({
  type: 'postgres',
  host: DATABASE_HOST,
  port: Number(DATABASE_PORT),
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_DB,
  entities: ['src/database/**/*.entity.ts'],
  migrations: ['src/database/migrations/**/*.ts'],
  synchronize: false,
});
export default source;
