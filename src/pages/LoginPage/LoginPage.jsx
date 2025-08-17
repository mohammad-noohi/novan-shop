import { NavLink } from "react-router";

export default function LoginPage() {
  return (
    <div className="h-screen bg-white dark:bg-app-dark flex justify-center items-center">
      <div className="p-6 bg-slate-50 w-110 border border-slate-200 rounded-lg dark:bg-suface-dark dark:border-slate-800">
        <h5 className="text-xl font-bold text-center dark:text-white">Welcom back</h5>
        <div className="mt-4 flex justify-center  ">
          <div className="border border-slate-200 rounded-lg dark:border-slate-800">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "py-1 px-2 inline-block bg-brand text-white rounded-s-lg font-semibold dark:bg-indigo-500 dark:text-white"
                  : "inline-block py-1 px-2 font-semibold text-slate-600 dark:text-muted-dark"
              }>
              login
            </NavLink>
            <NavLink to="/register" className="inline-block py-1 px-2 font-semibold text-slate-600 dark:text-muted-dark">
              register
            </NavLink>
          </div>
        </div>
        <form>
          <div className="flex flex-col gap-3.5">
            <label htmlFor="username">
              <p className="text-slate-600 capitalize text-sm dark:text-muted-dark">username</p>
              <input
                id="username"
                type="text"
                className="mt-2.5 w-full border border-slate-200 bg-white py-2 px-6 rounded-lg outline-none focus:ring  focus:ring-brand transition-all dark:bg-app-dark dark:border-slate-800 dark:text-white"
              />
            </label>

            <label htmlFor="password">
              <p className="text-slate-600 capitalize text-sm dark:text-muted-dark">password</p>
              <input
                id="password"
                type="text"
                className="mt-2.5 w-full border border-slate-200 bg-white py-2 px-6 rounded-lg outline-none focus:ring  focus:ring-brand transition-all dark:bg-app-dark dark:border-slate-800 dark:text-white"
              />
            </label>
          </div>

          <button className="w-full mt-8 bg-brand text-white rounded-lg py-3 px-6 cursor-pointer hover:bg-indigo-500 transition-colors" type="submit">
            sign in
          </button>
        </form>
      </div>
    </div>
  );
}
