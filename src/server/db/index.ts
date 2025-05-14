import {drizzle} from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
	throw new Error('DATABASE_URL is not defined')
  }
export const connection = postgres(connectionString, {
	max: 10, // Maximum number of connections
	prepare: false, // Use simple query protocol instead of extended query
	idle_timeout: 20 // Close idle connections after 20 seconds
});

export const db = drizzle(connection, {schema});