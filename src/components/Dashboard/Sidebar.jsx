import { NavLink } from "react-router";
import { LayoutDashboard, Store, ListOrdered, MessageCircleMore, Users, Ticket, Percent, UserPen, PanelRightOpen, LogOut, Moon, Sun, Bell } from "lucide-react";

export default function Sidebar({ collapsedLayout, onToggleLayout }) {
  return (
    <aside className={`bg-white max-w-[300px] flex flex-col border-r border-slate-200 transition-all ${collapsedLayout ? "w-[65px]" : "w-full"}`}>
      {/* sidebar header */}
      <div className={`flex items-center p-3 ${collapsedLayout ? "justify-center" : "justify-end"}`}>
        <button className="cursor-pointer" onClick={onToggleLayout}>
          <PanelRightOpen className="size-6" />
        </button>
      </div>
      {/* sidebar body */}
      <div className="px-3">
        <ul className="flex flex-col gap-1 mt-3">
          <li>
            <NavLink to="/admin/dashboard" className={({ isActive }) => `flex items-center -500 gap-4 p-2 rounded-lg transition-colors  ${isActive ? "bg-slate-400" : "hover:bg-slate-100"}`}>
              <LayoutDashboard className="shrink-0 size-6" />
              {!collapsedLayout && <span>Dashboard</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/products" className={({ isActive }) => `flex items-center -500 gap-4 p-2 rounded-lg transition-colors  ${isActive ? "bg-slate-400" : "hover:bg-slate-100"}`}>
              <Store className="shrink-0 size-6" />
              {!collapsedLayout && <span>Products</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/orders" className={({ isActive }) => `flex items-center -500 gap-4 p-2 rounded-lg transition-colors  ${isActive ? "bg-slate-400" : "hover:bg-slate-100"}`}>
              <ListOrdered className="shrink-0 size-6" />
              {!collapsedLayout && <span>Orders</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/comments" className={({ isActive }) => `flex items-center -500 gap-4 p-2 rounded-lg transition-colors  ${isActive ? "bg-slate-400" : "hover:bg-slate-100"}`}>
              <MessageCircleMore className="shrink-0 size-6" />
              {!collapsedLayout && <span>Comments</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/users" className={({ isActive }) => `flex items-center -500 gap-4 p-2 rounded-lg transition-colors  ${isActive ? "bg-slate-400" : "hover:bg-slate-100"}`}>
              <Users className="shrink-0 size-6" />
              {!collapsedLayout && <span>Users</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/tickets" className={({ isActive }) => `flex items-center -500 gap-4 p-2 rounded-lg transition-colors  ${isActive ? "bg-slate-400" : "hover:bg-slate-100"}`}>
              <Ticket className="shrink-0 size-6" />
              {!collapsedLayout && <span>Tickets</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/discounts" className={({ isActive }) => `flex items-center -500 gap-4 p-2 rounded-lg transition-colors  ${isActive ? "bg-slate-400" : "hover:bg-slate-100"}`}>
              <Percent className="shrink-0 size-6" />
              {!collapsedLayout && <span>Discounts</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/profile" className={({ isActive }) => `flex items-center -500 gap-4 p-2 rounded-lg transition-colors  ${isActive ? "bg-slate-400" : "hover:bg-slate-100"}`}>
              <UserPen className="shrink-0 size-6" />
              {!collapsedLayout && <span>Profile</span>}
            </NavLink>
          </li>
        </ul>
      </div>
      {/* sidebar footer */}
      <div className={`mt-auto flex p-3 border-t border-slate-200  `}>
        <button className="cursor-pointer flex items-center justify-center">
          <Moon />
        </button>
      </div>
    </aside>
  );
}
