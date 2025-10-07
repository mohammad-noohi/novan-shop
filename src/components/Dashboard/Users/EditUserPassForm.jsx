import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { BASE_API_URL } from "../../../../constants";

export default function EditUserPassForm({ selectedUser, fetchUsers, onCloseModal }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const [errors, setErrors] = useState("");

  function validateForm() {
    let newErrors = "";

    if (password !== repeatPassword) newErrors = "Both inputs must be the same";
    else if (password.length < 8 || repeatPassword.length < 8) newErrors = "Password must be at least 8 characters";

    setErrors(newErrors);

    return newErrors.length === 0;
  }

  function resetForm() {
    setPassword("");
    setRepeatPassword("");
    setShowPassword(false);
    setShowRepeatPassword(false);
    setErrors("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please check the error");
      return;
    }

    try {
      const resp = await fetch(`${BASE_API_URL}/users/${selectedUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });

      if (!resp.ok) throw new Error("Failed to change password");

      toast.success("Password changed successfully");
      await fetchUsers();
      resetForm();
      onCloseModal();
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  }

  return (
    <div className="bg-white dark:bg-suface-dark border border-slate-200 dark:border-slate-800 p-5 rounded-lg max-w-5xl w-full">
      <h4 className="text-xl font-semibold capitalize">Change User Password</h4>
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          {/* Password */}
          <div>
            <span>Password</span>
            <div className="border focus-within:ring-1 transition-all flex items-center p-1 pr-3 rounded-lg">
              <Input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                className="pr-4 border-0 shadow-none focus-visible:ring-0"
              />
              {showPassword ? (
                <EyeOff className="text-gray-500 cursor-pointer" onClick={() => setShowPassword(false)} />
              ) : (
                <Eye className="text-gray-500 cursor-pointer" onClick={() => setShowPassword(true)} />
              )}
            </div>
          </div>

          {/* Repeat Password */}
          <div>
            <span>Repeat Password</span>
            <div className="border focus-within:ring-1 transition-all flex items-center p-1 pr-3 rounded-lg">
              <Input
                value={repeatPassword}
                onChange={e => setRepeatPassword(e.target.value)}
                type={showRepeatPassword ? "text" : "password"}
                placeholder="Repeat new password"
                className="pr-4 border-0 shadow-none focus-visible:ring-0"
              />
              {showRepeatPassword ? (
                <EyeOff className="text-gray-500 cursor-pointer" onClick={() => setShowRepeatPassword(false)} />
              ) : (
                <Eye className="text-gray-500 cursor-pointer" onClick={() => setShowRepeatPassword(true)} />
              )}
            </div>
          </div>
        </div>

        {errors && <p className="mt-5 text-sm text-red-500">{errors}</p>}

        <button type="submit" className="py-1 px-4 mt-5 bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg text-lg capitalize cursor-pointer hover:bg-slate-300 transition-colors">
          Change Password
        </button>
      </form>
    </div>
  );
}
