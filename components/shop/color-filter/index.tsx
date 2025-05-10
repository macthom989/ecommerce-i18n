'use client';

import { colorMetaMap } from '@/contants/attributes';
import { CheckBox } from '@components/ui/checkbox';
import { useTranslations } from 'next-intl';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import React from 'react';

const colorFilterItems = Array.from({ length: Object.keys(colorMetaMap).length }).map((_, index) => ({
  id: index,
  name: Object.keys(colorMetaMap)[index].toLocaleUpperCase(),
  slug: Object.keys(colorMetaMap)[index].toLowerCase(),
  hexColor: Object.values(colorMetaMap)[index],
}));

export const ColorFilter = () => {
  const t = useTranslations('common');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const selectedColors = React.useMemo(() => searchParams.get('color')?.split(',') || [], [searchParams]);
  const [formState, setFormState] = React.useState<string[]>(selectedColors);

  React.useEffect(() => {
    setFormState(selectedColors);
  }, [selectedColors]);

  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    const updatedFormState = formState.includes(value) ? formState.filter((i) => i !== value) : [...formState, value];

    const params = new URLSearchParams(searchParams);
    if (updatedFormState.length) {
      params.set('color', updatedFormState.join(','));
    } else {
      params.delete('color');
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="block border-b border-gray-300 pb-7">
      <h3 className="text-heading text-sm md:text-base font-semibold mb-7">{t('text-colors')}</h3>
      <div className="mt-2 flex flex-col space-y-4 h-[200px] overflow-y-auto">
        {colorFilterItems.map((item) => (
          <CheckBox
            key={item.id}
            label={
              <span className="flex items-center">
                <span
                  className="w-5 h-5 rounded-full block ltr:mr-3 rtl:ml-3 mt-0.5 border border-black border-opacity-20"
                  style={{ backgroundColor: item.hexColor }}
                />
                {item.name}
              </span>
            }
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
