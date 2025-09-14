import { Link } from "react-router";
import { Bell, LogOut, Pencil, Moon } from "lucide-react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Avatar } from "@heroui/react";
import { useAuthContext } from "../../contexts/AuthContext/useAuthContext";

export default function Header() {
  const { user, logout } = useAuthContext();

  return (
    <header className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3 transition-all">
      <div>
        <Link to="/">
          <h1 className="text-2xl">Novan</h1>
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex cursor-pointer items-center justify-center">
          <Moon />
        </button>

        <Dropdown>
          <DropdownTrigger>
            <Button disableRipple isIconOnly className="bg-transparent">
              <Bell />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
              Delete file
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* profile dropdown */}
        <Dropdown>
          <DropdownTrigger>
            <Button disableRipple className="hover:opacity-100! bg-transparent text-black">
              <div className="flex items-center gap-3">
                <div>
                  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                </div>
                <div className="text-start">
                  <p className="capitalize">
                    {user.firstname} {user.lastname}
                  </p>
                  <p className="text-slate-600">{user.role}</p>
                </div>
              </div>
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Static Actions"
            onAction={key => {
              if (key === "logout") {
                logout();
              }
            }}>
            <DropdownItem key="edit" href="profile" startContent={<Pencil className="size-4" />}>
              Edit Profile
            </DropdownItem>
            <DropdownItem key="logout" className="text-danger" color="danger" startContent={<LogOut className="size-4" />}>
              logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  );
}
