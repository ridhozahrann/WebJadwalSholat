interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`animate-pulse rounded-lg bg-[var(--color-border)] ${className}`} />
  )
}

export function PrayerScheduleSkeleton() {
  return (
    <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
      <div className="px-4 py-2.5 bg-[var(--color-surface-alt)] border-b border-[var(--color-border)]">
        <Skeleton className="h-4 w-40" />
      </div>
      <div className="divide-y divide-[var(--color-border)]">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-14" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function NextPrayerSkeleton() {
  return (
    <div className="text-center py-6 px-4 rounded-2xl bg-[var(--color-primary)]/10">
      <Skeleton className="h-3 w-32 mx-auto" />
      <Skeleton className="h-7 w-24 mx-auto mt-3" />
      <Skeleton className="h-5 w-16 mx-auto mt-2" />
      <Skeleton className="h-10 w-48 mx-auto mt-4" />
    </div>
  )
}

export function QiblaPreviewSkeleton() {
  return (
    <div className="rounded-xl border border-[var(--color-border)] p-4 text-center">
      <Skeleton className="h-4 w-24 mx-auto" />
      <Skeleton className="h-8 w-16 mx-auto mt-2" />
      <Skeleton className="h-4 w-20 mx-auto mt-2" />
      <Skeleton className="h-8 w-36 mx-auto mt-3" />
    </div>
  )
}
