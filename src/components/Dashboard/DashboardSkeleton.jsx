import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-app-dark p-5">
      <div>
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-4 mt-2 w-[250px]" />
      </div>

      <div className="mt-5 grid gap-5 grid-cols-1 md:grid-cols-2  xl:grid-cols-4 ">
        <Skeleton className="flex items-center gap-3 rounded-lg  px-4 py-3 dark:border-slate-800  ">
          <Skeleton className="size-12 "></Skeleton>
          <div>
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-25 mt-2" />
          </div>
        </Skeleton>

        <Skeleton className="flex items-center gap-3 rounded-lg  px-4 py-3 dark:border-slate-800  ">
          <Skeleton className="size-12 "></Skeleton>
          <div>
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-25 mt-2" />
          </div>
        </Skeleton>

        <Skeleton className="flex items-center gap-3 rounded-lg  px-4 py-3 dark:border-slate-800  ">
          <Skeleton className="size-12 "></Skeleton>
          <div>
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-25 mt-2" />
          </div>
        </Skeleton>

        <Skeleton className="flex items-center gap-3 rounded-lg  px-4 py-3 dark:border-slate-800  ">
          <Skeleton className="size-12 "></Skeleton>
          <div>
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-25 mt-2" />
          </div>
        </Skeleton>
      </div>

      <div className="mt-5 grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* left column */}
        <div className="space-y-5">
          {/* Recent Orders chart */}
          <Skeleton className="rounded-lg px-5 py-3">
            <Skeleton className="h-4 mt-2 w-[250px]" />
            <Skeleton className="mt-4 w-full h-60  rounded-lg " />
          </Skeleton>

          {/* Revenu chart */}
          <Skeleton className="rounded-lg px-5 py-3">
            <Skeleton className="h-4 mt-2 w-[250px]" />
            <Skeleton className="mt-4 w-full h-60  rounded-lg " />
          </Skeleton>

          {/* Users chart */}
          <Skeleton className="rounded-lg px-5 py-3">
            <Skeleton className="h-4 mt-2 w-[250px]" />
            <Skeleton className="mt-4 w-full h-60  rounded-lg " />
          </Skeleton>
        </div>

        {/* right column */}
        <div className="space-y-5">
          {/* Recent orders*/}

          <Skeleton className="rounded-lg   px-5 py-3 ">
            <Skeleton className="h-4 mt-2 w-[250px]" />
            <div className="overflow-hidden">
              <table className=" dark:bg-app-dark text-nowrap w-full mt-5 text-center border-separate border-spacing-0 rounded-lg overflow-hidden">
                <thead>
                  <tr>
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
                      <tr key={rowIndex}>
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
            </div>
          </Skeleton>

          {/* Recent Users */}

          <Skeleton className="rounded-lg   px-5 py-3 ">
            <Skeleton className="h-4 mt-2 w-[250px]" />
            <div className="overflow-hidden">
              <table className=" dark:bg-app-dark text-nowrap w-full mt-5 text-center border-separate border-spacing-0 rounded-lg overflow-hidden">
                <thead>
                  <tr>
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
                      <tr key={rowIndex}>
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
            </div>
          </Skeleton>
        </div>
      </div>
    </div>
  );
}
