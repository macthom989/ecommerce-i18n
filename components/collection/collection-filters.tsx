'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@utils/routes';
import { useTranslations } from 'next-intl';
import { useCollectionsQuery } from '@/services/collection/get-all-collection';
import clsx from 'clsx';

export const CollectionFilters: React.FC = () => {
  const t = useTranslations('common');
  const pathname = usePathname();
  const { data, isLoading } = useCollectionsQuery({ limit: 15 });

  if (isLoading) {
    return (
      <div className="pt-1">
        <p className="text-center text-gray-500">Loading...</p>
      </div>
    );
  }
  const items = data?.tags ?? [];
  return (
    <div className="pt-1">
      <div className="block border-b border-gray-300 pb-5 mb-7">
        <h2 className="font-semibold text-heading text-xl md:text-2xl">{t('text-collection-list')}</h2>
      </div>

      <ul className="mt-2 flex flex-col space-y-5">
        {items.length > 0 ? (
          items.map((item: any) => (
            <li key={item.id} className="text-sm lg:text-[15px] cursor-pointer">
              <Link
                href={`${ROUTES.COLLECTIONS}/${item.slug}`}
                className={clsx('block transition duration-300 ease-in-out text-heading hover:font-semibold py-0.5', {
                  'font-semibold': pathname === `${ROUTES.COLLECTIONS}/${item.slug}`,
                })}
              >
                {item.name}
              </Link>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">{t('no-collections-found')}</p>
        )}
      </ul>
    </div>
  );
};
