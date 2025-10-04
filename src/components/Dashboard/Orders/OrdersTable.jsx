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
import DotStatus from "@/components/DotStatus";
import CustomPagination from "@/components/CustomPagination";
import EditModal from "@/components/Dashboard/EditModal";
import OrderEditForm from "@/components/Dashboard/Orders/OrderEditForm";
import OrderViewModal from "@/components/Dashboard/Orders/OrderViewModal";
import { Eye, Pencil, EllipsisVertical } from "lucide-react";

export default function OrdersTable({
  query,
  setQuery,
  processedOrders,
  users,
  setModals,
  setSelectedOrder,
  pages,
  nextPage,
  prevPage,
  changeCurrentPage,
  modals,
  orders,
  selectedOrder,
  products,
  fetchOrders,
}) {
  return (
    <div className="bg-white dark:bg-suface-dark border border-slate-200 dark:border-slate-800 mt-10 p-5 rounded-lg">
      <div className="flex items-center gap-3 flex-wrap justify-between">
        <Input value={query.search} onChange={e => setQuery(prev => ({ ...prev, search: e.target.value }))} className="max-w-100" type="search" placeholder="search order by username or email" />

        <div className="flex items-center gap-3">
          <p>rows per page :</p>
          <Select
            value={query.pagination.perPages}
            onValueChange={value =>
              setQuery(prev => ({
                ...prev,
                pagination: {
                  ...prev.pagination,
                  perPages: value,
                },
              }))
            }
            id="rows-per-page">
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

      <div className="overflow-x-auto">
        {/* Orders table */}
        <table className="bg-white dark:bg-app-dark text-nowrap w-full mt-5 text-center border-separate border-spacing-0 rounded-lg overflow-hidden">
          <thead>
            <tr className="*:border *:border-slate-200 dark:*:border-slate-700 *:uppercase *:p-3 bg-slate-50 dark:bg-slate-900">
              <th>id</th>
              <th>user</th>
              <th>user email</th>
              <th>items</th>
              <th>total price</th>
              <th>final price</th>
              <th>created at</th>
              <th>status</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="*:even:bg-slate-50 dark:*:even:bg-slate-900 *:transition-colors *:hover:bg-slate-100 dark:*:hover:bg-slate-800">
            {processedOrders?.map(order => {
              const user = users.find(user => user.id === order.userId);
              const orderDate = new Date(order.createdAt);
              const year = orderDate.getFullYear();
              const month = String(orderDate.getMonth()).padStart(2, "0");
              const day = String(orderDate.getDate()).padStart(2, "0");
              const hour = String(orderDate.getHours()).padStart(2, "0");
              const min = String(orderDate.getMinutes()).padStart(2, "0");
              return (
                <tr key={order.id} className="*:border *:p-2 *:border-slate-200 dark:*:border-slate-700 ">
                  <td>{order.id}</td>
                  <td>{user?.username}</td>
                  <td>{user?.email}</td>
                  <td>{order.items.length}</td>
                  <td>${order.totalPrice.toLocaleString()}</td>
                  <td>${order.finalPrice.toLocaleString()}</td>
                  <td>{`${year}-${month}-${day} | ${hour}:${min}`}</td>
                  <td>
                    <p className="flex items-center gap-2 justify-center">
                      <DotStatus color={order.status === "paid" ? "green" : order.status === "pending" ? "yellow" : "red"} />
                      <span>{order.status}</span>
                    </p>
                  </td>
                  <td className="flex items-center gap-2 justify-center">
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
                            setSelectedOrder(order);
                          }}>
                          <Eye className="size-4" />
                          <span>view</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setModals(prev => ({ ...prev, edit: true }));
                            setSelectedOrder(order);
                          }}>
                          <Pencil className="size-4" />
                          <span>edit</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-end justify-between flex-wrap-reverse mt-5 gap-5">
        <CustomPagination currentPage={query.pagination.page} pages={pages} onChangePage={changeCurrentPage} onPrevPage={prevPage} onNextPage={nextPage} />

        <span className="capitalize text-lg text-slate-400">total Orders : {orders.length}</span>
      </div>
      <OrderViewModal products={products} users={users} selectedOrder={selectedOrder} modals={modals} setModals={setModals} />

      <EditModal show={modals.edit} onClose={() => setModals(prev => ({ ...prev, edit: false }))}>
        <OrderEditForm setModals={setModals} fetchOrders={fetchOrders} selectedOrder={selectedOrder} />
      </EditModal>
    </div>
  );
}
