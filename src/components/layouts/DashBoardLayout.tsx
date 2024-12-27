export default function DashBoardLayout() {
  return (
    <div className="m-0 flex h-screen flex-col items-center justify-center gap-4 bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-10">
      <h1 className="text-center text-xl text-gray-800 sm:text-2xl md:text-3xl lg:text-4xl">
        We're working to bring you the best task management experience
      </h1>
      <h2 className="text-center">
        Brought to you by{" "}
        <a
          href="https://ravn.co"
          target="_blank"
          className="text-neutral-600 hover:text-neutral-800"
        >
          Ravn
        </a>
      </h2>
    </div>
  );
}
