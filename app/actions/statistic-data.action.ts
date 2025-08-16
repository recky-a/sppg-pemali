'use server';

import { all, create, remove, update } from '@/data/statistic-data';
import { InsertStatisticData, SelectStatisticData } from '@/db/schema';
import { auth } from '@/lib/auth';
import { ActionResponse } from '@/types/server-action';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

const checkLogin = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.session) throw new Error('Gagal mengambil data');
};

async function getAll(): Promise<ActionResponse<SelectStatisticData[]>> {
  try {
    const data = await all();
    return { success: true, data: data };
  } catch {
    return { success: false, message: 'Gagal memuat data statistik' };
  }
}

async function newStatisticData(
  values: InsertStatisticData
): Promise<ActionResponse> {
  try {
    await checkLogin();
    await create(values);
    revalidatePath('/back-office/data');
    return { success: true, message: 'Berhasil menambahkan data statistik' };
  } catch {
    return { success: false, message: 'Gagal menambahkan data statistik' };
  }
}

async function updateStatisticData(
  data: InsertStatisticData
): Promise<ActionResponse> {
  try {
    await checkLogin();
    await update(data);
    revalidatePath('/back-office/data');
    return { success: true, message: 'Berhasil edit data statistik' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Gagal edit data statistik' };
  }
}

async function deleteStatisticData(ids: number[]): Promise<ActionResponse> {
  try {
    await checkLogin();
    await remove(ids);
    revalidatePath('/back-office/data');
    return { success: true, message: 'Berhasil menghapus data statistik' };
  } catch {
    return { success: false, message: 'Gagal menghapus data statistik' };
  }
}

export { deleteStatisticData, getAll, newStatisticData, updateStatisticData };
