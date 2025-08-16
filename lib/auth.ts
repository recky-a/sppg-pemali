import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin } from 'better-auth/plugins';
import { dbClient } from './db';

export const auth = betterAuth({
  database: drizzleAdapter(dbClient, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: false,
  },
  user: {
    modelName: 'users',
  },
  session: {
    modelName: 'user_sessions',
  },
  account: {
    modelName: 'accounts',
  },
  verification: {
    modelName: 'verifications',
  },
  plugins: [admin()],
});
