import FallbackImage from "@/components/FallbackImage";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
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

export default function Users() {
  const { users, fetchUsers, query, setQuery, pages, changeCurrentPage, nextPage, prevPage, processedUsers, modals, setModals, selectedUser, setSelectedUser, deleteUser } = useUsers();

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-app-dark p-5">
      <h2 className="text-2xl font-bold">Users</h2>
      <p className="text-slate-500">Manage your Users as you wish!</p>

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
