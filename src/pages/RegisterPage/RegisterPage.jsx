import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuthContext } from "../../contexts/AuthContext/useAuthContext";
import Loader from "../../components/Loader";

const intialState = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, loading } = useAuthContext();
  const [form, setForm] = useState(intialState);

  /* Functions & Handlers */

  function clearForm() {
    setForm(intialState);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const userData = { ...form, role: "user" };
    await register(userData);
    // when register finished clear form and show an alert
    if (!loading) {
      clearForm();
      alert("register success");
      navigate("/");
    }
  }

  return (
    <div className="h-screen bg-white dark:bg-app-dark flex justify-center items-center">
      <div className="p-6 bg-slate-50 w-110 border border-slate-200 rounded-lg dark:bg-suface-dark dark:border-slate-800">
        <h5 className="text-xl font-bold text-center dark:text-white">Registeration</h5>
        <div className="mt-4 flex justify-center  ">
          {/* <div className="border border-slate-200 rounded-lg dark:border-slate-800">
            <NavLink to="/login" className="inline-block py-1 px-2 font-semibold text-slate-600 dark:text-muted-dark">
              login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? "py-1 px-2 inline-block bg-brand text-white rounded-e-lg font-semibold dark:bg-indigo-500 dark:text-white" : "inline-block py-1 px-2 font-semibold text-slate-600"
              }>
              register
            </NavLink>
          </div> */}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3.5">
            <label htmlFor="firstname">
              <p className="text-slate-600 capitalize text-sm dark:text-muted-dark">firstname</p>
              <input
                onChange={e => setForm({ ...form, firstname: e.target.value })}
                id="firstname"
                value={form.firstname}
                type="text"
                className="mt-2.5 w-full border border-slate-200 bg-white py-2 px-6 rounded-lg outline-none focus:ring  focus:ring-brand transition-all dark:bg-app-dark dark:border-slate-800 dark:text-white"
              />
            </label>

            <label htmlFor="lastname">
              <p className="text-slate-600 capitalize text-sm dark:text-muted-dark">lastname</p>
              <input
                value={form.lastname}
                onChange={e => setForm({ ...form, lastname: e.target.value })}
                id="lastname"
                type="text"
                className="mt-2.5 w-full border border-slate-200 bg-white py-2 px-6 rounded-lg outline-none focus:ring  focus:ring-brand transition-all  dark:bg-app-dark dark:border-slate-800 dark:text-white"
              />
            </label>

            <label htmlFor="username">
              <p className="text-slate-600 capitalize text-sm dark:text-muted-dark">username</p>
              <input
                onChange={e => setForm({ ...form, username: e.target.value })}
                id="username"
                value={form.username}
                type="text"
                className="mt-2.5 w-full border border-slate-200 bg-white py-2 px-6 rounded-lg outline-none focus:ring  focus:ring-brand transition-all  dark:bg-app-dark dark:border-slate-800 dark:text-white"
              />
            </label>

            <label htmlFor="email">
              <p className="text-slate-600 capitalize text-sm dark:text-muted-dark">email</p>
              <input
                onChange={e => setForm({ ...form, email: e.target.value })}
                id="email"
                type="email"
                value={form.email}
                className="mt-2.5 w-full border border-slate-200 bg-white py-2 px-6 rounded-lg outline-none focus:ring  focus:ring-brand transition-all  dark:bg-app-dark dark:border-slate-800 dark:text-white"
              />
            </label>

            <label htmlFor="password">
              <p className="text-slate-600 capitalize text-sm dark:text-muted-dark">password</p>
              <input
                onChange={e => setForm({ ...form, password: e.target.value })}
                id="password"
                type="password"
                value={form.password}
                autoComplete="true"
                className="mt-2.5 w-full border border-slate-200 bg-white py-2 px-6 rounded-lg outline-none focus:ring  focus:ring-brand transition-all  dark:bg-app-dark dark:border-slate-800 dark:text-white"
              />
            </label>
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
