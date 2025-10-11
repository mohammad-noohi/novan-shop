import { BASE_API_URL } from "../../../../constants";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function EditUserForm({ users, selectedUser, fetchUsers, onCloseModal }) {
  const roleItems = ["user", "admin"];
  const [form, setForm] = useState({
    firstname: selectedUser.firstname,
    lastname: selectedUser.lastname,
    email: selectedUser.email,
    username: selectedUser.username,
    role: selectedUser.role,
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    role: "",
  });

  function validateForm() {
    const newErrors = {};

    const isEmailExist = users.some(user => user.email === form.email);
    const isUsernameExist = users.some(user => user.username === form.username);

    if (!form.firstname) newErrors.firstname = "Firstname is required";
    if (!form.lastname) newErrors.lastname = "Lastname is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!emailRegEx.test(form.email)) newErrors.email = "Email is not valid";

    if (form.email !== selectedUser.email) {
      // new email
      if (isEmailExist) newErrors.email = "The email is duplicate try a uniqe one";
    }
    if (!form.username) newErrors.username = "Username is required";
    if (form.username !== selectedUser.username) {
      // new username
      if (isUsernameExist) newErrors.username = "The username is duplicate try a uniqe one";
    }
    if (form.role === "none") newErrors.role = "Role is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // ture , false
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const isFormValid = validateForm();

    if (!isFormValid) {
      toast.error("Please check the errors");
    } else {
      const newUserData = {};
      if (form.firstname !== selectedUser.firstname) newUserData.firstname = form.firstname;
      if (form.lastname !== selectedUser.lastname) newUserData.lastname = form.lastname;
      if (form.email !== selectedUser.email) newUserData.email = form.email;
      if (form.username !== selectedUser.username) newUserData.username = form.username;
      if (form.role !== selectedUser.role) newUserData.role = form.role;

      if (Object.keys(newUserData).length === 0) {
        toast.info("There are no changes.");
        return;
      }

      await editUser(newUserData);
      await fetchUsers();
      onCloseModal();
    }
  }

  async function editUser(newUserData) {
    try {
      const resp = await fetch(`${BASE_API_URL}/users/${selectedUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserData),
      });

      if (!resp.ok) throw new Error("Failed to change user info");
      toast.success("User edit successfully");
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="bg-white dark:bg-suface-dark border border-slate-200 dark:border-slate-800 p-5 rounded-lg max-w-4xl w-full min-w-[250px]">
      <h4 className="text-xl font-semibold capitalize">Edit user</h4>
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          <div>
            <span>Firstname</span>
            <Input value={form.firstname} onChange={e => setForm(prev => ({ ...prev, firstname: e.target.value }))} type="text" placeholder="new firstname" />
            {errors.firstname && <span className="mt-2 block text-sm text-red-500">{errors.firstname}</span>}
          </div>
          <div>
            <span>Lastname</span>
            <Input value={form.lastname} onChange={e => setForm(prev => ({ ...prev, lastname: e.target.value }))} type="text" placeholder="new lastname" />
            {errors.lastname && <span className="mt-2 block text-sm text-red-500">{errors.lastname}</span>}
          </div>
          <div>
            <span>Email</span>
            <Input value={form.email} onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))} type="text" placeholder="new email" />
            {errors.email && <span className="mt-2 block text-sm text-red-500">{errors.email}</span>}
          </div>
          <div>
            <span>Username</span>
            <Input value={form.username} onChange={e => setForm(prev => ({ ...prev, username: e.target.value }))} type="text" placeholder="new username" />
            {errors.username && <span className="mt-2 block text-sm text-red-500">{errors.username}</span>}
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
            {errors.role && <span className="mt-2 block text-sm text-red-500">{errors.role}</span>}
          </div>
        </div>

        <button type="submit" className="py-1 px-4 mt-5 bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg text-lg capitalize cursor-pointer hover:bg-slate-300  transition-colors">
          edit
        </button>
      </form>
    </div>
  );
}
