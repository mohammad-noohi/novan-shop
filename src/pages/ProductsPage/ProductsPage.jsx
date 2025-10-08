import { useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useCartContext } from "../../contexts/CartContext/useCartContext";
import { ChevronRight, ChevronLeft } from "lucide-react";
import CustomPagination from "@/components/CustomPagination";

// change this value to manage amount of items to show in UI.
const ITEMS_PER_PAGE = 12;

export default function ProductsPage() {
  const { products } = useCartContext();
  const [currentPage, setCurrentPage] = useState(1);
  const pagesCount = Math.ceil(products.length / ITEMS_PER_PAGE);
  const endIndex = currentPage * ITEMS_PER_PAGE;
  const startIndex = endIndex - ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, endIndex);

  /*----------- Functions -----------*/

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

        <CustomPagination
          pages={pagesCount}
          currentPage={currentPage}
          onNextPage={nextPage}
          onPrevPage={prevPage}
          onChangePage={changePage}
          classNames={{ activePage: "bg-brand text-white", pagination: "mt-5" }}
        />
      </div>
    </main>
  );
}
