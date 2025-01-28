export default function ServerErrorMessage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
      <p className="text-body-xl text-neutral-1">
        An error occurred while fetching tasks
      </p>
      <p className="text-body-m text-neutral-2">Please try again later</p>
    </div>
  );
}
