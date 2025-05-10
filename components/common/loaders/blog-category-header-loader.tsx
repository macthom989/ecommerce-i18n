import { cn } from '@lib/utils';
import { Skeleton } from '@components/ui/skeleton';

interface CategoryHeaderSkeletonProps {
  className?: string;
}

export function CategoryHeaderSkeleton({ className }: CategoryHeaderSkeletonProps) {
  return (
    <section
      className={cn(
        'w-full overflow-hidden bg-gradient-to-r from-amber-50/40 to-amber-100/40 dark:from-gray-800/40 dark:to-gray-900/40 mb-16',
        className,
      )}
    >
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-3">
          {/* Content Column Skeleton */}
          <div className="flex flex-col justify-center order-2 md:order-1 px-8 mb-8  md:py-12 gap-3">
            <Skeleton className="h-4 sm:h-10 md:h-12 lg:h-14 w-3/4 " />
            <Skeleton className="h-4 w-full" />
          </div>

          {/* Image Column Skeleton */}
          <div className="relative w-full h-full aspect-[428/273] md:aspect-[39/25] order-1 md:order-2 overflow-hidden shadow-xl">
            <Skeleton className="absolute inset-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
