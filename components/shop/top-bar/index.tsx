'use client';

import FilterIcon from '@components/icons/filter-icon';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { getDirection } from '@utils/get-direction';
import motionProps from '@components/common/drawer/motion';
import { useTranslations } from 'next-intl';
import ListBox from '@/components/ui/list-box';
import { useUI } from '@/contexts/managed-ui-provider';
import Drawer from 'rc-drawer';
import FilterSidebar from '../filter-sidebar';
import Text from '@/components/common/text';

export default function SearchTopBar({ totalItem }: { totalItem: number }) {
  const { openFilter, displayFilter, closeFilter } = useUI();
  const t = useTranslations('common');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const dir = getDirection(searchParams.get('locale') || 'en');
  return (
    <div className="flex justify-between items-center mb-7">
      <Text variant="pageHeading" className="hidden lg:inline-flex pb-1">
        {t('text-casual-wear')}
      </Text>

      <button
        className="lg:hidden text-heading text-sm px-4 py-2 font-semibold border border-gray-300 rounded-md flex items-center transition duration-200 ease-in-out focus:outline-none hover:bg-gray-200"
        onClick={openFilter}
      >
        <FilterIcon />
        <span className="ltr:pl-2.5 rtl:pr-2.5">{t('text-filters')}</span>
      </button>

      <div className="flex items-center justify-end">
        <div className="flex-shrink-0 text-body text-xs md:text-sm leading-4 ltr:pr-4 rtl:pl-4 ltr:md:mr-6 rtl:md:ml-6 ltr:pl-2 rtl:pr-2 hidden lg:block">
          {totalItem} {t('text-items')}
        </div>
        <ListBox
          options={[
            { name: 'text-sorting-options', value: 'options' },
            { name: 'text-newest', value: 'newest' },
            { name: 'text-popularity', value: 'popularity' },
            { name: 'text-price-low-high', value: 'low-high' },
            { name: 'text-price-high-low', value: 'high-low' },
          ]}
        />
      </div>

      <Drawer placement={dir === 'rtl' ? 'right' : 'left'} open={displayFilter} onClose={closeFilter} {...motionProps}>
        <FilterSidebar />
      </Drawer>
    </div>
  );
}
