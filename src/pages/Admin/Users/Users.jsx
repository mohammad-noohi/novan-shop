import FallbackImage from "@/components/FallbackImage";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import DeleteModal from "@/components/DeleteModal";
import EditModal from "@/components/Dashboard/EditModal";
import ViewModal from "@/components/Dashboard/ViewModal";
import AddUserForm from "@/components/Dashboard/Users/AddUserForm";
import EditUserForm from "@/components/Dashboard/Users/EditUserForm";
import EditUserPassForm from "@/components/Dashboard/Users/EditUserPassForm";
import UsersTable from "@/components/Dashboard/Users/UsersTable";
import FilterUsers from "@/components/Dashboard/Users/FilterUsers";
import SortUsers from "@/components/Dashboard/Users/SortUsers";
import { useUsers } from "@/components/Dashboard/Users/userUsers";
import { FileText, Sheet } from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export default function Users() {
  const { loadingUsers, users, fetchUsers, query, setQuery, pages, changeCurrentPage, nextPage, prevPage, processedUsers, modals, setModals, selectedUser, setSelectedUser, deleteUser } = useUsers();

  function exportToPDF() {
    if (!users || users.length === 0) {
      alert("هیچ کاربری برای اکسپورت وجود ندارد.");
      return;
    }

    const doc = new jsPDF();

    const columns = ["ID", "First Name", "Last Name", "Username", "Email", "Role", "Created At"];
    const rows = users.map(u => [
      u.id,
      u.firstname,
      u.lastname,
      u.username,
      u.email,
      u.role,
      u.createdAt ? u.createdAt.split("T")[0] : "", // فقط تاریخ
    ]);

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 20,
    });

    doc.text("Users Report", 14, 15);
    doc.save("users.pdf");
  }

  function exportToExcel() {
    if (!users || users.length === 0) {
      alert("هیچ کاربری برای اکسپورت وجود ندارد.");
      return;
    }

    const filtered = users.map(u => ({
      ID: u.id,
      "First Name": u.firstname,
      "Last Name": u.lastname,
      Username: u.username,
      Email: u.email,
      Role: u.role,
      "Created At": u.createdAt ? u.createdAt.split("T")[0] : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(filtered);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    XLSX.writeFile(workbook, "users.xlsx");
  }

  if (loadingUsers) {
    // Shimmer Effect ( Skeleton Effect )
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
                  <Skeleton className="w-10 h-3 " />
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
  } else {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-app-dark p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Users</h2>
            <p className="text-slate-500">Manage your Users as you wish!</p>
          </div>

          <div className="flex items-center gap-3">
            <span>export: </span>
            <button className="cursor-pointer" onClick={exportToPDF}>
              <FileText />
            </button>
            <button className="cursor-pointer" onClick={exportToExcel}>
              <Sheet />
            </button>
          </div>
        </div>

        <div className="mt-10">
          <AddUserForm users={users} fetchUsers={fetchUsers} />

          {/* Toolbar Section*/}
          <div className="bg-white dark:bg-suface-dark border border-slate-200 dark:border-slate-800 mt-10 p-5 rounded-lg">
            <FilterUsers query={query} setQuery={setQuery} />
            <SortUsers query={query} setQuery={setQuery} />
          </div>

          {/* Table Section*/}
          <div className="bg-white dark:bg-suface-dark mt-10 p-5 rounded-lg">
            <div className="flex items-center gap-3 flex-wrap justify-between">
              <Input value={query.search} onChange={e => setQuery(prev => ({ ...prev, search: e.target.value }))} className="max-w-100" type="search" placeholder="search user by name" />

              <div className="flex items-center gap-3">
                <p>rows per page :</p>
                <Select value={query.pagination.perPages} onValueChange={value => setQuery(prev => ({ ...prev, pagination: { ...prev.pagination, perPages: value } }))} id="rows-per-page">
                  <SelectTrigger className="w-auto">
                    <SelectValue placeholder="8" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>rows</SelectLabel>
                      <SelectItem value={5}>5</SelectItem>
                      <SelectItem value={10}>10</SelectItem>
                      <SelectItem value={15}>15</SelectItem>
                      <SelectItem value={20}>20</SelectItem>
                      <SelectItem value={25}>25</SelectItem>
                      <SelectItem value={30}>30</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <UsersTable
              changeCurrentPage={changeCurrentPage}
              users={users}
              nextPage={nextPage}
              pages={pages}
              prevPage={prevPage}
              processedUsers={processedUsers}
              query={query}
              setModals={setModals}
              setSelectedUser={setSelectedUser}
            />
          </div>
        </div>

        {selectedUser && (
          <>
            <ViewModal show={modals.view} onClose={() => setModals(prev => ({ ...prev, view: false }))}>
              <div className="p-3 flex items-start gap-8">
                <div className="borde overflow-hidden relative size-50 rounded-full ring-4 ring-offset-4 ring-slate-200 dark:ring-slate-600 dark:ring-offset-app-dark shrink-0">
                  <FallbackImage className="size-full object-cover " src={`/${selectedUser.profile}`} />
                </div>
                <div>
                  <h4 className="text-4xl font-bold capitalize">
                    {selectedUser.firstname} {selectedUser.lastname}
                  </h4>
                  <p className="text-2xl text-slate-600 dark:text-slate-500">{selectedUser.username}</p>
                  <p className="text-slate-600 dark:text-slate-500">{selectedUser.email}</p>
                  <p className="text-slate-600 dark:text-slate-500">{selectedUser.createdAt?.split("T")[0]}</p>
                  <p className=" uppercase mt-5 font-semibold py-1 px-3 inline-block rounded-full bg-slate-200 dark:bg-slate-700">{selectedUser.role}</p>
                </div>
              </div>
            </ViewModal>

            <EditModal show={modals.edit} onClose={() => setModals(prev => ({ ...prev, edit: false }))}>
              <EditUserForm fetchUsers={fetchUsers} onCloseModal={() => setModals(prev => ({ ...prev, edit: false }))} users={users} selectedUser={selectedUser} />
            </EditModal>

            <EditModal show={modals.password} onClose={() => setModals(prev => ({ ...prev, password: false }))}>
              <EditUserPassForm fetchUsers={fetchUsers} onCloseModal={() => setModals(prev => ({ ...prev, password: false }))} selectedUser={selectedUser} />
            </EditModal>

            <DeleteModal onConfirm={deleteUser} show={modals.delete} onClose={() => setModals(prev => ({ ...prev, delete: false }))} text="Are you sure want to delete this user ?" />
          </>
        )}
      </div>
    );
  }
}
