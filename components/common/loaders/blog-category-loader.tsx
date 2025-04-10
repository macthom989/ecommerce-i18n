import { Skeleton } from '@components/ui/skeleton';

export function BlogCategorySkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-6">
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6`}>
        {Array(count)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="flex flex-col space-y-3">
              <Skeleton className="h-56 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          ))}
      </div>
    </div>
  );
}
