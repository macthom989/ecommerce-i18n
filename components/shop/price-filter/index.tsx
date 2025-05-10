'use client';

import { CheckBox } from '@components/ui/checkbox';
import { useTranslations } from 'next-intl';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import React from 'react';

const priceFilterItems = [
  { id: '1', name: 'Under $50', slug: '0-50' },
  { id: '2', name: '$50 to $100', slug: '50-100' },
  { id: '3', name: '$100 to $150', slug: '100-150' },
  { id: '4', name: '$150 to $200', slug: '150-200' },
  { id: '5', name: '$200 to $300', slug: '200-300' },
  { id: '6', name: '$300 to $500', slug: '300-500' },
  { id: '7', name: '$500 to $1000', slug: '500-1000' },
  { id: '8', name: 'Over $1000', slug: '1000-' },
];

export const PriceFilter = () => {
  const t = useTranslations('common');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const selectedPrices = React.useMemo(() => searchParams.get('price')?.split(',') || [], [searchParams]);
  const [formState, setFormState] = React.useState<string[]>(selectedPrices);

  React.useEffect(() => {
    setFormState(selectedPrices);
  }, [selectedPrices]);

  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    const updatedFormState = formState.includes(value) ? formState.filter((i) => i !== value) : [...formState, value];

    const params = new URLSearchParams(searchParams);
    if (updatedFormState.length) {
      params.set('price', updatedFormState.join(','));
    } else {
      params.delete('price');
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="block border-b border-gray-300 pb-7 mb-7">
      <h3 className="text-heading text-sm md:text-base font-semibold mb-7">{t('text-price')}</h3>
      <div className="mt-2 flex flex-col space-y-4">
        {priceFilterItems.map((item) => (
          <CheckBox
            key={item.id}
            label={item.name}
            name={item.name.toLowerCase()}
            checked={formState.includes(item.slug)}
            value={item.slug}
            onChange={handleItemClick}
          />
        ))}
      </div>
    </div>
  );
};
