import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="p-5 bg-slate-100 dark:bg-app-dark min-h-screen">
      {/* Profile */}
      <Skeleton className="rounded-lg p-10 flex flex-col justify-center">
        <div className="flex flex-col md:flex-row text-center md:text-left items-center gap-10 ">
          {/* Admin Avatar */}
          <div className="border relative size-50 rounded-full shrink-0">
            <Skeleton className="size-full rounded-full" />

            {/* Logout Button */}
            <Skeleton className="absolute bottom-0 right-0 group  size-10  rounded-full " />
          </div>
          <div>
            <Skeleton className="h-8 w-80 rounded-full" />
            <Skeleton className="h-4 mt-2 w-40" />
            <Skeleton className="h-4 mt-2 w-40" />
            <Skeleton className="w-20 h-8 mt-3 py-1 px-3  rounded-full" />
          </div>
        </div>
      </Skeleton>

      <Skeleton className=" rounded-lg mt-5">
        <div className=" p-5">
          <Skeleton className="w-20 h-4" />
        </div>
        <div className="p-5">
          <form>
            <div className="space-y-5">
              <div>
                <Skeleton className="w-10 h-3" />
                <Skeleton className="text-lg h-12 rounded-lg mt-2" />
              </div>

              <div>
                <Skeleton className="w-10 h-3" />
                <Skeleton className="text-lg h-12 rounded-lg mt-2" />
              </div>

              <div>
                <Skeleton className="w-10 h-3" />
                <Skeleton className="text-lg h-12 rounded-lg mt-2" />
              </div>

              <div>
                <Skeleton className="w-10 h-3" />
                <Skeleton className="text-lg h-12 rounded-lg mt-2" />
              </div>

              <Skeleton className="py-1 px-4 mt-5 h-10 w-20" />
            </div>
          </form>
        </div>
      </Skeleton>
    </div>
  );
}
