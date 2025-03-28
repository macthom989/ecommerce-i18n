'use client';

import Scrollbar from '@components/common/scrollbar';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { useLocale } from 'next-intl';
import { useUI } from '@/contexts/managed-ui-provider';
import { useTranslations } from 'next-intl';
import { ShopFilters } from '../filters';

const FilterSidebar = () => {
  const { closeFilter } = useUI();
  const t = useTranslations('common');
  const locale = useLocale();
  const dir = locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr';

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="w-full border-b border-gray-100 flex justify-between items-center relative pr-5 md:pr-7 flex-shrink-0 py-0.5">
        <button
          className="flex text-2xl items-center justify-center text-gray-500 px-4 md:px-5 py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60"
          onClick={closeFilter}
          aria-label="close"
        >
          {dir === 'rtl' ? <IoArrowForward className="text-black" /> : <IoArrowBack className="text-black" />}
        </button>
        <h2 className="font-bold text-xl md:text-2xl m-0 text-heading w-full text-center pr-6">{t('text-filters')}</h2>
      </div>

      <Scrollbar className="menu-scrollbar flex-grow mb-auto">
        <div className="flex flex-col py-7 px-5 md:px-7 text-heading">
          <ShopFilters />
        </div>
      </Scrollbar>

      <div className="text-sm md:text-base leading-4 flex items-center justify-center px-7 flex-shrink-0 h-14 bg-heading text-white">
        9,890 {t('text-items')}
      </div>
    </div>
  );
};

export default FilterSidebar;
