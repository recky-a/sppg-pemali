import { getAll } from '@/app/actions/statistic-data.action';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { ActionDialog } from './action-dialog';
import { DataTable } from './data-table';
export default async function StatisticDataPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.session) {
    return redirect('/login');
  }
  const { success, data } = await getAll();
  return (
    <div>
      <DataTable data={data} />
      <ActionDialog />
    </div>
  );
}
