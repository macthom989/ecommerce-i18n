import { Skeleton } from '@components/ui/skeleton';
import React from 'react';

export function FeaturedPostsSkeleton() {
  return (
    <div className="lg:col-span-7">
      <div className="relative rounded-lg overflow-hidden shadow-md bg-blue-50/30">
        {/* Carousel slide placeholder */}
        <div className="relative w-full aspect-[4/3]">
          <Skeleton className="absolute inset-0" />
        </div>

        {/* Content overlay placeholder */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-blue-900/40 to-transparent">
          <div className="flex justify-between gap-4">
            <div className="w-full">
              {/* Title placeholder */}
              <Skeleton className="h-7 md:h-8 w-3/4 mb-2" />

              {/* Content placeholders */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5 md:block hidden" />
              </div>
            </div>

            {/* Button placeholder */}
            <div>
              <Skeleton className="h-10 w-20 rounded-md" />
            </div>
          </div>
        </div>

        {/* Pagination dots placeholder */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 mt-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-2 w-2 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}