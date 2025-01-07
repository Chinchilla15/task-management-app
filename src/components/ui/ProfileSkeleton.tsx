export default function ProfileSkeleton() {
  return (
    <div className="flex h-full items-center justify-center">
      <section className="w-full max-w-xl rounded-lg border border-neutral-3 bg-neutral-4 p-8 shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative h-24 w-24 animate-pulse overflow-hidden rounded-full bg-neutral-3" />
          <div className="h-8 w-52 animate-pulse rounded bg-neutral-3" />
        </div>
        <div className="mt-6 flex justify-center">
          <div className="h-10 w-48 animate-pulse rounded-md bg-neutral-3" />
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="h-4 w-24 animate-pulse rounded bg-neutral-3" />
              <div className="mt-1 h-5 w-32 animate-pulse rounded bg-neutral-3" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
