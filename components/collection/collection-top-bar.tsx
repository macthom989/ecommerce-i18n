'use client';

import { MdCollectionsBookmark } from 'react-icons/md';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getDirection } from '@utils/get-direction';
import CollectionFilterSidebar from './collection-filter-sidebar';
import motionProps from '@components/common/drawer/motion';
import { useUI } from '@/contexts/managed-ui-provider';
import { useTranslations } from 'next-intl';
import Text from '../common/text';
import Drawer from 'rc-drawer';

const CollectionTopBar = () => {
  const { openFilter, displayFilter, closeFilter } = useUI();
  const t = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const collectionTitle = slug?.split('-').join(' ');
  const dir = getDirection(pathname);
  const contentWrapperCSS = dir === 'ltr' ? { left: 0 } : { right: 0 };

  return (
    <div className="flex justify-between items-center mb-7">
      <Text variant="pageHeading" className="hidden lg:inline-flex pb-1 capitalize">
        {collectionTitle}
      </Text>

      <button
        className="lg:hidden text-heading text-sm px-4 py-2 font-semibold border border-gray-300 rounded-md flex items-center transition duration-200 ease-in-out focus:outline-none hover:bg-gray-200"
        onClick={openFilter}
      >
        <MdCollectionsBookmark className="text-lg" />
        <span className="ltr:pl-2 rtl:pr-2">{t('text-filters')}</span>
      </button>

      <div className="flex items-center justify-end">
        <div className="flex-shrink-0 text-body text-xs md:text-sm leading-4">9,608 {t('text-items')}</div>
      </div>

      <Drawer
        placement={dir === 'rtl' ? 'right' : 'left'}
        open={displayFilter}
        onClose={closeFilter}
        styles={{ wrapper: contentWrapperCSS }}
        {...motionProps}
      >
        <CollectionFilterSidebar />
      </Drawer>
    </div>
  );
};

export default CollectionTopBar;
