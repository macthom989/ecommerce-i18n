'use client';

import ContentLoader from 'react-content-loader';
import cn from 'classnames';

interface BannerLoaderProps {
  variant?: 'rounded' | 'default';
  className?: string;
  classNameInner?: string;
  disableBorderRadius?: boolean;
}

const BannerLoader: React.FC<BannerLoaderProps> = ({
  variant = 'rounded',
  className,
  classNameInner,
  disableBorderRadius = false,
}) => {
  return (
    <div className={cn('mx-auto', className)}>
      <div className={cn('h-full flex justify-center relative overflow-hidden', classNameInner)}>
        <ContentLoader
          speed={2}
          width="100%"
          height="100%"
          viewBox="0 0 400 250"
          backgroundColor="#e0e0e0"
          foregroundColor="#d6d6d6"
          className={cn({
            'rounded-md': variant === 'rounded' && !disableBorderRadius,
          })}
        >
          {/* Background Rect (Simulating Banner Image) */}
          <rect x="0" y="0" width="100%" height="100%" rx="10" ry="10" />
        </ContentLoader>
      </div>
    </div>
  );
};

export default BannerLoader;
