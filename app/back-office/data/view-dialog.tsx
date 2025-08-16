import { SelectStatisticData } from '@/db/schema';

const detailItems = [
  { key: 'paudTk', label: 'PAUD/TK' },
  { key: 'sdGrade1To3', label: 'SD Kelas 1-3' },
  { key: 'sdGrade4To6', label: 'SD Kelas 4-6' },
  { key: 'juniorHigh', label: 'SMP' },
  { key: 'seniorHigh', label: 'SMA' },
  { key: 'toddlers', label: 'Balita' },
  { key: 'pregnantMothers', label: 'Ibu Hamil' },
  { key: 'breastfeedingMothers', label: 'Ibu Menyusui' },
  { key: 'total', label: 'Total' },
] as const;

function DetailView({ statistic }: { statistic: SelectStatisticData }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {detailItems.map((item) => (
          <div key={item.key}>
            <p className="text-sm font-medium text-gray-500">{item.label}</p>
            <p className="text-lg font-semibold">{statistic[item.key] ?? 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export { DetailView };
