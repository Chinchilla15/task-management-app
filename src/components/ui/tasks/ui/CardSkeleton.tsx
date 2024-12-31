export default function CardSkeleton() {
  return (
    <div className="flex gap-4">
      {Array(4)
        .fill(null)
        .map((_, columnIndex) => (
          <div key={columnIndex} className="min-w-[300px] flex-1">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-32 animate-pulse rounded-md bg-neutral-3" />
                <div className="h-6 w-8 animate-pulse rounded-md bg-neutral-3" />
              </div>
            </div>
            <div className="space-y-4">
              {Array(2)
                .fill(null)
                .map((_, cardIndex) => (
                  <div
                    key={cardIndex}
                    className="rounded-lg bg-neutral-4 text-neutral-1"
                  >
                    <div className="flex flex-row items-center justify-between space-y-0 p-4">
                      <div className="h-6 w-40 animate-pulse rounded-md bg-neutral-3" />
                      <div className="h-8 w-8 animate-pulse rounded-md bg-neutral-3" />
                    </div>
                    <div className="p-4 pt-0">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="h-5 w-24 animate-pulse rounded-md bg-neutral-3" />
                        <div className="h-5 w-28 animate-pulse rounded-md bg-neutral-3" />
                      </div>
                      <div className="mb-4 flex items-center gap-2">
                        <div className="h-5 w-16 animate-pulse rounded-md bg-neutral-3" />
                        <div className="h-5 w-16 animate-pulse rounded-md bg-neutral-3" />
                        <div className="h-5 w-16 animate-pulse rounded-md bg-neutral-3" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="h-8 w-8 animate-pulse rounded-full bg-neutral-3" />
                        <div className="flex items-center gap-4">
                          <div className="h-5 w-12 animate-pulse rounded-md bg-neutral-3" />
                          <div className="h-5 w-12 animate-pulse rounded-md bg-neutral-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}
