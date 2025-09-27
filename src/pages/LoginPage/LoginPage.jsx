import { useState } from "react";

import { useNavigate } from "react-router";
import { useAuthContext } from "../../contexts/AuthContext/useAuthContext";
import { toast } from "sonner";
const intialState = { email: "", password: "" };

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading } = useAuthContext();
  const [form, setForm] = useState(intialState);
  const [errors, setErrors] = useState({});

  /*--------------- Functions & Handlers ---------------*/

  function validate() {
    const newErrors = {};
    setErrors({});

    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Email validation
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegEx.test(form.email)) {
      newErrors.email = "Email is not valid";
    }

    // password validation
    if (!form.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  }

  function clearForm() {
    setForm(intialState);
    setErrors({});
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      const resp = await login(form); // login async
      toast.success("Login successfully!", {
        classNames: {
          toast: "dark:bg-suface-dark! dark:border-slate-800! dark:text-white!",
        },
        duration: 1500,
      });

      clearForm();

      // هدایت مستقیم بعد از login و ست شدن user در context
      if (resp.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error("Login failed", {
        classNames: {
          toast: "dark:bg-suface-dark! dark:border-slate-800! dark:text-white!",
        },
      });
    }
  }

  return (
    <div className="h-screen bg-white dark:bg-app-dark flex justify-center items-center">
      <div className="p-6 bg-slate-50 w-110 border border-slate-200 rounded-lg dark:bg-suface-dark dark:border-slate-800">
        <h5 className="text-xl font-bold text-center dark:text-white">Login</h5>
        <div className="mt-4 flex justify-center  "></div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3.5">
            <label htmlFor="email">
              <p className="text-slate-600 capitalize text-sm dark:text-muted-dark">email</p>
              <input
                id="email"
                type="email"
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="mt-2.5 w-full border border-slate-200 bg-white py-2 px-6 rounded-lg outline-none focus:ring  focus:ring-brand transition-all dark:bg-app-dark dark:border-slate-800 dark:text-white"
              />
            </label>

            <span className="text-xs text-red-500 font-bold dark:text-red-800">{errors.email}</span>

            <label htmlFor="password">
              <p className="text-slate-600 capitalize text-sm dark:text-muted-dark">password</p>
              <input
                id="password"
                type="password"
                autoComplete="true"
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="mt-2.5 w-full border border-slate-200 bg-white py-2 px-6 rounded-lg outline-none focus:ring  focus:ring-brand transition-all dark:bg-app-dark dark:border-slate-800 dark:text-white"
              />
            </label>

            <span className="text-xs text-red-500 font-bold dark:text-red-800">{errors.password}</span>
          </div>

          {/* به جای این باید یه نوتیف نمایش بدیم */}
          {/* <span className="text-xs text-red-500 font-bold dark:text-red-800">{loginError}</span> */}

          <button className="flex items-center justify-center gap-3 w-full mt-8 bg-brand text-white rounded-lg py-3 px-6 cursor-pointer hover:bg-indigo-500 transition-colors " type="submit">
            {loading && <span className="block size-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>}
            {loading ? "loading..." : "sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
