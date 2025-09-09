import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuthContext } from "../../contexts/AuthContext/useAuthContext";
import Loader from "../../components/Loader";
import { toast } from "sonner";

/* Icons */
import { Circle, CircleCheckBig, CircleX } from "lucide-react";

const intialState = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
};

const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, loading } = useAuthContext();
  const [form, setForm] = useState(intialState);
  const [errors, setErrors] = useState({});
  const [passwordRules, setPasswordRules] = useState({
    hasUppercase: null,
    hasLowercase: null,
    hasNumber: null,
    minLength: null,
  });

  /* Functions & Handlers */

  function validateForm(e) {
    const { name, value } = e.target;

    setErrors(prev => {
      const newErrors = { ...prev };

      if (name === "firstname") {
        if (!value.trim()) {
          newErrors.firstname = "Firstname is required";
        } else {
          delete newErrors.firstname;
        }
      }

      if (name === "lastname") {
        if (!value.trim()) {
          newErrors.lastname = "Lastname is required";
        } else {
          delete newErrors.lastname;
        }
      }

      if (name === "username") {
        if (!value.trim()) {
          newErrors.username = "Username is required";
        } else {
          delete newErrors.username;
        }
      }

      if (name === "email") {
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (!emailRegEx.test(value)) {
          newErrors.email = "Email is not valid";
        } else {
          delete newErrors.email;
        }
      }

      return newErrors;
    });
  }

  function isFormValid() {
    // all inputs must be filled
    if (!form.firstname || !form.lastname || !form.username || !form.email) {
      return false;
    }

    // email must be valid
    if (!emailRegEx.test(form.email)) {
      return false;
    }

    const passIsValid = Object.values(passwordRules).every(rule => rule === true);
    if (!passIsValid) return false;

    return true;
  }

  function handlePasswordChange(e) {
    const value = e.target.value;
    setForm(prev => ({ ...prev, password: value }));

    setPasswordRules({
      minLength: value.length >= 8 ? true : value.length > 0 ? false : null,
      hasUppercase: /[A-Z]/.test(value) ? true : value.length > 0 ? false : null,
      hasLowercase: /[a-z]/.test(value) ? true : value.length > 0 ? false : null,
      hasNumber: /\d/.test(value) ? true : value.length > 0 ? false : null,
    });
  }

  function clearForm() {
    setForm(intialState);
    setPasswordRules({
      hasUppercase: null,
      hasLowercase: null,
      hasNumber: null,
      minLength: null,
    });
    setErrors({});
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error("form inputs are not valid", {
        classNames: {
          toast: "border-red-500! dark:border-red-600! dark:bg-app-dark!",
          title: "text-red-500! dark:text-red-600!",
        },
      });
      return;
    }

    const userData = { ...form, role: "user", usedDiscounts: [] };

    toast.promise(register(userData), {
      success: () => ({
        message: "register successfully",
        classNames: {
          toast: "border-green-500! dark:border-green-600! dark:bg-app-dark!",
          title: "text-green-500! dark:text-green-600!",
        },
        onAutoClose: () => {
          clearForm();
          navigate("/");
        },
        duration: 1000,
      }),
      error: () => ({
        message: "login failed",
        classNames: {
          toast: "border-red-500! dark:border-red-600! dark:bg-app-dark!",
          title: "text-red-500! dark:text-red-600!",
        },
      }),
    });
  }

  return (
    <div className="min-h-screen py-6 bg-white dark:bg-app-dark flex justify-center items-center">
      <div className="p-6 bg-slate-50 w-110 border border-slate-200 rounded-lg dark:bg-suface-dark dark:border-slate-800">
        <h5 className="text-xl font-bold text-center dark:text-white">Registeration</h5>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3.5">
            <label htmlFor="firstname">
              <p className="text-slate-600 capitalize text-sm dark:text-muted-dark">firstname</p>
              <input
                onChange={e => setForm({ ...form, firstname: e.target.value })}
                id="firstname"
                value={form.firstname}
                type="text"
                name="firstname"
                onBlur={validateForm}
                className="mt-2.5 w-full border border-slate-200 bg-white py-2 px-6 rounded-lg outline-none focus:ring  focus:ring-brand transition-all dark:bg-app-dark dark:border-slate-800 dark:text-white"
              />
            </label>
            {errors.firstname && <p className="text-red-500 dark:text-red-800 text-sm">{errors.firstname}</p>}

            <label htmlFor="lastname">
              <p className="text-slate-600 capitalize text-sm dark:text-muted-dark">lastname</p>
              <input
                value={form.lastname}
                onChange={e => setForm({ ...form, lastname: e.target.value })}
                id="lastname"
                type="text"
                name="lastname"
                onBlur={validateForm}
                className="mt-2.5 w-full border border-slate-200 bg-white py-2 px-6 rounded-lg outline-none focus:ring  focus:ring-brand transition-all  dark:bg-app-dark dark:border-slate-800 dark:text-white"
              />
            </label>

            {errors.lastname && <p className="text-red-500 dark:text-red-800 text-sm">{errors.lastname}</p>}

            <label htmlFor="username">
              <p className="text-slate-600 capitalize text-sm dark:text-muted-dark">username</p>
              <input
                onChange={e => setForm({ ...form, username: e.target.value })}
                id="username"
                value={form.username}
                type="text"
                name="username"
                onBlur={validateForm}
                className="mt-2.5 w-full border border-slate-200 bg-white py-2 px-6 rounded-lg outline-none focus:ring  focus:ring-brand transition-all  dark:bg-app-dark dark:border-slate-800 dark:text-white"
              />
            </label>

            {errors.username && <p className="text-red-500 dark:text-red-800 text-sm">{errors.username}</p>}

            <label htmlFor="email">
              <p className="text-slate-600 capitalize text-sm dark:text-muted-dark">email</p>
              <input
                onChange={e => setForm({ ...form, email: e.target.value })}
                id="email"
                type="email"
                value={form.email}
                name="email"
                onBlur={validateForm}
                className="mt-2.5 w-full border border-slate-200 bg-white py-2 px-6 rounded-lg outline-none focus:ring  focus:ring-brand transition-all  dark:bg-app-dark dark:border-slate-800 dark:text-white"
              />
            </label>

            {errors.email && <p className="text-red-500 dark:text-red-800 text-sm">{errors.email}</p>}

            <label htmlFor="password">
              <p className="text-slate-600 capitalize text-sm dark:text-muted-dark">password</p>
              <input
                onChange={handlePasswordChange}
                id="password"
                type="password"
                value={form.password}
                autoComplete="true"
                className="mt-2.5 w-full border border-slate-200 bg-white py-2 px-6 rounded-lg outline-none focus:ring  focus:ring-brand transition-all  dark:bg-app-dark dark:border-slate-800 dark:text-white"
              />
            </label>
            <ul className="  text-slate-600 dark:text-muted-dark">
              <li
                className={`flex items-center gap-2 ${passwordRules.minLength === true && "text-green-500 dark:text-green-600"} ${
                  passwordRules.minLength === false && "text-red-500 dark:text-red-800"
                }`}>
                {passwordRules.minLength === null && <Circle className="size-4" />}
                {passwordRules.minLength === true && <CircleCheckBig className="size-4" />}
                {passwordRules.minLength === false && <CircleX className="size-4" />}
                <span>at least 8 characters long</span>
              </li>
              <li
                className={`flex items-center gap-2 ${passwordRules.hasUppercase === true && "text-green-500 dark:text-green-600"} ${
                  passwordRules.hasUppercase === false && "text-red-500 dark:text-red-800"
                }`}>
                {passwordRules.hasUppercase === null && <Circle className="size-4" />}
                {passwordRules.hasUppercase === true && <CircleCheckBig className="size-4" />}
                {passwordRules.hasUppercase === false && <CircleX className="size-4" />}
                <span>at least one uppercase letter</span>
              </li>
              <li
                className={`flex items-center gap-2 ${passwordRules.hasLowercase === true && "text-green-500 dark:text-green-600"} ${
                  passwordRules.hasLowercase === false && "text-red-500 dark:text-red-800"
                }`}>
                {passwordRules.hasLowercase === null && <Circle className="size-4" />}
                {passwordRules.hasLowercase === true && <CircleCheckBig className="size-4" />}
                {passwordRules.hasLowercase === false && <CircleX className="size-4" />}
                <span>at least one lowercase letter</span>
              </li>
              <li
                className={`flex items-center gap-2 ${passwordRules.hasNumber === true && "text-green-500 dark:text-green-600"} ${
                  passwordRules.hasNumber === false && "text-red-500 dark:text-red-800"
                }`}>
                {passwordRules.hasNumber === null && <Circle className="size-4" />}
                {passwordRules.hasNumber === true && <CircleCheckBig className="size-4" />}
                {passwordRules.hasNumber === false && <CircleX className="size-4" />}
                <span>at least one number</span>
              </li>
            </ul>
          </div>

          <button className="flex items-center justify-center gap-3 w-full mt-8 bg-brand text-white rounded-lg py-3 px-6 cursor-pointer hover:bg-indigo-500 transition-colors" type="submit">
            {loading && <span className="block size-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>}
            {loading ? "loading..." : "sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}
