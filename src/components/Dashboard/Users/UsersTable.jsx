import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, LockKeyhole, Pencil, Trash, EllipsisVertical } from "lucide-react";
import CustomPagination from "@/components/CustomPagination";

export default function UsersTable({ processedUsers, setModals, setSelectedUser, query, pages, changeCurrentPage, nextPage, prevPage, users }) {
  if (processedUsers.length > 0) {
    return (
      <>
        <div className="overflow-x-auto">
          <table className="bg-white dark:bg-app-dark text-nowrap w-full mt-5 text-center border-separate border-spacing-0 rounded-lg overflow-hidden">
            <thead>
              <tr className="*:border *:border-slate-200 dark:*:border-slate-700 *:uppercase *:p-3 bg-slate-50 dark:bg-slate-900">
                <th>id</th>
                <th>firstname</th>
                <th>lastname</th>
                <th>email</th>
                <th>username</th>
                <th>role</th>
                <th>joined us</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="*:even:bg-slate-50 dark:*:even:bg-slate-900 *:transition-colors *:hover:bg-slate-100 dark:*:hover:bg-slate-800">
              {processedUsers.map(user => (
                <tr key={user.id} className="*:border *:p-2 *:border-slate-200 dark:*:border-slate-700 ">
                  <td>{user.id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>{user.createdAt?.split("T")[0]}</td>
                  <td>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button>
                          <EllipsisVertical />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        <DropdownMenuItem
                          onClick={() => {
                            setModals(prev => ({ ...prev, view: true }));
                            setSelectedUser(user);
                          }}>
                          <Eye className="size-4" />
                          <span>view</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setModals(prev => ({ ...prev, edit: true }));
                            setSelectedUser(user);
                          }}>
                          <Pencil className="size-4" />
                          <span>edit</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => {
                            setModals(prev => ({ ...prev, password: true }));
                            setSelectedUser(user);
                          }}>
                          <LockKeyhole className="size-4" />
                          <span>change password</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => {
                            setModals(prev => ({ ...prev, delete: true }));
                            setSelectedUser(user);
                          }}
                          className="hover:bg-red-100! text-red-500 hover:text-red-500!">
                          <Trash className="size-4" />
                          <span>delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-end justify-between flex-wrap-reverse mt-5 gap-5">
          {/* pagination */}
          <CustomPagination currentPage={query.pagination.page} onChangePage={changeCurrentPage} onNextPage={nextPage} onPrevPage={prevPage} pages={pages} />

          <span className="capitalize text-lg text-slate-400">total users : {users.length}</span>
        </div>
      </>
    );
  } else {
    return <p>no users found</p>;
  }
}
