import { Link, NavLink } from "react-router";
import { useEffect, useState } from "react";
import { useThemeContext } from "../contexts/ThemeContext/useThemeContext";
import { useAuthContext } from "../contexts/AuthContext/useAuthContext";
import CartDrawer from "./CartDrawer";
import Overlay from "./Overlay";
import { useCartContext } from "../contexts/CartContext/useCartContext";
import MobileMenuDrawer from "./MobileMenuDrawer";
// icons
import { Sun, Moon, ShoppingBag, LogOut, Menu } from "lucide-react";

export default function Header() {
  const { cart } = useCartContext();
  const { user, logout } = useAuthContext();
  const { theme, toggleTheme } = useThemeContext();
  const [showCartDrawer, setShowCartDrawer] = useState(false); // handle show cart drawer
  const [showMobileMenu, setShowMobileMenu] = useState(true);
  /* Derived States */
  const cartItemsCount = cart.length;

  function closeAllDrawers() {
    setShowCartDrawer(false);
    setShowMobileMenu(false);
  }

  useEffect(() => {
    if (theme === "light") document.documentElement.classList.add("dark");
    if (theme === "dark") document.documentElement.classList.remove("dark");
  }, [theme]);

  return (
    <>
      <header className="bg-white border-b border-slate-200 py-3.5 dark:bg-app-dark dark:border-slate-800">
        <div className="container">
          <div className="flex items-center justify-between">
            {/* left header */}
            <nav className="flex items-center gap-5">
              {/* logo */}
              <Link to="/">
                <h1 className="text-2xl text-brand font-bold dark:text-indigo-500">Novan Shop</h1>
              </Link>
              {/* menu */}
              <ul className="hidden md:flex items-center gap-4">
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
              </ul>
            </nav>

            {/* right header */}
            <div className="flex items-center gap-3">
              {/* cart toggle */}
              {user !== null && (
                <div
                  className="relative bg-slate-50 size-10 cursor-pointer rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-800 dark:bg-suface-dark dark:text-white"
                  onClick={() => setShowCartDrawer(true)}>
                  <ShoppingBag className="size-4" />
                  <span className="flex absolute size-5  -translate-y-1/2 translate-x-1/2 rounded-full bg-brand text-white  justify-center items-center top-0 right-0 text-xs">{cartItemsCount}</span>
                </div>
              )}

              {/* theme toggle */}
              <div
                className="hidden  bg-slate-50 size-10 cursor-pointer rounded-full md:flex items-center justify-center border border-slate-200 dark:border-slate-800 dark:bg-suface-dark dark:text-white"
                onClick={toggleTheme}>
                {theme === "light" && <Sun className="size-4" />}
                {theme === "dark" && <Moon className="size-4" />}
              </div>

              {/* login & register buttons */}
              {user === null && (
                <div className="hidden md:flex items-center gap-3">
                  <Link to="/login" className=" bg-brand border border-brand dark:border-indigo-500 text-slate-50 py-1 px-5 rounded-lg capitalize  cursor-pointer dark:bg-indigo-500">
                    login
                  </Link>
                  <Link
                    to="/register"
                    className=" bg-slate-50  text-brand py-1 px-5 rounded-lg capitalize cursor-pointer dark:bg-suface-dark dark:text-indigo-500 border border-slate-200 dark:border-slate-800">
                    register
                  </Link>
                </div>
              )}

              {/* user profile */}
              {user !== null && (
                <>
                  <div className="hidden  bg-slate-50 py-1 px-4 md:flex items-center gap-3 rounded-lg dark:bg-suface-dark dark:text-muted-dark border border-slate-200 dark:border-slate-800">
                    <p>
                      <span>welcome, </span>
                      <span>{user.firstname}</span>
                    </p>
                  </div>

                  <div
                    onClick={() => logout()}
                    className="hidden bg-slate-50 size-10 md:flex items-center justify-center rounded-full dark:bg-suface-dark dark:text-muted-dark border border-slate-200 dark:border-slate-800 cursor-pointer">
                    <LogOut className="size-4" />
                  </div>
                </>
              )}

              <button onClick={() => setShowMobileMenu(true)}>
                <Menu className="md:hidden size-8 cursor-pointer dark:text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <CartDrawer show={showCartDrawer} onClose={() => setShowCartDrawer(false)} />
      <Overlay show={showCartDrawer || showMobileMenu} onClose={closeAllDrawers} />
      <MobileMenuDrawer show={showMobileMenu} onClose={() => setShowMobileMenu(false)} />
    </>
  );
}
