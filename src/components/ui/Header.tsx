import Bell from "@icons/Bell.svg?react";
import { Button } from "@/components/common/Button";
import Input from "@/components/common/Input";
import { Avatar, AvatarFallback, AvatarImage } from "../common/Avatar";

export default function Header() {
  return (
    <header className="p- flex items-center justify-between rounded-2xl bg-neutral-4 px-6 py-3">
      <div className="flex flex-1 items-center">
        <div className="relative w-full">
          <Input value="" onChange={() => {}} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="transparent-white" size="sm">
          <Bell className="h-5 w-5" />
        </Button>
        <Avatar size="40">
          <AvatarImage alt="User" />
          <AvatarFallback className="bg-red-500 font-bold text-white">
            AC
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
