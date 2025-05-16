
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingSkeletonProps {
  count?: number;
  compact?: boolean;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count = 3, compact = false }) => {
  const height = compact ? 'h-16' : 'h-24';
  const width = compact ? 'w-12' : 'w-16';

  return (
    <div className="space-y-4">
      {Array(count).fill(0).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className={`${height} ${width} rounded`} />
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
