import ProductCard from "../../components/ProductCard";
import Header from "../../components/Header";
import { Link } from "react-router";

export default function ProductsPage() {
  return (
    <div className="bg-white dark:bg-app-dark ">
      <Header />

      <main className="py-10">
        <div className="container">
          <div className="grid grid-cols-4 gap-4">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>

          {/* pagination */}
          <div className="flex items-center gap-3 mt-5">
            <button className="size-9 font-bold flex justify-center items-center rounded-lg border border-slate-200 bg-slate-50 cursor-pointer dark:bg-suface-dark dark:border-slate-800 dark:text-white">
              &lsaquo;
            </button>

            <button className="size-9 font-bold flex justify-center items-center rounded-lg border border-slate-200 bg-slate-50 cursor-pointer dark:bg-suface-dark dark:border-slate-800 dark:text-white">
              1
            </button>

            <button className="size-9 font-bold flex justify-center items-center rounded-lg border bg-brand text-white border-brand cursor-pointer dark:bg-indigo-500 ">2</button>

            <button className="size-9 font-bold  flex justify-center items-center dark:text-muted-dark">...</button>

            <button className="size-9 font-bold flex justify-center items-center rounded-lg border border-slate-200 bg-slate-50 cursor-pointer dark:bg-suface-dark dark:border-slate-800 dark:text-white">
              10
            </button>

            <button className="size-9 font-bold flex justify-center items-center rounded-lg border border-slate-200 bg-slate-50 cursor-pointer dark:bg-suface-dark dark:border-slate-800 dark:text-white">
              &rsaquo;
            </button>
          </div>
        </div>
      </main>

      <footer className="py-10.5 border-t border-slate-200 bg-white dark:bg-app-dark dark:border-slate-800">
        <div className="container">
          <div className="grid grid-cols-4 gap-20">
            <div>
              <h3 className="text-2xl font-semibold dark:text-white">Shop Categories</h3>

              <ul className="mt-5 flex flex-col gap-y-2">
                <li>
                  <Link className="text-slate-600 dark:text-muted-dark">Electronics</Link>
                </li>
                <li>
                  <Link className="text-slate-600 dark:text-muted-dark">Fashion</Link>
                </li>
                <li>
                  <Link className="text-slate-600 dark:text-muted-dark">Home & Kitchen</Link>
                </li>
                <li>
                  <Link className="text-slate-600 dark:text-muted-dark">Beauty</Link>
                </li>
                <li>
                  <Link className="text-slate-600 dark:text-muted-dark">Sports</Link>
                </li>
                <li>
                  <Link className="text-slate-600 dark:text-muted-dark">Toys</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold dark:text-white">Quick Links</h3>

              <ul className="mt-5 flex flex-col gap-y-2">
                <li>
                  <Link className="text-slate-600 dark:text-muted-dark">About Us</Link>
                </li>
                <li>
                  <Link className="text-slate-600 dark:text-muted-dark">Contact</Link>
                </li>
                <li>
                  <Link className="text-slate-600 dark:text-muted-dark">Privacy Policy</Link>
                </li>
                <li>
                  <Link className="text-slate-600 dark:text-muted-dark">Terms & Conditions</Link>
                </li>
                <li>
                  <Link className="text-slate-600 dark:text-muted-dark">FAQ</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold dark:text-white">Quick Links</h3>

              <form className="mt-5">
                <div className="flex gap-2 flex-wrap">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="p-3 bg-white rounded-lg border border-slate-200 outline-none w-full dark:text-white dark:bg-suface-dark dark:border-slate-800"
                  />
                  <button type="submit" className="bg-brand text-white py-3 px-6.5  rounded-lg cursor-pointer dark:bg-indigo-500">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
            <div>
              <h3 className="text-2xl font-semibold dark:text-white">Follow Us</h3>

              <ul className="mt-5 flex items-center gap-3">
                <li>
                  <Link className="flex size-10 rounded-full bg-brand text-white justify-center items-center">icon</Link>
                </li>
                <li>
                  <Link className="flex size-10 rounded-full bg-brand text-white justify-center items-center">icon</Link>
                </li>
                <li>
                  <Link className="flex size-10 rounded-full bg-brand text-white justify-center items-center">icon</Link>
                </li>
                <li>
                  <Link className="flex size-10 rounded-full bg-brand text-white justify-center items-center">icon</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <div className="py-3 border-t text-slate-600 border-slate-200 bg-white dark:bg-app-dark dark:border-slate-800 dark:text-muted-dark">
        <div className="container">
          <div className="flex items-center justify-between text-sm">
            <p>Developed & Designed by Mohammad Noohi — Frontend Developer</p>
            <div className="flex items-center gap-3">
              <Link className="size-10 flex items-center justify-center bg-white border border-slate-200 rounded-full dark:bg-suface-dark dark:border-slate-800 dark:text-white">ins</Link>

              <Link className="size-10 flex items-center justify-center bg-white border border-slate-200 rounded-full dark:bg-suface-dark dark:border-slate-800 dark:text-white">tel</Link>

              <Link className="size-10 flex items-center justify-center bg-white border border-slate-200 rounded-full dark:bg-suface-dark dark:border-slate-800 dark:text-white">git</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
