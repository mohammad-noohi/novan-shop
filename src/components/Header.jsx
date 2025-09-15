import { Link, NavLink } from "react-router";
import { useState } from "react";
import { useThemeContext } from "../contexts/ThemeContext/useThemeContext";
import { useAuthContext } from "../contexts/AuthContext/useAuthContext";
import CartDrawer from "./CartDrawer";
import { useCartContext } from "../contexts/CartContext/useCartContext";
import MobileMenuDrawer from "./MobileMenuDrawer";
// icons
import { Sun, Moon, ShoppingBag, LogOut, Menu } from "lucide-react";
import DeleteModal from "./DeleteModal";

export default function Header() {
  const { cart } = useCartContext();
  const { user, logout } = useAuthContext();
  const { theme, toggleTheme } = useThemeContext();
  const [showCartDrawer, setShowCartDrawer] = useState(false); // handle show cart drawer
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  /* Derived States */
  const cartItemsCount = cart?.length;

  return (
    <>
      <header className="dark:bg-app-dark border-b border-slate-200 bg-white py-3.5 dark:border-slate-800">
        <div className="container">
          <div className="flex items-center justify-between">
            {/* left header */}
            <nav className="flex items-center gap-5">
              {/* logo */}
              <Link to="/">
                <h1 className="text-brand text-2xl font-bold dark:text-indigo-500">Novan Shop</h1>
              </Link>
              {/* menu */}
              <ul className="hidden items-center gap-4 md:flex">
                <li>
                  <NavLink to="/" className={({ isActive }) => (isActive ? "text-brand dark:text-indigo-500" : " dark:text-white")}>
                    products
                  </NavLink>
                </li>
                {user !== null && (
                  <li>
                    <NavLink to="/cart" className={({ isActive }) => (isActive ? "text-brand dark:text-indigo-500" : " dark:text-white")}>
                      cart
                    </NavLink>
                  </li>
                )}
                {user !== null && user.role === "admin" && (
                  <li>
                    <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? "text-brand dark:text-indigo-500" : " dark:text-white")}>
                      dashboard
                    </NavLink>
                  </li>
                )}
              </ul>
            </nav>

            {/* right header */}
            <div className="flex items-center gap-3">
              {/* cart toggle */}
              {user !== null && (
                <div
                  className="size-10 dark:bg-suface-dark relative flex cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-slate-50 dark:border-slate-800 dark:text-white"
                  onClick={() => setShowCartDrawer(true)}>
                  <ShoppingBag className="size-4" />
                  <span className="size-5 bg-brand absolute right-0 top-0 flex -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full text-xs text-white">{cartItemsCount}</span>
                </div>
              )}

              {/* theme toggle */}
              <div
                className="size-10 dark:bg-suface-dark hidden cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-slate-50 dark:border-slate-800 dark:text-white md:flex"
                onClick={toggleTheme}>
                {theme === "light" && <Sun className="size-4" />}
                {theme === "dark" && <Moon className="size-4" />}
              </div>

              {/* login & register buttons */}
              {user === null && (
                <div className="hidden items-center gap-3 md:flex">
                  <Link to="/login" className="bg-brand border-brand cursor-pointer rounded-lg border px-5 py-1 capitalize text-slate-50 dark:border-indigo-500 dark:bg-indigo-500">
                    login
                  </Link>
                  <Link
                    to="/register"
                    className="text-brand dark:bg-suface-dark cursor-pointer rounded-lg border border-slate-200 bg-slate-50 px-5 py-1 capitalize dark:border-slate-800 dark:text-indigo-500">
                    register
                  </Link>
                </div>
              )}

              {/* user profile */}
              {user !== null && (
                <>
                  <div className="dark:bg-suface-dark dark:text-muted-dark hidden items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-1 dark:border-slate-800 md:flex">
                    <p>
                      <span>welcome, </span>
                      <span>{user.firstname}</span>
                    </p>
                  </div>

                  <div
                    onClick={() => {
                      setShowLogoutModal(true);
                    }}
                    className="size-10 dark:bg-suface-dark dark:text-muted-dark hidden cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-slate-50 dark:border-slate-800 md:flex">
                    <LogOut className="size-4" />
                  </div>
                </>
              )}

              <button onClick={() => setShowMobileMenu(true)}>
                <Menu className="size-8 cursor-pointer dark:text-white md:hidden" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <CartDrawer show={showCartDrawer} onClose={() => setShowCartDrawer(false)} />
      <MobileMenuDrawer show={showMobileMenu} onClose={() => setShowMobileMenu(false)} />
      <DeleteModal show={showLogoutModal} onClose={() => setShowLogoutModal(false)} onConfirm={logout} text="Are you sure want to logout ?" confirmText="logout" cancelText="cancel" />
    </>
  );
}
