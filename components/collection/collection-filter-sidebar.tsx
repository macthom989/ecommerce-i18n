'use client';

import Scrollbar from '@components/common/scrollbar';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { getDirection } from '@utils/get-direction';
import { usePathname, useRouter } from 'next/navigation';
import { CollectionFilters } from './collection-filters';
import { useUI } from '@/contexts/managed-ui-provider';
import { useTranslations } from 'next-intl';

const CollectionFilterSidebar = () => {
  const { closeFilter } = useUI();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('common');
  const dir = getDirection(pathname);

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="w-full border-b border-gray-100 flex justify-between items-center relative ltr:pr-5 rtl:pl-5 py-0.5">
        <button
          className="flex items-center justify-center px-4 py-6 text-2xl text-gray-500 transition-opacity hover:opacity-60"
          onClick={() => router.back()}
          aria-label="close"
        >
          {dir === 'rtl' ? <IoArrowForward className="text-black" /> : <IoArrowBack className="text-black" />}
        </button>
        <h2 className="w-full text-xl font-bold text-center md:text-2xl text-heading">{t('text-collections')}</h2>
      </div>

      <Scrollbar className="flex-grow mb-auto menu-scrollbar">
        <div className="flex flex-col px-5 py-7 md:px-7 text-heading">
          <CollectionFilters />
        </div>
      </Scrollbar>

      <div className="flex items-center justify-center text-sm leading-4 text-white md:text-base px-7 h-14 bg-heading">
        9,608 {t('text-items')}
      </div>
    </div>
  );
};

export default CollectionFilterSidebar;
