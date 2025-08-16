// scripts/seed.ts
import { users } from '@/db/schema';
import { auth } from '@/lib/auth';
import { dbClient } from '@/lib/db';
import 'dotenv/config';
import { eq } from 'drizzle-orm';

async function seed() {
  console.log('🌱 Seeding database...');

  // Check Admin
  const existingAdmin = await dbClient.query.users.findFirst({
    where: eq(users.email, 'admin@example.com'),
  });

  if (!existingAdmin) {
    await auth.api.signUpEmail({
      body: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'Admin123!', // strong password
        image: 'https://example.com/admin.png',
        callbackURL: 'http://localhost:3000', // can be dummy in seeding
      },
    });

    // Update role → admin
    await dbClient
      .update(users)
      .set({ role: 'admin' })
      .where(eq(users.email, 'admin@example.com'));

    console.log('✅ Admin user created');
  } else {
    console.log('ℹ️ Admin user already exists, skipping...');
  }

  // Check Regular User
  const existingUser = await dbClient.query.users.findFirst({
    where: eq(users.email, 'user@example.com'),
  });

  if (!existingUser) {
    await auth.api.signUpEmail({
      body: {
        name: 'Regular User',
        email: 'user@example.com',
        password: 'User123!',
        image: 'https://example.com/user.png',
        callbackURL: 'http://localhost:3000',
      },
    });

    // Update role → user
    await dbClient
      .update(users)
      .set({ role: 'user' })
      .where(eq(users.email, 'user@example.com'));

    console.log('✅ Regular user created');
  } else {
    console.log('ℹ️ Regular user already exists, skipping...');
  }

  console.log('🌱 Done seeding.');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
