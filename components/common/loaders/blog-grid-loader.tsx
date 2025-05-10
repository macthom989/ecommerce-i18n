import { Skeleton } from '@/components/ui/skeleton';

function SkeletonBadge() {
  return <Skeleton className="w-16 h-6 rounded-md" />;
}

function SkeletonContent() {
  return (
    <div className="space-y-3 mt-4">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

function SkeletonImage() {
  return <Skeleton className="relative h-72 sm:h-64 md:h-72 lg:h-80 rounded-lg overflow-hidden" />;
}

function SkeletonFooter() {
  return (
    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
      <div className="flex items-center gap-2">
        <Skeleton className="w-8 h-8 rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="w-4 h-4 rounded" />
        <Skeleton className="w-4 h-4 rounded" />
        <Skeleton className="w-4 h-4 rounded" />
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col h-full space-y-2">
      <SkeletonImage />
      <div className=" flex-grow flex flex-col">
        <SkeletonBadge />
        <SkeletonContent />
        <div className="mt-auto">
          <SkeletonFooter />
        </div>
      </div>
    </div>
  );
}

function SkeletonFilterBlock() {
  return (
    <div className="flex justify-between items-center mb-8">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-10 w-32" />
    </div>
  );
}

interface LoadingProps {
  count?: number;
}

export default function BlogPageLoading({ count = 8 }: LoadingProps) {
  const skeletonCards = Array(count).fill(null);

  return (
    <div>
      <div className="py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-0">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {skeletonCards.map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((page) => (
              <Skeleton key={page} className="w-2.5 h-2.5 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
