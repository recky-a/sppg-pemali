import { InsertStatisticData, statisticData } from '@/db/schema';
import { dbClient } from '@/lib/db';
import { eq } from 'drizzle-orm';
import 'server-only';

export async function all() {
  try {
    return await dbClient.query.statisticData.findMany();
  } catch (error) {
    throw error;
  }
}

export async function create(values: InsertStatisticData) {
  try {
    return await dbClient.insert(statisticData).values(values);
  } catch (error) {
    throw error;
  }
}

export async function update(data: InsertStatisticData) {
  try {
    await dbClient
      .update(statisticData)
      .set(data)
      .where(eq(statisticData.id, data.id!));
  } catch (error) {
    throw error;
  }
}
