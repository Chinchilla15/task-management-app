export default function CardPlaceholder() {
  return (
    <article className="flex max-h-[200px] items-center justify-center rounded-lg border border-primary-4 text-body-xl text-neutral-1">
      <div className="p-16 text-center">
        <p className="text-lg font-semibold">No tasks assigned</p>
        <p className="text-body-m">Drag tasks here to change their status</p>
      </div>
    </article>
  );
}
