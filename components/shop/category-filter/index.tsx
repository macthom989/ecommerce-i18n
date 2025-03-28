'use client';

import { CheckBox } from '@components/ui/checkbox';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { useTranslations } from 'next-intl';
import { useCategoriesQuery } from '@/services/category/get-all-categories';

export const CategoryFilter = () => {
  const t = useTranslations('common');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { data, isLoading } = useCategoriesQuery({ limit: 10 });

  const selectedCategories = React.useMemo(() => searchParams.get('category')?.split(',') || [], [searchParams]);
  const [formState, setFormState] = React.useState<string[]>(selectedCategories);

  React.useEffect(() => {
    setFormState(selectedCategories);
  }, [selectedCategories]);

  if (isLoading) return <p>Loading...</p>;

  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    const updatedFormState = formState.includes(value) ? formState.filter((i) => i !== value) : [...formState, value];
    const params = new URLSearchParams(searchParams);
    if (updatedFormState.length) {
      params.set('category', updatedFormState.join(','));
    } else {
      params.delete('category');
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="block border-b border-gray-300 pb-7 mb-7">
      <h3 className="text-heading text-sm md:text-base font-semibold mb-7">{t('text-category')}</h3>
      <div className="mt-2 flex flex-col space-y-4">
        {data?.map((item: any) => (
          <CheckBox
            key={item.id}
            label={`${item.name} (${item.count})`}
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
