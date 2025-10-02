import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function EditUserPassForm({ selectedUser, fetchUsers, onCloseModal }) {
  const [form, setForm] = useState({
    password: {
      value: "",
      show: false,
    },
    repeatPassword: {
      value: "",
      show: false,
    },
  });

  const [errors, setErrors] = useState("");

  function validateForm() {
    let newErrors = "";

    if (form.password.value !== form.repeatPassword.value) newErrors = "both input must be as the same";

    if (form.password.value.length < 8 || form.repeatPassword.value.length < 8) newErrors = "Password must be atleast 8 characters";

    setErrors(newErrors);

    return newErrors.length === 0;
  }

  function resetForm() {
    setForm({
      password: {
        value: "",
        show: false,
      },
      repeatPassword: {
        value: "",
        show: false,
      },
    });

    setErrors("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const isFormValid = validateForm();
    if (!isFormValid) {
      toast.error("Please check the error");
    } else {
      await changePassword();
      await fetchUsers();
      resetForm();
      onCloseModal();
      // close the modal
    }
  }

  async function changePassword() {
    try {
      const resp = await fetch(`http://localhost:3000/users/${selectedUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: form.password.value.trim() }),
      });

      if (!resp.ok) throw new Error("Failed to change password");
      toast.success("password change successfully");
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  }

  return (
    <div className="bg-white dark:bg-suface-dark border border-slate-200 dark:border-slate-800 p-5 rounded-lg max-w-4xl w-full min-w-[250px]">
      <h4 className="text-xl font-semibold capitalize">change user password</h4>
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="grid grid-cols-1 gap-3">
          <div>
            <span>Password</span>
            <div className=" border focus-within:ring-1 transition-all flex items-center p-1 pr-3 rounded-lg">
              <Input
                value={form.password.value}
                onChange={e => setForm(prev => ({ ...prev, password: { ...prev, value: e.target.value } }))}
                className="pr-4 border-0  shadow-none focus-visible:ring-0"
                type={form.password.show ? "text" : "password"}
                placeholder="new password"
              />
              <Eye className=" text-gray-500 cursor-pointer" onClick={() => setForm(prev => ({ ...prev, password: { ...prev, show: !prev.password.show } }))} />
            </div>
          </div>

          <div>
            <span>Repeat Password</span>
            <div className=" border focus-within:ring-1 transition-all flex items-center p-1 pr-3 rounded-lg">
              <Input
                value={form.repeatPassword.value}
                onChange={e => setForm(prev => ({ ...prev, repeatPassword: { ...prev, value: e.target.value } }))}
                className="pr-4 border-0  shadow-none focus-visible:ring-0"
                type={form.repeatPassword.show ? "text" : "password"}
                placeholder="repeat new password"
              />
              <Eye className=" text-gray-500 cursor-pointer" onClick={() => setForm(prev => ({ ...prev, repeatPassword: { ...prev.repeatPassword, show: !prev.repeatPassword.show } }))} />
            </div>
          </div>
        </div>

        {errors.length ? <p className="mt-5 text-sm text-red-500">{errors}</p> : null}

        <button type="submit" className="py-1 px-4 mt-5 bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg text-lg capitalize cursor-pointer hover:bg-slate-300  transition-colors">
          change password
        </button>
      </form>
    </div>
  );
}
