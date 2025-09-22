import { Link } from "react-router";
import { Bell, LogOut, Pencil, Moon } from "lucide-react";
import { useAuthContext } from "../../contexts/AuthContext/useAuthContext";
import { useThemeContext } from "../../contexts/ThemeContext/useThemeContext";
import { ProfileDropdown } from "./ProfileDropdown";

export default function Header() {
  const { user, logout } = useAuthContext();
  const { toggleTheme } = useThemeContext();

  return (
    <>
      <header className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3 transition-all">
        <div>
          <Link to="/">
            <h1 className="text-2xl">Novan</h1>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {user && <ProfileDropdown />}
          <button onClick={toggleTheme} className="flex cursor-pointer items-center justify-center">
            <Moon />
          </button>
        </div>
      </header>
    </>
  );
}
