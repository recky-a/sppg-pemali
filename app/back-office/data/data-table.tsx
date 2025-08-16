'use client';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  Table as TanstackTable,
  useReactTable,
} from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { DataTablePagination } from '@/components/data-table-pagination';
import { DataTableViewOptions } from '@/components/data-table-view-options';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SelectStatisticData } from '@/db/schema';
import { Edit2, Eye, Plus, Trash } from 'lucide-react';
import { useMemo, useTransition } from 'react';
import { Actions, useActionDialogStore } from './action-dialog';
import { FormCreate, FormEdit } from './forms';

// Simple date formatter
function formatDate(date: Date | string | null) {
  if (!date) return '-';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function DataTable({ data }: any) {
  const colHelper = createColumnHelper<SelectStatisticData>();
  const columns = useMemo(
    () => [
      colHelper.display({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Pilih semua"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Pilih baris"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      }),
      colHelper.accessor('paudTk', {
        id: 'PAUD TK',
        cell: (info) => info.getValue() ?? 0,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="PAUD / TK" />
        ),
      }),
      colHelper.accessor('sdGrade1To3', {
        id: 'SD Kelas 1 - 3',
        cell: (info) => info.getValue() ?? 0,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="SD Kelas 1–3" />
        ),
      }),
      colHelper.accessor('sdGrade4To6', {
        id: 'SD Kelas 4 - 6',
        cell: (info) => info.getValue() ?? 0,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="SD Kelas 4–6" />
        ),
      }),
      colHelper.accessor('juniorHigh', {
        id: 'SMP',
        cell: (info) => info.getValue() ?? 0,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="SMP" />
        ),
      }),
      colHelper.accessor('seniorHigh', {
        id: 'SMA',
        cell: (info) => info.getValue() ?? 0,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="SMA" />
        ),
      }),
      colHelper.accessor('toddlers', {
        id: 'Balita',
        cell: (info) => info.getValue() ?? 0,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Balita" />
        ),
      }),
      colHelper.accessor('pregnantMothers', {
        id: 'Ibu Hamil',
        cell: (info) => info.getValue() ?? 0,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Ibu Hamil" />
        ),
      }),
      colHelper.accessor('breastfeedingMothers', {
        id: 'Ibu Menyusui',
        cell: (info) => info.getValue() ?? 0,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Ibu Menyusui" />
        ),
      }),
      colHelper.accessor('total', {
        cell: (info) => (
          <span className="font-semibold text-blue-600">
            {info.getValue() ?? 0}
          </span>
        ),
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Total" />
        ),
      }),
      colHelper.accessor('updatedAt', {
        id: 'Diubah',
        cell: (info) => formatDate(info.getValue()),
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Terakhir Diperbarui" />
        ),
      }),
      colHelper.accessor('createdAt', {
        id: 'Dibuat',
        cell: (info) => formatDate(info.getValue()),
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Dibuat" />
        ),
      }),
    ],
    [colHelper]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // Enable row selection
    enableRowSelection: true,
  });

  return (
    <>
      <div className="max-w-7xl space-y-4.5 overflow-x-auto py-1.5">
        <DataTableToolbar table={table} />
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-sm whitespace-nowrap"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-center text-sm font-medium"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  Tidak ada data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DataTablePagination table={table} />
      </div>
    </>
  );
}

interface DataTableToolbarProps<TData> {
  table: TanstackTable<TData>;
}

function DataTableToolbar<T>({ table }: DataTableToolbarProps<T>) {
  const setOpenAction = useActionDialogStore((s) => s.setOpen);
  const setContent = useActionDialogStore((s) => s.setContent);
  const [isDeletePending, startDeleteTransition] = useTransition();

  // Get the number of selected rows for cleaner conditional logic
  const selectedRowCount = table.getSelectedRowModel().rows.length;

  const handleDelete = () => {
    startDeleteTransition(async () => {
      // This logic now supports bulk deletion.
      // You would pass an array of IDs to your server action.
      // const idsToDelete = table.getSelectedRowModel().rows.map(row => (row.original as SelectStatisticData).id);
      // const { success, message } = await deleteStatistics(idsToDelete);
      //
      // if (success) {
      //   toast.success(message);
      //   setTimeout(() => setOpenAction(false), 411);
      // } else {
      //   toast.error(message);
      // }
    });
  };

  const handleAction = (actionType: Actions) => {
    const selectedRow = table.getSelectedRowModel().rows[0]?.original;

    switch (actionType) {
      case 'create':
        setOpenAction('create');
        setContent(<FormCreate />);
        break;
      case 'edit':
        if (selectedRow) {
          setOpenAction('edit');
          setContent(
            <FormEdit
              initialData={selectedRow as unknown as SelectStatisticData}
            />
          );
        }
        break;
      case 'view':
        if (selectedRow) {
          setOpenAction('view');
          // setContent(<DetailView statistic={selectedRow as SelectStatisticData} />);
        }
        break;
      case 'delete':
        setOpenAction('delete');
        setContent(
          <div>
            <p>
              Apakah Anda yakin ingin menghapus{' '}
              <strong>{selectedRowCount} data</strong> yang dipilih? Tindakan
              ini tidak dapat dibatalkan.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpenAction(false)}>
                Batal
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeletePending}
              >
                {isDeletePending ? 'Menghapus...' : 'Hapus'}
              </Button>
            </div>
          </div>
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-1 items-center gap-2">
        <Button
          size="sm"
          variant="success"
          onClick={() => handleAction('create')}
          className="gap-1"
        >
          <Plus className="h-4 w-4" />
          Tambah
        </Button>
        <Button
          size="sm"
          variant="warning"
          // Disabled if not EXACTLY one row is selected
          disabled={selectedRowCount !== 1}
          onClick={() => handleAction('edit')}
          className="gap-1"
        >
          <Edit2 className="h-4 w-4" />
          Edit
        </Button>
        <Button
          size="sm"
          // Disabled if not EXACTLY one row is selected
          disabled={selectedRowCount !== 1}
          onClick={() => handleAction('view')}
          className="gap-1"
        >
          <Eye className="h-4 w-4" />
          Detail
        </Button>
        <Button
          size="sm"
          variant="destructive"
          // Disabled if NO rows are selected
          disabled={selectedRowCount === 0}
          onClick={() => handleAction('delete')}
          className="gap-1"
        >
          <Trash className="h-4 w-4" />
          Hapus
        </Button>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}

export { DataTable };
