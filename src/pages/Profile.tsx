import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/Avatar";

import { useUserProfile } from "@/hooks/useUserProfile";
import { getTimeOfDayGreeting } from "@/lib/utils";
import ProfileSkeleton from "@/components/ui/ProfileSkeleton";

export default function Profile() {
  const { tasks, currentUser, loading } = useUserProfile();

  const firstName = currentUser?.fullName?.split(" ")[0] || "";
  const greeting = getTimeOfDayGreeting();
  const tasksCount = tasks.length;

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="flex h-full items-center justify-center">
      <section className="rounded-lg border border-neutral-3 bg-neutral-4 p-6 shadow-sm">
        <div className="relative">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative h-24 w-24 overflow-hidden rounded-full">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={currentUser?.avatar || undefined}
                  alt={firstName}
                />
                <AvatarFallback className="bg-red-500 text-3xl font-bold text-white">
                  AC
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-1 text-center">
              <h1 className="text-2xl font-bold text-primary-4">
                {greeting}, {firstName}
              </h1>
            </div>
            <div className="rounded-md bg-neutral-3 p-2">
              <p className="text-body-xl text-neutral-1">
                Tasks assigned:
                <span className="text-primary-4"> {tasksCount}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <label className="text-body-m text-neutral-2">Full Name</label>
            <p className="mt-1 text-body-l text-neutral-1">
              {currentUser?.fullName || "Loading..."}
            </p>
          </div>

          <div>
            <label className="text-body-m text-neutral-2">Email</label>
            <p className="mt-1 text-body-l text-neutral-1">
              {currentUser?.email}
            </p>
          </div>

          <div>
            <label className="text-body-m text-neutral-2">Member since</label>
            <p className="mt-1 text-body-l text-neutral-1">
              {currentUser?.createdAt &&
                new Date(currentUser.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
            </p>
          </div>

          <div>
            <label className="text-body-m text-neutral-2">Status</label>
            <p className="mt-1 text-body-l text-neutral-1">
              {currentUser?.type}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
