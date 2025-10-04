import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsSkeleton() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-app-dark p-5">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 mt-2 w-[250px]" />
        </div>

        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="size-12" />
          <Skeleton className="size-12" />
        </div>
      </div>

      <div className="mt-10">
        <Skeleton className=" p-5 rounded-lg">
          <Skeleton className="w-20 h-4" />
          <form className="mt-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <Skeleton className="w-10 h-3" />
                <Skeleton className="w-full h-8 mt-1" />
              </div>
              <div>
                <Skeleton className="w-10 h-3" />
                <Skeleton className="w-full h-8 mt-1" />
              </div>
              <div>
                <Skeleton className="w-10 h-3" />
                <Skeleton className="w-full h-8 mt-1" />
              </div>
              <div>
                <Skeleton className="w-10 h-3" />
                <Skeleton className="w-full h-8 mt-1" />
              </div>
              <div>
                <Skeleton className="w-10 h-3" />
                <Skeleton className="w-full h-8 mt-1" />
              </div>
              <div>
                <Skeleton className="w-10 h-3" />
                <Skeleton className="w-full h-8 mt-1" />
              </div>
            </div>

            <Skeleton className="py-1 px-4 mt-5 h-10 w-20" />
          </form>
        </Skeleton>

        {/* Toolbar Section*/}
        <Skeleton className="  mt-10 p-5 rounded-lg">
          <div>
            <Skeleton className="w-20 h-4" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
              <div>
                <Skeleton className="w-10 h-3" />
                <Skeleton className="w-full h-8 mt-1" />
              </div>
              <div>
                <Skeleton className="w-10 h-3" />
                <Skeleton className="w-full h-8 mt-1" />
              </div>
              <div>
                <Skeleton className="w-10 h-3" />
                <Skeleton className="w-full h-8 mt-1" />
              </div>
              <div>
                <Skeleton className="w-10 h-3" />
                <Skeleton className="w-full h-8 mt-1" />
              </div>
              <div>
                <Skeleton className="w-10 h-3" />
                <Skeleton className="w-full h-8 mt-1" />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Skeleton className="w-20 h-4" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
              <div>
                <Skeleton className="w-10 h-3" />
                <Skeleton className="w-full h-8 mt-1" />
              </div>
              <div>
                <Skeleton className="w-10 h-3" />
                <Skeleton className="w-full h-8 mt-1" />
              </div>
              <div>
                <Skeleton className="w-10 h-3" />
                <Skeleton className="w-full h-8 mt-1" />
              </div>
              <div>
                <Skeleton className="w-10 h-3" />
                <Skeleton className="w-full h-8 mt-1" />
              </div>

              <div>
                <Skeleton className="w-10 h-3" />
                <Skeleton className="w-full h-8 mt-1" />
              </div>

              <div>
                <Skeleton className="w-10 h-3" />
                <Skeleton className="w-full h-8 mt-1" />
              </div>
            </div>
          </div>
        </Skeleton>

        {/* Table Section*/}
        <Skeleton className=" mt-10 p-5 rounded-lg">
          <div className="flex items-center gap-3 flex-wrap justify-between">
            <Skeleton className="w-xs h-8" />

            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-3" />
              <Skeleton className="w-12 h-10" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="bg-white dark:bg-app-dark text-nowrap w-full mt-5 text-center border-separate border-spacing-0 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900">
                  {Array(8)
                    .fill(0)
                    .map((_, i) => (
                      <th key={i} className="p-3">
                        <Skeleton className="h-4 w-20 mx-auto" />
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {Array(5)
                  .fill(0)
                  .map((_, rowIndex) => (
                    <tr key={rowIndex} className="even:bg-slate-50 dark:even:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800">
                      {Array(8)
                        .fill(0)
                        .map((_, colIndex) => (
                          <td key={colIndex} className="p-2">
                            <Skeleton className="h-4 w-16 mx-auto" />
                          </td>
                        ))}
                    </tr>
                  ))}
              </tbody>
            </table>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 mt-5">
                <Skeleton className="size-8" />
                <Skeleton className="size-8" />
                <Skeleton className="size-8" />
                <Skeleton className="size-8" />
              </div>

              <Skeleton className="w-20 h-4" />
            </div>
          </div>
        </Skeleton>
      </div>
    </div>
  );
}
