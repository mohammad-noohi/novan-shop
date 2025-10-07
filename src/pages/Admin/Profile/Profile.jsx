import { BASE_API_URL } from "../../../../constants";
import DeleteModal from "@/components/DeleteModal";
import { useAuthContext } from "@/contexts/AuthContext/useAuthContext";
import { LogOut, Mail, Info, FileInputIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { AnimatePresence, motion } from "motion/react"; // eslint-disable-line

import ProfileSkeleton from "@/components/Dashboard/Profile/ProfileSkeleton";

export default function Profile() {
  const [loadingPage, setLoadingPage] = useState(true);
  const { user, logout, setUser } = useAuthContext();
  const [showLogOutModal, setShowLogOutModal] = useState(false);
  const [preview, setPreview] = useState("");
  const [editForm, setEditForm] = useState({
    loading: false,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    profile: null,
  });

  const [editFormErrors, setEditFormErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    profile: "",
  });

  const fileInputRef = useRef(null);

  function handleProfileChange(e) {
    const f = e.target.files[0];
    if (!f) return;

    // validate file before convert
    const validTypes = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(f.type)) {
      setEditFormErrors(prev => ({ ...prev, profile: "File must be JPG/JPEG or PNG" }));
      return;
    }

    if (f.size > 5 * 1024 * 1024) {
      setEditFormErrors(prev => ({ ...prev, profile: "File must be less thant 5MB" }));
      return;
    }

    // Because I use json-server must convert the file to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      // reader.result => base64 string
      setEditForm(prev => ({ ...prev, profile: reader.result }));
      setPreview(reader.result);
    };
    reader.readAsDataURL(f);
  }

  function handleRemoveImage() {
    setEditForm(prev => ({ ...prev, profile: null }));
    setPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function validateEditForm() {
    let errors = {};
    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!editForm.firstname.trim()) errors.firstname = "Firstname can't be empty";
    if (!editForm.lastname.trim()) errors.lastname = "Lastname can't be empty";
    if (!editForm.email.trim()) errors.email = "Email can't be empty";
    if (!emailRegEx.test(editForm.email)) errors.email = "Email is not valid";

    // Beacuse i use base64 format for file so for image validation we must validate the file before convert to base64 not here but in real project validate it here.
    setEditFormErrors(errors);

    return Object.values(errors).length === 0; // form is valid
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const isFormValid = validateEditForm();
    if (!isFormValid) {
      toast.error("Please check the errors");
      return;
    }

    const newInfo = {};

    if (editForm.firstname !== user.firstname) newInfo.firstname = editForm.firstname;
    if (editForm.lastname !== user.lastname) newInfo.lastname = editForm.lastname;
    if (editForm.email !== user.email) newInfo.email = editForm.email;
    if (editForm.profile) newInfo.profile = editForm.profile;

    // If user don't change any inputs so don't do anything.
    if (Object.keys(newInfo).length === 0) {
      toast.info("There are no changes, everything is the same as before.");
      return;
    }

    try {
      setEditForm(prev => ({ ...prev, loading: true }));
      const resp = await fetch(`${BASE_API_URL}/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInfo),
      });

      if (!resp.ok) throw new Error("faild to change user info");

      const updatedUser = await resp.json();
      setUser(updatedUser);

      // reset form with new updated user
      setEditForm({
        loading: false,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        email: updatedUser.email,
        profile: updatedUser.profile || null,
      });

      // setPreview(updatedUser.profile || null);

      setEditFormErrors({
        firstname: "",
        lastname: "",
        email: "",
        profile: "",
      });

      if (fileInputRef.current) fileInputRef.current.value = "";

      toast.success("User info changed successfully");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setEditForm(prev => ({ ...prev, loading: false }));
    }
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        setLoadingPage(false);
      }, 1000);
    }
  }, []);

  if (loadingPage) {
    return <ProfileSkeleton />;
  } else {
    return (
      <>
        <div className="p-5 bg-slate-100 dark:bg-app-dark min-h-screen">
          {/* Profile */}
          <div className=" rounded-lg bg-white dark:bg-suface-dark dark:border-slate-800 border border-slate-200 p-10 flex flex-col justify-center">
            <div className="flex flex-col md:flex-row text-center md:text-left items-center gap-10 ">
              {/* Admin Avatar */}
              <div className="border relative size-50 rounded-full ring-4 ring-offset-4 ring-slate-200 dark:ring-slate-600 dark:ring-offset-app-dark shrink-0">
                <img src={`/${user.profile}`} alt="profile image" className="size-full rounded-full" />

                {/* Logout Button */}
                <button
                  onClick={() => setShowLogOutModal(true)}
                  className="absolute bottom-0 right-0 group flex items-center w-10 lg:hover:w-28 lg:hover:text-red-500 transition-all duration-300 overflow-hidden rounded-full bg-white dark:bg-suface-dark dark:border-slate-800  border p-2 cursor-pointer">
                  <LogOut className="size-6 shrink-0" />
                  <span className="ml-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">Logout</span>
                </button>
              </div>
              <div>
                <h1 className="text-4xl font-bold capitalize">
                  {user.firstname} {user.lastname}
                </h1>
                <p className="text-2xl text-slate-600 dark:text-slate-500">{user.username}</p>
                <p className="text-slate-600 dark:text-slate-500">{user.email}</p>
                <p className=" uppercase mt-5 font-semibold py-1 px-3 inline-block rounded-full bg-slate-200 dark:bg-slate-700">{user.role}</p>
              </div>
            </div>
          </div>

          <div className="bg-white  rounded-lg  border border-slate-200 mt-5 dark:bg-suface-dark dark:border-slate-800">
            <div className="border-b p-5 border-slate-200 dark:border-slate-800">
              <h4 className="text-2xl capitalize">Edit Info</h4>
            </div>
            <div className="p-5">
              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  {/* firstname input */}
                  <div>
                    <label htmlFor="firstname" className="font-semibold capitalize">
                      firstname
                    </label>
                    <Input
                      value={editForm.firstname}
                      onChange={e => setEditForm(prev => ({ ...prev, firstname: e.target.value }))}
                      type="text"
                      id="firstname"
                      className="border w-full text-lg h-12 rounded-lg mt-2"
                      placeholder="John"
                    />
                    {editFormErrors.firstname && <p className="mt-1 text-red-500">{editFormErrors.firstname}</p>}
                  </div>
                  {/* lastname input */}
                  <div>
                    <label htmlFor="lastname" className="font-semibold capitalize">
                      lastname
                    </label>
                    <Input
                      value={editForm.lastname}
                      onChange={e => setEditForm(prev => ({ ...prev, lastname: e.target.value }))}
                      type="text"
                      id="lastname"
                      className="border w-full text-lg h-12 rounded-lg mt-2"
                      placeholder="Doe"
                    />
                    {editFormErrors.lastname && <p className="mt-1 text-red-500">{editFormErrors.lastname}</p>}
                  </div>
                  {/* email input */}
                  <div>
                    <label htmlFor="email" className="font-semibold capitalize">
                      email
                    </label>
                    <Input
                      value={editForm.email}
                      onChange={e => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                      type="email"
                      id="email"
                      className="border w-full text-lg  h-12 rounded-lg mt-2"
                      placeholder="example@gmail.com"
                    />
                    {editFormErrors.email && <p className="mt-1 text-red-500">{editFormErrors.email}</p>}
                  </div>
                  {/* file image input */}
                  <div>
                    <label htmlFor="profile" className="font-semibold capitalize">
                      profile ( optional )
                    </label>
                    {/* ---------------------- */}
                    <Input ref={fileInputRef} type="file" onChange={handleProfileChange} id="profile" className="border w-full text-lg h-12 rounded-lg mt-2" />

                    <AnimatePresence>
                      {preview && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                          <div className="size-50 overflow-hidden border rounded-lg p-2 mt-5">
                            <img className="w-full h-full rounded-lg" src={preview} alt="new profile preview" />
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="mt-2 py-1 sm:w-auto px-4 text-lg capitalize rounded-lg bg-slate-200 hover:bg-slate-300 transition-colors cursor-pointer dark:bg-slate-700 dark:hover:bg-slate-600">
                            remove image
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* ---------------------- */}
                    {editFormErrors.profile && <p className="mt-1 text-red-500">{editFormErrors.profile}</p>}
                  </div>

                  <button className="py-1 w-full sm:w-auto px-4 text-lg capitalize rounded-lg bg-slate-200 hover:bg-slate-300 transition-colors cursor-pointer dark:bg-slate-700 dark:hover:bg-slate-600">
                    {editForm.loading ? "editing..." : "save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <DeleteModal show={showLogOutModal} onConfirm={logout} onClose={() => setShowLogOutModal(false)} text="are you sure want to logout ?" confirmText="logout" cancelText="stay in" />
      </>
    );
  }
}
