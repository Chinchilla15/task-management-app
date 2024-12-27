import MasterSidebar from "@components/ui/MasterSidebar";
import Header from "@components/ui/Header";

export default function DashBoardLayout() {
  return (
    <div className="min-h-screen bg-neutral-5">
      <div className="grid h-screen grid-cols-[auto_1fr] gap-8 p-8">
        <MasterSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
        </div>
      </div>
    </div>
  );
}
