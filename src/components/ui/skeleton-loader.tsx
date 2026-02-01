import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => (
  <div className={cn("skeleton-shimmer rounded-md", className)} />
);

export const ImageSkeleton = ({ className }: SkeletonProps) => (
  <div className={cn("skeleton-shimmer rounded-xl aspect-video", className)} />
);

export const TextSkeleton = ({ className }: SkeletonProps) => (
  <div className={cn("skeleton-shimmer h-4 rounded", className)} />
);

export const CardSkeleton = ({ className }: SkeletonProps) => (
  <div className={cn("skeleton-shimmer rounded-2xl p-6 space-y-4", className)}>
    <div className="skeleton-shimmer h-12 w-12 rounded-xl" />
    <div className="skeleton-shimmer h-6 w-3/4 rounded" />
    <div className="space-y-2">
      <div className="skeleton-shimmer h-4 w-full rounded" />
      <div className="skeleton-shimmer h-4 w-5/6 rounded" />
    </div>
  </div>
);
