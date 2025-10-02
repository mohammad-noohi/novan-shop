import { useAuthContext } from "@/contexts/AuthContext/useAuthContext";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function AddUserForm({ users, fetchUsers }) {
  const { register } = useAuthContext();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    role: "none",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    role: "",
    password: "",
  });

  const roleItems = ["user", "admin"];

  function validateForm() {
    const newErrors = {};

    const isEmailExist = users.some(user => user.email === form.email);
    const isUsernameExist = users.some(user => user.username === form.username);

    if (!form.firstname) newErrors.firstname = "Firstname is required";
    if (!form.lastname) newErrors.lastname = "Lastname is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!emailRegEx.test(form.email)) newErrors.email = "Email is not valid";
    if (isEmailExist) newErrors.email = "The email is duplicate try a uniqe one";
    if (!form.username) newErrors.username = "Username is required";
    if (isUsernameExist) newErrors.username = "The username is duplicate try a uniqe one";
    if (form.role === "none") newErrors.role = "Role is required";
    if (!form.password) newErrors.password = "Password is required";
    if (form.password.length < 8) newErrors.password = "Password must be atleast 8 characters";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // ture , false
  }

  async function handleAddSubmit(e) {
    e.preventDefault();
    const isAddFormValid = validateForm();

    if (!isAddFormValid) {
      toast.error("Please check the errors");
      return;
    } else {
      await addUser();
      await fetchUsers();
      resetAddForm();
    }
  }

  async function addUser() {
    const newUser = {
      firstname: form.firstname,
      lastname: form.lastname,
      username: form.username,
      email: form.email,
      role: form.role,
      profile: "",
      password: form.password,
      usedDicounts: [],
      createdAt: new Date().toISOString(),
    };

    try {
      await register(newUser);
      toast.success("new user added successfully");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  function resetAddForm() {
    setForm({
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      role: "none",
      password: "",
    });

    setErrors({
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      role: "",
      password: "",
    });
  }

  return (
    <div className="bg-white dark:bg-suface-dark border border-slate-200 dark:border-slate-800 p-5 rounded-lg">
      <h4 className="text-xl font-semibold capitalize">add user</h4>
      <form onSubmit={handleAddSubmit} className="mt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div>
            <span>Firstname</span>
            <Input value={form.firstname} onChange={e => setForm(prev => ({ ...prev, firstname: e.target.value }))} type="text" placeholder="firstname" />
            {errors.firstname && <p className="mt-2 text-red-500 text-sm">{errors.firstname}</p>}
          </div>
          <div>
            <span>Lastname</span>
            <Input value={form.lastname} onChange={e => setForm(prev => ({ ...prev, lastname: e.target.value }))} type="text" placeholder="lastname" />
            {errors.lastname && <p className="mt-2 text-red-500 text-sm">{errors.lastname}</p>}
          </div>
          <div>
            <span>Email</span>
            <Input value={form.email} onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))} type="email" placeholder="email" />
            {errors.email && <p className="mt-2 text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <span>Username</span>
            <Input value={form.username} onChange={e => setForm(prev => ({ ...prev, username: e.target.value }))} type="text" placeholder="username" />
            {errors.username && <p className="mt-2 text-red-500 text-sm">{errors.username}</p>}
          </div>
          <div>
            <span>Role</span>
            <Select value={form.role} onValueChange={value => setForm(prev => ({ ...prev, role: value }))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select user role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  <SelectItem value="none">select user role</SelectItem>
                  {roleItems.map(role => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.role && <p className="mt-2 text-red-500 text-sm">{errors.role}</p>}
          </div>
          <div>
            <span>Password</span>
            <Input value={form.password} onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))} type="password" placeholder="password" />
            {errors.password && <p className="mt-2 text-red-500 text-sm">{errors.password}</p>}
          </div>
        </div>

        <button className="py-1 px-4 mt-5 bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg text-lg capitalize cursor-pointer hover:bg-slate-300  transition-colors">add user</button>
      </form>
    </div>
  );
}
