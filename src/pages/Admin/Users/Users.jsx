import { Eye, Pencil, Trash, EllipsisVertical, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
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

export default function Users() {
  return (
    <div className="min-h-screen bg-slate-100 p-5">
      <h2 className="text-2xl font-bold">Users</h2>
      <p className="text-slate-500">Manage your Users as you wish!</p>

      <div className="mt-10">
        {/* Add New User Form */}
        <div className="bg-white p-5 rounded-lg">
          <h4 className="text-xl font-semibold capitalize">add user</h4>
          <form className="mt-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <Input type="text" placeholder="firstname" />
              </div>
              <div>
                <Input type="text" placeholder="lastname" />
              </div>
              <div>
                <Input type="email" placeholder="email" />
              </div>
              <div>
                <Input type="text" placeholder="username" />
              </div>
              <div>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select user role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Role</SelectLabel>
                      <SelectItem value="admin">admin</SelectItem>
                      <SelectItem value="user">user</SelectItem>
                      <SelectItem value="editor">editor</SelectItem>
                      <SelectItem value="manager">manager</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <button className="py-1 px-4 mt-5 bg-slate-200 rounded-lg text-lg capitalize cursor-pointer hover:bg-slate-300  transition-colors">add user</button>
          </form>
        </div>

        {/* Toolbar Section*/}
        <div className="bg-white mt-10 p-5 rounded-lg">
          {/* --------------- Filtering Section ------------------- */}
          <h4 className="text-xl font-semibold capitalize">filtering</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">admin</SelectItem>
                <SelectItem value="editor">editor</SelectItem>
                <SelectItem value="user">user</SelectItem>
                <SelectItem value="manager">manager</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* --------------- Sortign Section ------------------- */}
          <h4 className="text-xl font-semibold capitalize mt-5">Sorting</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="sort by firstname" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">A - Z</SelectItem>
                <SelectItem value="name-desc">Z - A</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="sort by lastname" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">A - Z</SelectItem>
                <SelectItem value="name-desc">Z - A</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="sort by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-asc">oldest first</SelectItem>
                <SelectItem value="date-desc">newest first</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table Section*/}
        <div className="bg-white mt-10 p-5 rounded-lg">
          <div className="flex items-center gap-3 flex-wrap justify-between">
            <Input className="max-w-100" type="search" placeholder="search user by name" />

            <div className="flex items-center gap-3">
              <p>rows per page :</p>
              <Select id="rows-per-page">
                <SelectTrigger className="w-auto">
                  <SelectValue placeholder="8" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>rows</SelectLabel>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* table */}
          <div className="overflow-x-auto">
            {/* products table */}
            <table className="w-full text-nowrap bg-white mt-5 text-center border-separate border-spacing-0 rounded-lg overflow-hidden">
              <thead>
                <tr className="*:border *:border-slate-200 *:uppercase *:p-3 bg-slate-50">
                  <th>avatar</th>
                  <th>firstname</th>
                  <th>lastname</th>
                  <th>email</th>
                  <th>username</th>
                  <th>role</th>

                  <th></th>
                </tr>
              </thead>
              <tbody className="*:even:bg-slate-50 *:transition-colors *:hover:bg-slate-100">
                <tr className="*:border *:p-2 *:border-slate-200 ">
                  <td>img</td>
                  <td>mohammad</td>
                  <td>noohi</td>
                  <td>noohi.m98@gmail.com</td>
                  <td>noohi1998</td>
                  <td>admin</td>

                  <td className="flex items-center gap-2 justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        {/* <Button variant="outline">Open</Button> */}
                        <button>
                          <EllipsisVertical />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        <DropdownMenuItem>
                          <Eye className="size-4" />
                          <span>view</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="size-4" />
                          <span>edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-red-100! text-red-500 hover:text-red-500!">
                          <Trash className="size-4" />
                          <span>delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex items-end justify-between flex-wrap-reverse mt-5 gap-5">
            {/* pagination */}
            <div className="flex items-center gap-3">
              <button className="size-9 font-bold flex justify-center items-center rounded-lg border border-slate-200 bg-slate-50 cursor-pointer dark:bg-suface-dark dark:border-slate-800 dark:text-white disabled:opacity-30 disabled:cursor-not-allowed">
                <ChevronLeft className="size-4" />
              </button>
              <button
                className={`size-9 font-bold flex justify-center items-center rounded-lg border border-slate-200 bg-slate-50 cursor-pointer dark:bg-suface-dark dark:border-slate-800 dark:text-white `}>
                1
              </button>
              <button
                className={` size-9 font-bold flex justify-center items-center rounded-lg border border-slate-200 bg-slate-300 cursor-pointer dark:bg-suface-dark dark:border-slate-800 dark:text-white `}>
                2
              </button>
              <button
                className={`size-9 font-bold flex justify-center items-center rounded-lg border border-slate-200 bg-slate-50 cursor-pointer dark:bg-suface-dark dark:border-slate-800 dark:text-white `}>
                3
              </button>
              <button className="size-9 font-bold flex justify-center items-center rounded-lg border border-slate-200 bg-slate-50 cursor-pointer dark:bg-suface-dark dark:border-slate-800 dark:text-white disabled:opacity-30 disabled:cursor-not-allowed">
                <ChevronRight className="size-4" />
              </button>
            </div>

            <span className="capitalize text-lg text-slate-400">total products : 200</span>
          </div>
        </div>
      </div>
    </div>
  );
}
