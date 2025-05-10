import { Skeleton } from '@components/ui/skeleton';

export function BlogCategoryCardSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="flex flex-col items-center space-y-2 transition-all duration-200 hover:scale-105"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Skeleton className="w-32 h-32 md:w-48 md:h-48 " />
    </div>
  );
}
