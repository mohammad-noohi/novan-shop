import DeleteModal from "@/components/DeleteModal";
import { useAuthContext } from "@/contexts/AuthContext/useAuthContext";
import { LogOut, Mail, Info } from "lucide-react";
import { useState } from "react";

export default function Profile() {
  const { user, logout } = useAuthContext();
  const [showLogOutModal, setShowLogOutModal] = useState(false);

  return (
    <>
      <div className="p-5 bg-slate-100 min-h-screen">
        {/* Profile */}
        <div className=" rounded-lg bg-white border border-slate-200 p-10 flex flex-col justify-center">
          <div className="flex flex-col md:flex-row text-center md:text-left items-center gap-10 ">
            {/* Admin Avatar */}
            <div className="border relative size-50 rounded-full ring-4 ring-offset-4 ring-slate-200 shrink-0">
              <img src="/images/mohammad-noohi.jpeg" alt="profile image" className="size-full rounded-full" />

              {/* Logout Button */}
              <button
                onClick={() => setShowLogOutModal(true)}
                className="absolute bottom-0 right-0 group flex items-center w-10 lg:hover:w-28 lg:hover:text-red-500 transition-all duration-300 overflow-hidden rounded-full bg-white border p-2 cursor-pointer">
                <LogOut className="size-6 shrink-0" />
                <span className="ml-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">Logout</span>
              </button>
            </div>
            <div>
              <h1 className="text-4xl font-bold capitalize">
                {user.firstname} {user.lastname}
              </h1>
              <p className="text-2xl text-slate-600">{user.username}</p>
              <p className="text-lg uppercase mt-5 font-semibold ">{user.role}</p>
            </div>
          </div>
        </div>

        <div className="bg-white  rounded-lg  border border-slate-200 mt-5">
          <div className="border-b p-5 border-slate-200">
            <h4 className="text-2xl capitalize">Edit Info</h4>
          </div>
          <div className="p-5">
            <form action="">
              <div className="space-y-5">
                {/* firstname input */}
                <div>
                  <label htmlFor="firstname" className="font-semibold capitalize">
                    firstname
                  </label>
                  <input type="text" id="firstname" className="border w-full text-lg py-2 px-4 rounded-lg mt-2" placeholder="John" />
                </div>
                {/* lastname input */}
                <div>
                  <label htmlFor="lastname" className="font-semibold capitalize">
                    lastname
                  </label>
                  <input type="text" id="lastname" className="border w-full text-lg py-2 px-4 rounded-lg mt-2" placeholder="Doe" />
                </div>
                {/* email input */}
                <div>
                  <label htmlFor="email" className="font-semibold capitalize">
                    email
                  </label>
                  <input type="email" id="email" className="border w-full text-lg py-2 px-4 rounded-lg mt-2" placeholder="example@gmail.com" />
                </div>
                {/* file image input */}
                <div>
                  <label htmlFor="profile" className="font-semibold capitalize">
                    profile ( optional )
                  </label>
                  <input type="file" id="profile" className="border w-full text-lg py-2 px-4 rounded-lg mt-2" placeholder="example@gmail.com" />
                </div>

                <button className="py-1 w-full sm:w-auto px-4 text-lg capitalize rounded-lg bg-slate-200 hover:bg-slate-300 transition-colors cursor-pointer">submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <DeleteModal show={showLogOutModal} onConfirm={logout} onClose={() => setShowLogOutModal(false)} text="are you sure want to logout ?" confirmText="logout" cancelText="stay in" />
    </>
  );
}
