import { NavLink } from "react-router";
import { LayoutDashboard, Store, ListOrdered, MessageCircleMore, Users, Ticket, Percent, UserPen, PanelRightOpen, LogOut, Moon, Sun, Bell } from "lucide-react";

export default function Sidebar({ collapsedLayout, onToggleLayout }) {
  return (
    <aside className={`bg-white max-w-[300px] flex flex-col sticky top-0 border-r border-slate-200 transition-all overflow-x-hidden ${collapsedLayout ? "w-[65px]" : "w-full"}`}>
      {/* sidebar header */}
      <div className={`flex items-center p-3 ${collapsedLayout ? "justify-center" : "justify-end"}`}>
        <button className="cursor-pointer" onClick={onToggleLayout}>
          <PanelRightOpen className="size-6" />
        </button>
      </div>
      {/* sidebar body */}
      <div className="px-3">
        <ul className="mt-3 flex flex-col gap-1">
          <li>
            <NavLink to="/admin/dashboard" className={({ isActive }) => `flex items-center  gap-5 p-2 rounded-lg transition-colors  ${isActive ? "bg-slate-200" : "hover:bg-slate-100"}`}>
              <LayoutDashboard className="size-6 shrink-0" />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/products" className={({ isActive }) => `flex items-center  gap-5 p-2 rounded-lg transition-colors  ${isActive ? "bg-slate-200" : "hover:bg-slate-100"}`}>
              <Store className="size-6 shrink-0" />
              <span>Products</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/orders" className={({ isActive }) => `flex items-center  gap-5 p-2 rounded-lg transition-colors  ${isActive ? "bg-slate-200" : "hover:bg-slate-100"}`}>
              <ListOrdered className="size-6 shrink-0" />
              <span>Orders</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/comments" className={({ isActive }) => `flex items-center  gap-5 p-2 rounded-lg transition-colors  ${isActive ? "bg-slate-200" : "hover:bg-slate-100"}`}>
              <MessageCircleMore className="size-6 shrink-0" />
              <span>Comments</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/users" className={({ isActive }) => `flex items-center  gap-5 p-2 rounded-lg transition-colors  ${isActive ? "bg-slate-200" : "hover:bg-slate-100"}`}>
              <Users className="size-6 shrink-0" />
              <span>Users</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/tickets" className={({ isActive }) => `flex items-center  gap-5 p-2 rounded-lg transition-colors  ${isActive ? "bg-slate-200" : "hover:bg-slate-100"}`}>
              <Ticket className="size-6 shrink-0" />
              <span>Tickets</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/discounts" className={({ isActive }) => `flex items-center  gap-5 p-2 rounded-lg transition-colors  ${isActive ? "bg-slate-200" : "hover:bg-slate-100"}`}>
              <Percent className="size-6 shrink-0" />
              <span>Discounts</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/profile" className={({ isActive }) => `flex items-center  gap-5 p-2 rounded-lg transition-colors  ${isActive ? "bg-slate-200" : "hover:bg-slate-100"}`}>
              <UserPen className="size-6 shrink-0" />
              <span>Profile</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}
