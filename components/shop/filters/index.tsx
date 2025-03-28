'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import isEmpty from 'lodash/isEmpty';
import { useTranslations } from 'next-intl';
import { FilteredItem } from '../filtered-item';
import { CategoryFilter } from '../category-filter';
import { BrandFilter } from '../brand-filter';
import { PriceFilter } from '../price-filter';
import { ColorFilter } from '../color-filter';

export const ShopFilters: React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('common');

  const query = Object.fromEntries(searchParams.entries());

  return (
    <div className="pt-1">
      <div className="block border-b border-gray-300 pb-7 mb-7">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="font-semibold text-heading text-xl md:text-2xl">{t('text-filters')}</h2>
          <button
            className="flex-shrink text-xs mt-0.5 transition duration-150 ease-in focus:outline-none hover:text-heading"
            aria-label="Clear All"
            onClick={() => router.push(pathname, { scroll: false })}
          >
            {t('text-clear-all')}
          </button>
        </div>

        <div className="flex flex-wrap -m-1.5 pt-2">
          {!isEmpty(query) &&
            Object.entries(query).flatMap(([key, value]) =>
              value.split(',').map((v, idx) => <FilteredItem key={`${key}-${idx}`} itemKey={key} itemValue={v} />),
            )}
        </div>
      </div>

      <CategoryFilter />
      <BrandFilter />
      <PriceFilter />
      <ColorFilter />
    </div>
  );
};
