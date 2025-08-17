import ProductCard from "../../components/ProductCard";
import Header from "../../components/Header";
import { Link } from "react-router";
import DevInfo from "../../components/DevInfo";
import Footer from "../../components/Footer";

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

      <Footer />

      <DevInfo />
    </div>
  );
}
