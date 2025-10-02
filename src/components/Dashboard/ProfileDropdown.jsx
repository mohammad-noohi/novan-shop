import { Button } from "@/components/ui/button";
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
import { Link } from "react-router";
import { Pen, LogOut } from "lucide-react";
import DeleteModal from "../DeleteModal";
import { useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext/useAuthContext";

export function ProfileDropdown() {
  const { logout, user } = useAuthContext();
  const [showLogOutModal, setShowLogOutModal] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <div className="size-10 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden ring-2 ring-offset-2 ring-slate-400 dark:ring-slate-700 dark:ring-offset-app-dark">
              <img className="w-full h-full object-cover" src={`/${user.profile}`} alt="" />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>Hello , Mohammad Noohi</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link to="admin/profile" className="flex gap-3 w-full capitalize">
                <Pen className="size-4" />
                <span>edit profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowLogOutModal(true)} className="hover:bg-red-100">
              <div className="flex gap-3 capitalize text-red-500">
                <LogOut className="size-4" />
                <span>logout</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteModal show={showLogOutModal} onClose={() => setShowLogOutModal(false)} onConfirm={logout} text="want to loout ?" confirmText="logout" cancelText="stay in" />
    </>
  );
}
