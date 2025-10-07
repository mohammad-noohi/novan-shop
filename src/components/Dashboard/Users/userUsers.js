import { BASE_API_URL } from "../../../../constants";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function useUsers() {
  const [loadingPage, setLoadingPage] = useState(true);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true); // maybe i need it
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
      const resp = await fetch(`${BASE_API_URL}/users/${selectedUser.id}`, {
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
      const resp = await fetch(`${BASE_API_URL}/users`);
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
    (async () => {
      await fetchUsers();
      setTimeout(() => {
        setLoadingPage(false);
      }, 1000);
    })();
  }, []);

  return { loadingPage, loadingUsers, users, fetchUsers, query, setQuery, pages, changeCurrentPage, nextPage, prevPage, processedUsers, modals, setModals, selectedUser, setSelectedUser, deleteUser };
}

export { useUsers };
