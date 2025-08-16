import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../db/schema';

/**
 * A global object for caching the database connection pool in development.
 * This prevents the creation of a new pool on every HMR update.
 */
const globalForDb = globalThis as unknown as {
  pool: Pool | undefined;
};

// Use the cached pool in development, or create a new one.
const pool =
  globalForDb.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL!,
  });

// Cache the pool in development to prevent new connections on HMR.
if (process.env.NODE_ENV !== 'production') {
  globalForDb.pool = pool;
}

export const dbClient = drizzle(pool, { schema });
