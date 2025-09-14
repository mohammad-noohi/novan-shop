import { Link } from "react-router";
import { Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white transition-all border-b border-slate-200 py-3 px-6 flex items-center justify-between">
      <div>
        <Link to="/">
          <h1 className="text-2xl">Novan</h1>
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <button className="cursor-pointer">
          <Bell />
        </button>
        <span>profile</span>
      </div>
    </header>
  );
}
