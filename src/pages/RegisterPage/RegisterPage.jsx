import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../contexts/AuthContext/useAuthContext";
import { toast } from "sonner";
import { EMAIL_REGEX, BASE_API_URL } from "../../../constants";
import { Circle, CircleCheckBig, CircleX } from "lucide-react";

const initialForm = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, loading, login } = useAuthContext();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [passwordRules, setPasswordRules] = useState({
    hasUppercase: null,
    hasLowercase: null,
    hasNumber: null,
    minLength: null,
  });

  /*--------- Functions ------------*/

  // validate each field on onBlur event
  function validateField(name, value) {
    const trimmed = value.trim();
    let message = "";

    if (name === "firstname" && !trimmed) message = "Firstname is required";
    if (name === "lastname" && !trimmed) message = "Lastname is required";

    if (name === "username") {
      if (!trimmed) message = "Username is required";
      else if (!/^[A-Za-z][A-Za-z0-9_]{2,19}$/.test(trimmed)) message = "Username must start with a letter and be 3-20 characters long";
      else if (users.some(u => u.username === trimmed)) message = "Username already taken, try another one";
    }

    if (name === "email") {
      if (!trimmed) message = "Email is required";
      else if (!EMAIL_REGEX.test(trimmed)) message = "Email is not valid";
      else if (users.some(u => u.email === trimmed)) message = "Email already taken, try another one";
    }

    setErrors(prev => ({ ...prev, [name]: message }));
  }

  // validate password on typing
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

  // validate all fields before sumbit
  function validateAll() {
    const newErrors = {};
    // firstname & lastname
    if (!form.firstname.trim()) newErrors.firstname = "Firstname is required";
    if (!form.lastname.trim()) newErrors.lastname = "Lastname is required";

    // username
    if (!form.username.trim()) newErrors.username = "Username is required";
    else if (!/^[A-Za-z][A-Za-z0-9_]{2,19}$/.test(form.username)) newErrors.username = "Username must start with a letter and be 3-20 characters long";
    else if (users.some(u => u.username === form.username)) newErrors.username = "Username already taken, try another one";

    // email
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!EMAIL_REGEX.test(form.email)) newErrors.email = "Email is not valid";
    else if (users.some(u => u.email === form.email)) newErrors.email = "Email already taken, try another one";

    setErrors(newErrors);

    // password rules
    const passIsValid = Object.values(passwordRules).every(rule => rule === true);

    return Object.keys(newErrors).length === 0 && passIsValid;
  }

  function clearForm() {
    setForm(initialForm);
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

    if (!validateAll()) {
      toast.error("Please fix the errors in the form", {
        classNames: {
          toast: "border-slate-200! dark:border-slate-800! dark:bg-app-dark!",
          title: "dark:text-white!",
        },
      });
      return;
    }

    const userData = { ...form, role: "user", usedDiscounts: [], createdAt: new Date().toISOString() };

    toast.promise(register(userData), {
      success: () => ({
        message: "Registered successfully",
        classNames: {
          toast: "border-green-500! dark:border-green-600! dark:bg-app-dark!",
          title: "dark:text-white!",
        },
        onAutoClose: () => {
          clearForm();
          login({ email: userData.email, password: userData.password });
          navigate("/");
        },
        duration: 1000,
      }),
      error: () => ({
        message: "Register failed",
        classNames: {
          toast: "border-red-500! dark:border-red-600! dark:bg-app-dark!",
          title: "dark:text-white!",
        },
      }),
    });
  }

  async function fetchUsers() {
    try {
      const resp = await fetch(`${BASE_API_URL}/users`);
      if (!resp.ok) throw new Error("Failed to fetch users");
      const data = await resp.json();
      setUsers(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  /*------------- JSX ------------*/
  return (
    <div className="min-h-screen py-6 bg-white dark:bg-app-dark flex justify-center items-center">
      <div className="p-6 bg-slate-50 w-110 border border-slate-200 rounded-lg dark:bg-suface-dark dark:border-slate-800">
        <h5 className="text-xl font-bold text-center dark:text-white">Registeration</h5>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3.5">
            {/* Firstname */}
            <label htmlFor="firstname">
              <p className="text-slate-600 capitalize text-sm dark:text-muted-dark">firstname</p>
              <input
                id="firstname"
                name="firstname"
                value={form.firstname}
                type="text"
                onChange={e => setForm(prev => ({ ...prev, firstname: e.target.value }))}
                onBlur={e => validateField("firstname", e.target.value)}
                className="mt-2.5 w-full border border-slate-200 bg-white py-2 px-6 rounded-lg outline-none focus:ring focus:ring-brand transition-all dark:bg-app-dark dark:border-slate-800 dark:text-white"
              />
            </label>
            {errors.firstname && <p className="text-red-500 dark:text-red-800 text-sm">{errors.firstname}</p>}

            {/* Lastname */}
            <label htmlFor="lastname">
              <p className="text-slate-600 capitalize text-sm dark:text-muted-dark">lastname</p>
              <input
                id="lastname"
                name="lastname"
                value={form.lastname}
                type="text"
                onChange={e => setForm(prev => ({ ...prev, lastname: e.target.value }))}
                onBlur={e => validateField("lastname", e.target.value)}
                className="mt-2.5 w-full border border-slate-200 bg-white py-2 px-6 rounded-lg outline-none focus:ring focus:ring-brand transition-all dark:bg-app-dark dark:border-slate-800 dark:text-white"
              />
            </label>
            {errors.lastname && <p className="text-red-500 dark:text-red-800 text-sm">{errors.lastname}</p>}

            {/* Username */}
            <label htmlFor="username">
              <p className="text-slate-600 capitalize text-sm dark:text-muted-dark">username</p>
              <input
                id="username"
                name="username"
                value={form.username}
                type="text"
                onChange={e => setForm(prev => ({ ...prev, username: e.target.value }))}
                onBlur={e => validateField("username", e.target.value)}
                className="mt-2.5 w-full border border-slate-200 bg-white py-2 px-6 rounded-lg outline-none focus:ring focus:ring-brand transition-all dark:bg-app-dark dark:border-slate-800 dark:text-white"
              />
            </label>
            {errors.username && <p className="text-red-500 dark:text-red-800 text-sm">{errors.username}</p>}

            {/* Email */}
            <label htmlFor="email">
              <p className="text-slate-600 capitalize text-sm dark:text-muted-dark">email</p>
              <input
                id="email"
                name="email"
                value={form.email}
                type="email"
                onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                onBlur={e => validateField("email", e.target.value)}
                className="mt-2.5 w-full border border-slate-200 bg-white py-2 px-6 rounded-lg outline-none focus:ring focus:ring-brand transition-all dark:bg-app-dark dark:border-slate-800 dark:text-white"
              />
            </label>
            {errors.email && <p className="text-red-500 dark:text-red-800 text-sm">{errors.email}</p>}

            {/* Password */}
            <label htmlFor="password">
              <p className="text-slate-600 capitalize text-sm dark:text-muted-dark">password</p>
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={handlePasswordChange}
                className="mt-2.5 w-full border border-slate-200 bg-white py-2 px-6 rounded-lg outline-none focus:ring focus:ring-brand transition-all dark:bg-app-dark dark:border-slate-800 dark:text-white"
              />
            </label>

            {/* Password rules */}
            <ul className="text-slate-600 dark:text-muted-dark">
              {Object.entries(passwordRules).map(([key, value]) => (
                <li key={key} className={`flex items-center gap-2 ${value === true ? "text-green-500 dark:text-green-600" : value === false ? "text-red-500 dark:text-red-800" : ""}`}>
                  {value === null && <Circle className="size-4" />}
                  {value === true && <CircleCheckBig className="size-4" />}
                  {value === false && <CircleX className="size-4" />}
                  <span>
                    {key === "minLength"
                      ? "at least 8 characters"
                      : key === "hasUppercase"
                      ? "at least one uppercase letter"
                      : key === "hasLowercase"
                      ? "at least one lowercase letter"
                      : "at least one number"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Submit button */}
          <button type="submit" className="flex items-center justify-center gap-3 w-full mt-8 bg-brand text-white rounded-lg py-3 px-6 cursor-pointer hover:bg-indigo-500 transition-colors">
            {loading ? (
              <>
                <span className="block size-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                loading...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
