import { useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useCartContext } from "../../contexts/CartContext/useCartContext";

// icons
import { ChevronRight, ChevronLeft } from "lucide-react";

// change this value to manage amount of items to show in UI.
const ITEMS_PER_PAGE = 12;

export default function ProductsPage() {
  const { products } = useCartContext();
  const [currentPage, setCurrentPage] = useState(1);
  const pagesCount = Math.ceil(products.length / ITEMS_PER_PAGE);
  const endIndex = currentPage * ITEMS_PER_PAGE;
  const startIndex = endIndex - ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, endIndex);

  /* Functions & Handlers */

  function nextPage() {
    setCurrentPage(page => {
      if (currentPage < pagesCount) {
        return page + 1;
      } else {
        return page;
      }
    });
  }

  function prevPage() {
    setCurrentPage(page => {
      if (currentPage > 1) {
        return page - 1;
      } else {
        return page;
      }
    });
  }

  function changePage(num) {
    setCurrentPage(num);
  }

  return (
    <main className="py-10 bg-white dark:bg-app-dark">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* pagination */}
        <div className="flex items-center gap-3 mt-5">
          <button
            disabled={currentPage === 1}
            className="size-9 font-bold flex justify-center items-center rounded-lg border border-slate-200 bg-slate-50 cursor-pointer dark:bg-suface-dark dark:border-slate-800 dark:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={prevPage}>
            <ChevronLeft className="size-4" />
          </button>

          {Array.from({ length: pagesCount }, (_, i) => (
            <button
              key={i}
              className={`size-9 font-bold flex justify-center items-center rounded-lg border ${
                i + 1 === currentPage ? "bg-brand text-white border-brand" : " border-slate-200 bg-slate-50 dark:bg-suface-dark dark:border-slate-800 dark:text-white"
              } cursor-pointer dark:bg-indigo-500`}
              onClick={() => changePage(i + 1)}>
              {i + 1}
            </button>
          ))}

          {/* <button className="size-9 font-bold  flex justify-center items-center dark:text-muted-dark">...</button> */}

          <button
            disabled={currentPage === pagesCount}
            className="size-9 font-bold flex justify-center items-center rounded-lg border border-slate-200 bg-slate-50 cursor-pointer dark:bg-suface-dark dark:border-slate-800 dark:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={nextPage}>
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </main>
  );
}
