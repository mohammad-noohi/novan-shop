import { X, LogOut, Sun, Moon, ChevronRight } from "lucide-react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { useThemeContext } from "../contexts/ThemeContext/useThemeContext";
import { useAuthContext } from "../contexts/AuthContext/useAuthContext";
import { NavLink } from "react-router";

export default function MobileMenuDrawer({ show, onClose }) {
  const { theme, toggleTheme } = useThemeContext();
  const { user, logout } = useAuthContext();

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          key="mobile-menu-drawer"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed flex flex-col top-0 right-0 w-xs bg-white h-screen dark:bg-suface-dark border-l border-slate-200 dark:border-slate-800 z-20">
          {/* mobile menu header */}
          <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
            <p className="text-sm dark:text-muted-dark line-clamp-1" title={`welcome ${user.firstname} ${user.lastname}`}>
              <span>🎉 Welcome, </span>
              <span>{user.firstname}</span>
            </p>
            <button onClick={onClose}>
              <X className="size-6 cursor-pointer hover:text-red-500 transition-colors dark:text-white dark:hover:text-red-800" />
            </button>
          </div>
          {/* mobile menu body */}
          <div className="p-4 flex flex-col ">
            {/* implement profile menu and other stuff here */}

            <ul className="flex flex-col items-start gap-4 ">
              <li>
                <NavLink
                  to="/"
                  onClick={onClose}
                  className={({ isActive }) => {
                    return `flex items-center gap-2 hover:gap-3 transition-all ${isActive ? "text-brand dark:text-indigo-500" : " dark:text-white"}`;
                  }}>
                  <ChevronRight className="size-5" />
                  <span>products</span>
                </NavLink>
              </li>

              {user !== null && (
                <li>
                  <NavLink
                    to="/cart"
                    onClick={onClose}
                    className={({ isActive }) => {
                      return `flex items-center gap-2 hover:gap-3 transition-all ${isActive ? "text-brand dark:text-indigo-500" : " dark:text-white"}`;
                    }}>
                    <ChevronRight className="size-5" />
                    <span>cart</span>
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          {/* mobiel menu footer */}
          <div className="flex items-center justify-between p-4 mt-auto border-t border-slate-200 dark:border-slate-800">
            <div
              onClick={logout}
              className=" bg-slate-50 size-10 flex items-center justify-center rounded-full dark:bg-suface-dark dark:text-muted-dark border-2 border-slate-200 dark:border-slate-800 cursor-pointer hover:text-red-500 hover:border-red-500 dark:hover:border-red-800 dark:hover:text-red-800 transition-colors">
              <LogOut className="size-4 rotate-180" />
            </div>

            <div
              className=" bg-slate-50 size-10 cursor-pointer rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-800 dark:bg-suface-dark dark:text-muted-dark"
              onClick={toggleTheme}>
              {theme === "light" && <Sun className="size-4" />}
              {theme === "dark" && <Moon className="size-4" />}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.querySelector("#mobile-menu-root")
  );
}
