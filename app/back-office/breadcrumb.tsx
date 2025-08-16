'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SlashIcon } from 'lucide-react';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import { Fragment } from 'react';

// Format segment: kebab-case → Capitalized Words
function formatLabel(segment: string): string {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function AdministrationBreadcrumb() {
  const segments = useSelectedLayoutSegments(); // e.g. ["dasbor", "pengguna", "edit"]
  const basePath = '/administrasi';

  const breadcrumbs = [
    {
      label: 'Dasbor',
      href: `${basePath}/dasbor`,
    },
    ...segments
      .filter((seg) => seg.toLowerCase() !== 'dasbor')
      .map((segment, index) => {
        const href =
          basePath +
          '/' +
          segments
            .slice(0, index + 1)
            .filter((s) => s.toLowerCase() !== 'dasbor')
            .join('/');

        return {
          label: formatLabel(segment),
          href,
        };
      }),
  ];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <Fragment key={crumb.href}>
              {index > 0 && (
                <BreadcrumbSeparator>
                  <SlashIcon className="text-muted-foreground size-4" />
                </BreadcrumbSeparator>
              )}

              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="capitalize">
                    {crumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      href={crumb.href}
                      className="text-muted-foreground hover:text-foreground text-sm font-medium capitalize transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
