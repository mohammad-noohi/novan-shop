import { useEffect, useState } from "react";
import FallbackImage from "@/components/FallbackImage";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import DeleteModal from "@/components/DeleteModal";
import EditModal from "@/components/Dashboard/EditModal";
import ViewModal from "@/components/Dashboard/ViewModal";
import { toast } from "sonner";
import AddUserForm from "@/components/Dashboard/Users/AddUserForm";
import EditUserForm from "@/components/Dashboard/Users/EditUserForm";
import EditUserPassForm from "@/components/Dashboard/Users/EditUserPassForm";
import UsersTable from "@/components/Dashboard/Users/UsersTable";
import FilterUsers from "@/components/Dashboard/Users/FilterUsers";
import SortUsers from "@/components/Dashboard/Users/SortUsers";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false); // maybe i need it
  const [selectedUser, setSelectedUser] = useState(null);
  const [modals, setModals] = useState({
    view: false,
    edit: false,
    delete: false,
    password: false,
  });

  let pages = null;

  const [query, setQuery] = useState({
    search: "",
    filters: {
      role: "all",
    },
    sort: "none",
    pagination: {
      page: 1,
      perPages: 10,
    },
  });

  function changeCurrentPage(num) {
    setQuery(prev => ({ ...prev, pagination: { ...prev.pagination, page: num } }));
  }

  function prevPage() {
    setQuery(prev => {
      if (prev.pagination.page > 1) {
        return { ...prev, pagination: { ...prev.pagination, page: prev.pagination.page - 1 } };
      }

      return prev;
    });
  }

  function nextPage() {
    setQuery(prev => {
      if (prev.pagination.page < pages) {
        return { ...prev, pagination: { ...prev.pagination, page: prev.pagination.page + 1 } };
      }

      return prev;
    });
  }

  function visibleUseres() {
    let result = [...users]; // copy of users

    // search
    if (query.search.trim()) {
      const term = query.search.toLowerCase().trim();

      result = result.filter(user => {
        if (user.firstname.toLowerCase().trim().includes(term) || user.lastname.toLowerCase().trim().includes(term) || user.email.toLowerCase().trim().includes(term)) {
          return user;
        }
      });
    }

    // filtering
    if (query.filters.role !== "all") {
      result = result.filter(user => user.role.toLowerCase() === query.filters.role.toLowerCase());
    }

    // sorting
    result.sort((a, b) => {
      const sortType = query.sort;

      if (sortType === "firstname-asc") return a.firstname.localeCompare(b.firstname);
      if (sortType === "firstname-desc") return b.firstname.localeCompare(a.firstname);
      if (sortType === "lastname-asc") return a.lastname.localeCompare(b.lastname);
      if (sortType === "lastname-desc") return b.lastname.localeCompare(a.lastname);
      if (sortType === "date-asc") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortType === "date-desc") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

      return 0;
    });

    // Paginated Result
    const endIndex = query.pagination.page * query.pagination.perPages;
    const startIndex = endIndex - query.pagination.perPages;
    pages = Math.ceil(result.length / query.pagination.perPages);
    result = result.slice(startIndex, endIndex);

    return result;
  }

  const processedUsers = visibleUseres();

  async function deleteUser() {
    try {
      const token = localStorage.getItem("novan-user-token");
      if (!token) throw new Error("No Token Found");
      const resp = await fetch(`http://localhost:3000/users/${selectedUser.id}`, {
        method: "DELETE",
      });

      if (!resp.ok) throw new Error("Failed to delete user");

      await fetchUsers();
      toast.success("user delete successfully");
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  }

  async function fetchUsers() {
    try {
      setLoadingUsers(true);
      const resp = await fetch("http://localhost:3000/users");
      if (!resp.ok) throw new Error("Failed to get users data");
      const data = await resp.json();
      setUsers(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingUsers(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

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
