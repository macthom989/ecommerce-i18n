import { cn } from '@lib/utils';
import { Skeleton } from '@components/ui/skeleton';
import React from 'react';

export function MostViewedPostsSkeleton() {
  return (
    <div className={cn('space-y-4  lg:col-span-5')}>
      <Skeleton className="h-14 w-3/4 pb-0.5 mb-4 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8" />

      <div className="space-y-4">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="flex gap-4 items-center" style={{ animationDelay: `${index * 100}ms` }}>
              <Skeleton className="flex-shrink-0  w-40 h-40   rounded-md" />

              <div className="flex-grow flex gap-4 flex-col">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-40 mt-2" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}