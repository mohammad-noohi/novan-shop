import { Link, NavLink } from "react-router";
import { useEffect } from "react";
// icons
import { FiSun } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";
import { FiShoppingBag } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { useThemeContext } from "../contexts/ThemeContext/useThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useThemeContext();

  useEffect(() => {
    if (theme === "light") document.documentElement.classList.add("dark");
    if (theme === "dark") document.documentElement.classList.remove("dark");
  }, [theme]);

  return (
    <header className="bg-white border-b border-slate-200 py-3.5 dark:bg-app-dark dark:border-slate-800">
      <div className="container">
        <div className="flex items-center justify-between">
          {/* left header */}
          <nav className="flex items-center gap-5">
            {/* logo */}
            <Link to="/">
              <h1 className="text-2xl text-brand font-bold dark:text-indigo-500">Novan Shop</h1>
            </Link>
            <ul className="flex items-center gap-4">
              <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? "text-brand dark:text-indigo-500" : "capitalize dark:text-white")}>
                  products
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart" className={({ isActive }) => (isActive ? "text-brand dark:text-indigo-500" : "capitalize dark:text-white")}>
                  cart
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* right header */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {/* cart toggle */}
              <div className="relative bg-slate-50 size-10 cursor-pointer rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-800 dark:bg-suface-dark dark:text-white">
                <FiShoppingBag className="size-4" />
                <span className="flex absolute size-5  -translate-y-1/2 translate-x-1/2 rounded-full bg-brand text-white  justify-center items-center top-0 right-0 text-xs">3</span>
              </div>
              {/* theme toggle */}
              <div
                className="bg-slate-50 size-10 cursor-pointer rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-800 dark:bg-suface-dark dark:text-white"
                onClick={toggleTheme}>
                {theme === "light" && <FiSun className="size-4" />}
                {theme === "dark" && <FiMoon className="size-4" />}
              </div>
            </div>

            {/* login & register buttons */}
            <div className="flex items-center gap-3">
              <Link to="/login" className=" bg-brand border border-brand dark:border-indigo-500 text-slate-50 py-1 px-5 rounded-lg capitalize  cursor-pointer dark:bg-indigo-500">
                login
              </Link>
              <Link
                to="/register"
                className=" bg-slate-50  text-brand py-1 px-5 rounded-lg capitalize cursor-pointer dark:bg-suface-dark dark:text-indigo-500 border border-slate-200 dark:border-slate-800">
                register
              </Link>
            </div>

            {/* user info */}
            <div className="bg-slate-50 py-1 px-4 flex items-center gap-3 rounded-lg dark:bg-suface-dark dark:text-muted-dark border border-slate-200 dark:border-slate-800">
              <p>
                <span>welcome, </span>
                <span>Mohammad</span>
              </p>
            </div>
            {/* logout button */}
            <div className=" bg-slate-50 size-10 flex items-center justify-center rounded-full dark:bg-suface-dark dark:text-muted-dark border border-slate-200 dark:border-slate-800 cursor-pointer">
              <FiLogOut className="size-4" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
