import Bell from "@icons/Bell.svg?react";
import { Button } from "@/components/common/Button";
import Input from "@/components/common/Input";
import { Avatar, AvatarFallback, AvatarImage } from "../common/Avatar";
import { useState, ChangeEvent, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import {
  SelectContent,
  SelectRoot,
  SelectTrigger,
  SelectItem,
} from "../select";
import { Link } from "react-router";

export default function Header({
  onSearch,
  searchQuery,
}: {
  onSearch: (query: string) => void;
  searchQuery: string;
}) {
  const [searchValue, setSearchValue] = useState(searchQuery);

  const debouncedSearch = useDebounce((value: string) => {
    onSearch(value);
  }, 300);

  useEffect(() => {
    setSearchValue(searchQuery);
  }, [searchQuery]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    debouncedSearch(value);
  };

  return (
    <header className="p- flex items-center justify-between rounded-2xl bg-neutral-4 px-6 py-3">
      <div className="flex flex-1 items-center">
        <div className="relative w-full">
          <Input
            value={searchValue}
            id="search"
            placeholder="Search"
            className="flex-[0.9]"
            onChange={(e: ChangeEvent<HTMLInputElement> | string) => {
              const value = typeof e === "string" ? e : e.target.value;
              handleSearch(value);
            }}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="transparent-white" size="sm">
          <Bell className="h-5 w-5" />
        </Button>

        <SelectRoot value={""} onValueChange={() => {}}>
          <SelectTrigger
            icon={
              <Avatar size="40">
                <AvatarImage alt="User" />
                <AvatarFallback className="bg-red-500 font-bold text-white">
                  AC
                </AvatarFallback>
              </Avatar>
            }
          ></SelectTrigger>
          <SelectContent className="flex -translate-x-3/4 transform p-2">
            <Link to="/profile">
              <SelectItem value="profile" className="text-neutral-1">
                Profile
              </SelectItem>
            </Link>
          </SelectContent>
        </SelectRoot>
      </div>
    </header>
  );
}
