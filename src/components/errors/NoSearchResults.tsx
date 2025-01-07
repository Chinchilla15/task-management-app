export default function NoSearchResults({ query }: { query: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
      <p className="text-body-xl text-neutral-1">
        No tasks found for "{query}"
      </p>
      <p className="text-body-m text-neutral-2">
        Try adjusting your search term
      </p>
    </div>
  );
}
