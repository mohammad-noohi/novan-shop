import { NavLink } from "react-router";
import { AnimatePresence, motion } from "motion/react"; // eslint-disable-line
import { LayoutDashboard, Store, ListOrdered, MessageCircleMore, Users, Ticket, Percent, UserPen, ChevronLeft, LogOut, Moon, Sun, Bell } from "lucide-react";

export default function Sidebar({ collapsedLayout, onToggleLayout }) {
  return (
    <motion.aside
      animate={{ width: collapsedLayout ? 65 : 250 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`bg-white max-w-[250px] flex flex-col sticky top-0 border-r border-slate-200 dark:bg-suface-dark dark:border-slate-800`}>
      {/* sidebar header */}
      {/* <div className={`flex items-center p-3`}></div> */}
      {/* sidebar body */}
      <div className="px-3 overflow-x-hidden transition-all duration-1000">
        <ul className="mt-3 flex flex-col gap-1">
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) => `flex items-center  gap-5 p-2 rounded-lg transition-colors  ${isActive ? "bg-slate-200 dark:bg-slate-700" : "hover:bg-slate-100 dark:hover:bg-slate-600"}`}>
              <LayoutDashboard className="size-6 shrink-0" />
              <AnimatePresence>
                {!collapsedLayout && (
                  <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
                    Dashboard
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/products"
              className={({ isActive }) => `flex items-center  gap-5 p-2 rounded-lg transition-colors  ${isActive ? "bg-slate-200 dark:bg-slate-700" : "hover:bg-slate-100 dark:hover:bg-slate-600"}`}>
              <Store className="size-6 shrink-0" />
              <AnimatePresence>
                {!collapsedLayout && (
                  <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
                    Products
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/orders"
              className={({ isActive }) => `flex items-center  gap-5 p-2 rounded-lg transition-colors  ${isActive ? "bg-slate-200 dark:bg-slate-700" : "hover:bg-slate-100 dark:hover:bg-slate-600"}`}>
              <ListOrdered className="size-6 shrink-0" />
              <AnimatePresence>
                {!collapsedLayout && (
                  <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
                    Orders
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/comments"
              className={({ isActive }) => `flex items-center  gap-5 p-2 rounded-lg transition-colors  ${isActive ? "bg-slate-200 dark:bg-slate-700" : "hover:bg-slate-100 dark:hover:bg-slate-600"}`}>
              <MessageCircleMore className="size-6 shrink-0" />
              <AnimatePresence>
                {!collapsedLayout && (
                  <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
                    Comments
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/users"
              className={({ isActive }) => `flex items-center  gap-5 p-2 rounded-lg transition-colors  ${isActive ? "bg-slate-200 dark:bg-slate-700" : "hover:bg-slate-100 dark:hover:bg-slate-600"}`}>
              <Users className="size-6 shrink-0" />
              <AnimatePresence>
                {!collapsedLayout && (
                  <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
                    Users
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/tickets"
              className={({ isActive }) => `flex items-center  gap-5 p-2 rounded-lg transition-colors  ${isActive ? "bg-slate-200 dark:bg-slate-700" : "hover:bg-slate-100 dark:hover:bg-slate-600"}`}>
              <Ticket className="size-6 shrink-0" />
              <AnimatePresence>
                {!collapsedLayout && (
                  <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
                    Tickets
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/discounts"
              className={({ isActive }) => `flex items-center  gap-5 p-2 rounded-lg transition-colors  ${isActive ? "bg-slate-200 dark:bg-slate-700" : "hover:bg-slate-100 dark:hover:bg-slate-600"}`}>
              <Percent className="size-6 shrink-0" />
              <AnimatePresence>
                {!collapsedLayout && (
                  <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
                    Discounts
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/profile"
              className={({ isActive }) => `flex items-center  gap-5 p-2 rounded-lg transition-colors  ${isActive ? "bg-slate-200 dark:bg-slate-700" : "hover:bg-slate-100 dark:hover:bg-slate-600"}`}>
              <UserPen className="size-6 shrink-0" />
              <AnimatePresence>
                {!collapsedLayout && (
                  <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
                    Profile
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* sidebar toggler button */}
      <motion.button onClick={onToggleLayout} className="cursor-pointer absolute top-1/2 left-full -translate-1/2 bg-white p-0.5 border rounded-lg shadow dark:bg-suface-dark dark:border-slate-600">
        <motion.div animate={{ rotate: collapsedLayout ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronLeft className="size-6" />
        </motion.div>
      </motion.button>
    </motion.aside>
  );
}
