'use client';

import { useBrandsQuery } from '@/services/brand/get-all-brands';
import { CheckBox } from '@components/ui/checkbox';
import { useTranslations } from 'next-intl';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import React from 'react';

export const BrandFilter = () => {
  const t = useTranslations('common');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { data, isLoading, error } = useBrandsQuery({ limit: 10 });

  const selectedBrands = React.useMemo(() => searchParams.get('brand')?.split(',') || [], [searchParams]);
  const [formState, setFormState] = React.useState<string[]>(selectedBrands);

  React.useEffect(() => {
    setFormState(selectedBrands);
  }, [selectedBrands]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    const updatedFormState = formState.includes(value) ? formState.filter((i) => i !== value) : [...formState, value];

    const params = new URLSearchParams(searchParams);
    if (updatedFormState.length) {
      params.set('brand', updatedFormState.join(','));
    } else {
      params.delete('brand');
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const items = data;

  return (
    <div className="block border-b border-gray-300 pb-7 mb-7">
      <h3 className="text-heading text-sm md:text-base font-semibold mb-7">{t('text-brands')}</h3>
      <div className="mt-2 flex flex-col space-y-4">
        {items?.map((item: any) => (
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
