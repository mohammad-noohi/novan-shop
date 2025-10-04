import { useEffect, useState } from "react";
import { useCartContext } from "@/contexts/CartContext/useCartContext";
import OrdersTable from "@/components/Dashboard/Orders/OrdersTable";
import FilterOrders from "@/components/Dashboard/Orders/FilterOrders";
import SortOrders from "@/components/Dashboard/Orders/SortOrders";
import { Skeleton } from "@/components/ui/skeleton";

export default function Orders() {
  const [loadingPage, setLoadingPage] = useState(true);
  const { products } = useCartContext();
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [modals, setModals] = useState({
    view: false,
    edit: false,
  });
  const [query, setQuery] = useState({
    search: "",
    filters: {
      status: "all",
      fromDate: null,
      toDate: null,
    },
    sort: "none",
    pagination: {
      page: 1,
      perPages: 10,
    },
  });
  const [selectedOrder, setSelectedOrder] = useState(null);

  let pages = null;

  // pagination actions
  function changeCurrentPage(num) {
    setQuery(prev => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        page: num,
      },
    }));
  }

  function nextPage() {
    setQuery(prev => {
      if (prev.pagination.page < pages) {
        return { ...prev, pagination: { ...prev.pagination, page: prev.pagination.page + 1 } };
      }

      return prev;
    });
  }

  function prevPage() {
    setQuery(prev => {
      if (prev.pagination.page > 1) {
        return { ...prev, pagination: { ...prev.pagination, page: prev.pagination.page - 1 } };
      }

      return prev;
    });
  }

  function visibleOrders() {
    let result = [...orders];

    // search نمیدونم باید بر چه اساسی سرچ کرد
    if (query.search.trim()) {
      const term = query.search.toLowerCase().trim();
      result = result.filter(order => {
        // search by user
        const user = users.find(user => user.id === order.userId);

        return user.username.toLowerCase().includes(term) || user.email.toLowerCase().includes(term);
      });
    }

    // filtering
    if (query.filters.status !== "all") {
      result = result.filter(order => order.status === query.filters.status);
    }

    if (query.filters.fromDate) {
      result = result.filter(order => new Date(order.createdAt) > new Date(query.filters.fromDate));
    }

    if (query.filters.toDate) {
      result = result.filter(order => new Date(order.createdAt) < new Date(query.filters.toDate));
    }

    // sorting
    result.sort((a, b) => {
      const sortType = query.sort;
      if (sortType === "price-asc") return a.finalPrice - b.finalPrice;
      if (sortType === "price-desc") return b.finalPrice - a.finalPrice;
      if (sortType === "date-asc") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortType === "date-desc") return new Date(b.createdAt) - new Date(a.createdAt);

      return 0;
    });

    const endIndex = query.pagination.page * query.pagination.perPages;
    const startIndex = endIndex - query.pagination.perPages;
    pages = Math.ceil(result.length / query.pagination.perPages);
    result = result.slice(startIndex, endIndex);

    return result;
  }

  const processedOrders = visibleOrders();

  async function fetchOrders() {
    try {
      const resp = await fetch("http://localhost:3000/orders");
      if (!resp.ok) throw new Error("Failed to fetch users");
      const data = await resp.json();
      setOrders(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function fetchUsers() {
    try {
      const resp = await fetch("http://localhost:3000/users");
      if (!resp.ok) throw new Error("Failed to fetch users");
      const data = await resp.json();
      setUsers(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    (async () => {
      await fetchOrders();
      await fetchUsers();
      setLoadingPage(false);
    })();
  }, []);

  if (loadingPage) {
    // orders page skeleton effect template
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-app-dark p-5">
        <div>
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 mt-2 w-[250px]" />
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
              </div>
            </form>
          </Skeleton>
        </div>

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
    );
  } else {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-app-dark p-5">
        <h2 className="text-2xl font-bold">Orders</h2>
        <p className="text-slate-500">Manage your Orders as you wish!</p>

        <div className="mt-10">
          <div className="bg-white dark:bg-suface-dark border border-slate-200 dark:border-slate-800 mt-10 p-5 rounded-lg">
            <FilterOrders query={query} setQuery={setQuery} />
            <SortOrders query={query} setQuery={setQuery} />
          </div>

          <OrdersTable
            query={query}
            setQuery={setQuery}
            changeCurrentPage={changeCurrentPage}
            nextPage={nextPage}
            prevPage={prevPage}
            pages={pages}
            fetchOrders={fetchOrders}
            modals={modals}
            setModals={setModals}
            orders={orders}
            processedOrders={processedOrders}
            products={products}
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
            users={users}
          />
        </div>
      </div>
    );
  }
}
