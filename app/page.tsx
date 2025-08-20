import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SelectStatisticData } from '@/db/schema';
import karakterSVG from '@/public/karakter.svg';
import logo from '@/public/logo-bgn.png';
import WavePattern from '@/public/wave_pattern.svg';
import {
  faPersonBreastfeeding,
  faPersonPregnant,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Baby, Building2 } from 'lucide-react';
import Image from 'next/image';
import { FullPageCarousel } from './_components/full-page-carousel';
import { getAll } from './actions/statistic-data.action';

const STAT_KEY_LABELS: Record<string, string> = {
  paudTk: 'PAUD / TK',
  sdGrade1To3: 'SD Kelas 1–3',
  sdGrade4To6: 'SD Kelas 4–6',
  juniorHigh: 'SMP',
  seniorHigh: 'SMA',
  toddlers: 'Balita',
  pregnantMothers: 'Ibu Hamil',
  breastfeedingMothers: 'Ibu Menyusui',
  total: 'Total',
};

export default async function Home() {
  const { success, data } = await getAll();

  const items = [
    <FullLogoPage key="FullLogoPage" />,
    <FullHeadingPage key="FullHeadingPage" />,
    <StatisticDataView key="DataView" data={data} />,
  ];
  return <FullPageCarousel items={items} />;
}

interface StatisticDataViewProps {
  data?: SelectStatisticData[];
}

// slide 1
function FullLogoPage() {
  return (
    <div className="bg-slide-radial relative flex h-[100dvh] w-screen items-center justify-center overflow-hidden">
      <Image src={logo} alt="logo" className="mx-auto size-80 h-fit" />
    </div>
  );
}

// slide 2
function FullHeadingPage() {
  return (
    <div className="bg-slide-radial relative flex h-[100dvh] w-screen items-center-safe justify-center-safe overflow-hidden">
      <h1 className="text-center text-5xl font-bold text-white">
        Yayasan Same - Same Berkah
      </h1>
      <Image
        src={karakterSVG}
        alt="karakter svg"
        className="absolute right-0 bottom-0 z-50 h-1/2"
      />
    </div>
  );
}

// slide 3
function StatisticDataView({ data }: StatisticDataViewProps) {
  if (!data) {
    return null;
  }
  const { id, createdAt, updatedAt, ...stats } = data[0];

  return (
    <div className="bg-slide-radial relative h-[100dvh] w-screen overflow-hidden">
      
       
     
      <Image src={WavePattern} alt="wave pattern svg" className="-mt-5" />
      <Image
        src={logo}
        alt="logo"
        className="absolute top-5 right-10 size-28"
      />
      <div className="container mx-auto -mt-10 grid size-full auto-rows-min grid-cols-3 gap-7">
        {Object.entries(stats).map(([k, v], i) => (
          <Card
            key={k}
            className="relative col-span-1 flex h-36 flex-row items-center"
          >
            <CardHeader className="w-full">
              <CardTitle className="text-2xl capitalize">
                {STAT_KEY_LABELS[k] ?? k}
              </CardTitle>
            </CardHeader>
            <CardContent className="w-fit !p-0">
              <span className="mr-14 rounded p-10 text-6xl font-bold">
                {v ?? 0}
              </span>
            </CardContent>

            {k !== 'toddlers' &&
              k !== 'pregnantMothers' &&
              k !== 'breastfeedingMothers' &&
              k !== 'total' && (
                <Building2 className="text-primary/10 absolute right-2 bottom-2 size-24" />
              )}
            {k === 'toddlers' && (
              <Baby className="text-primary/10 absolute right-2 bottom-2 size-24" />
            )}
            {k === 'breastfeedingMothers' && (
              <FontAwesomeIcon
                icon={faPersonBreastfeeding}
                className="text-primary/10 absolute right-2 bottom-2 size-24"
              />
            )}
            {k === 'pregnantMothers' && (
              <FontAwesomeIcon
                icon={faPersonPregnant}
                className="text-primary/10 absolute right-2 bottom-2 size-24"
              />
            )}
          </Card>
        ))}
      </div>
      <Image
        src={karakterSVG}
        alt="karakter svg"
        className="absolute right-0 bottom-0 -z-10"
      />
    </div>
  );
}
