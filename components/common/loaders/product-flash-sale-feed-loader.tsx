'use client';

import { cn } from '@lib/utils';
import ContentLoader from 'react-content-loader';

export const ProductFlashSaleFeedLoader = () => {
  return (
    <div className={cn(`grid grid-cols-1 xl:grid-cols-3 gap-y-6 lg:gap-y-6 xl:gap-y-0 xl:gap-x-7 mb-4`)}>
      <div className={cn('col-span-2')}>
        <ContentLoader
          speed={2}
          width="100%"
          height="100%"
          viewBox="0 0 1190 450"
          backgroundColor="#f9f9f9"
          foregroundColor="#ecebeb"
          className={cn('rounded-md')}
        >
          <rect x="0" y="0" width="100%" height="100%" rx="10" ry="10" />
        </ContentLoader>
      </div>
      <div className="col-span-full xl:col-span-1 lg:mb-1 xl:mb-0 ">
        <ContentLoader
          speed={2}
          width={515}
          height={318}
          viewBox="0 0 515 318"
          backgroundColor="#f9f9f9"
          foregroundColor="#ecebeb"
          className="w-full h-auto"
        >
          <rect x="0" y="0" rx="6" ry="6" width="208" height="208" />
          <rect x="236" y="98" rx="4" ry="4" width="260" height="6" />
          <rect x="236" y="135" rx="4" ry="4" width="90" height="10" />
          <rect x="0" y="302" rx="13" ry="13" width="515" height="16" />
          <rect x="236" y="66" rx="4" ry="4" width="170" height="8" />
          <rect x="0" y="267" rx="4" ry="4" width="35" height="8" />
          <rect x="45" y="267" rx="4" ry="4" width="80" height="8" />
          <rect x="388" y="267" rx="4" ry="4" width="35" height="8" />
          <rect x="433" y="267" rx="4" ry="4" width="80" height="8" />
        </ContentLoader>
      </div>
    </div>
  );
};
