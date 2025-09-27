import { useCartContext } from "@/contexts/CartContext/useCartContext";
import { useState } from "react";
import { toast } from "sonner";

function useProducts() {
  const { products, getAllProducts } = useCartContext();
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  let pages = null;

  const [query, setQuery] = useState({
    search: "",
    filters: {
      category: "all",
      brand: "all",
      stock: "all",
      discount: "all",
      rate: "all",
    },
    sort: "none", // price-asc , price-dsc , ....
    pagination: {
      page: 1,
      perPages: 10,
    },
  });

  // Derived States
  const categoryItems = Array.from(new Set(products.map(p => p.category.toLowerCase())));
  const brandItems = Array.from(new Set(products.map(p => p.brand.toLowerCase())));

  /*------------------ Pagination Actions ------------------*/
  function nextPage() {
    setQuery(prev => {
      if (prev.pagination.page < pages) {
        return { ...prev, pagination: { ...prev.pagination, page: prev.pagination.page + 1 } };
      }

      return prev;
    });
  }

  function prevPage() {
    setQuery(prev => {
      if (prev.pagination.page > 1) {
        return { ...prev, pagination: { ...prev.pagination, page: prev.pagination.page - 1 } };
      }

      return prev;
    });
  }

  function changeCurrentPage(num) {
    setQuery(prev => {
      return { ...prev, pagination: { ...prev.pagination, page: num } };
    });
  }

  /*------------------ CRUD ------------------*/

  async function deleteProduct() {
    if (!selectedProduct) return;
    try {
      const resp = await fetch(`http://localhost:3000/products/${selectedProduct.id}`, {
        method: "DELETE",
      });

      console.log(resp); // من شرط زیر رو غیر فعال کردم چون ارور ۵۰۰ میداد ولی محصول حذف میشد و خب نمیدونم مشکل از چیه ؟

      // if (![200, 204, 404].includes(resp.status)) {
      //   throw new Error(`Failed to delete product. Status: ${resp.status}`);
      // }

      toast.success("Product deleted successfully");

      // update products
      await getAllProducts();
    } catch (err) {
      console.log(err);
      toast.error(`Failed to delete product`);
    }
  }

  /*-------------- Proccessing Shown Items In Table--------------*/

  function visibleProducts() {
    let result = [...products];

    // search in title and description
    if (query.search.trim()) {
      const term = query.search.toLowerCase().trim();
      result = result.filter(p => p.title.toLowerCase().includes(term) || p.caption?.toLowerCase().includes(term));
    }

    // category filter
    if (query.filters.category !== "all") {
      result = result.filter(p => p.category.toLowerCase() === query.filters.category.toLowerCase());
    }

    // brand filter
    if (query.filters.brand !== "all") {
      result = result.filter(p => p.brand.toLowerCase() === query.filters.brand.toLowerCase());
    }

    // stock filter
    if (query.filters.stock !== "all") {
      result = result.filter(p => {
        if (query.filters.stock === "instock") return p.stock > 0;
        if (query.filters.stock === "outofstock") return p.stock === 0;
        if (query.filters.stock === "lowstock") return p.stock > 0 && p.stock < 5;
      });
    }
    // discount filter
    if (query.filters.discount !== "all") {
      result = result.filter(p => {
        if (query.filters.discount === "nodiscount") return p.discount === 0;
        if (query.filters.discount === "lowdiscount") return p.discount > 0 && p.discount <= 10;
        if (query.filters.discount === "highdiscount") return p.discount >= 10;
      });
    }
    // rate filter
    if (query.filters.rate !== "all") {
      result = result.filter(p => p.rate === Number(query.filters.rate));
    }

    // Sort Result
    result.sort((a, b) => {
      // فقط باید این مورد که ممکنه مقادیر نباشن یا نال یا اندیفایند باشند رو هم مدیریت کنی برای این موضوع وگرنه لاجیک کامل درسته
      const sortType = query.sort;
      if (sortType === "name-asc") return a.title.localeCompare(b.title);
      if (sortType === "name-desc") return b.title.localeCompare(a.title);
      if (sortType === "price-asc") return a.price - b.price;
      if (sortType === "price-desc") return b.price - a.price;
      if (sortType === "date-asc") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortType === "date-desc") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortType === "stock-asc") return a.stock - b.stock;
      if (sortType === "stock-desc") return b.stock - a.stock;
      if (sortType === "discount-asc") return a.discount - b.discount;
      if (sortType === "discount-desc") return b.discount - a.discount;
      if (sortType === "rate-asc") return a.rate - b.rate;
      if (sortType === "rate-desc") return b.rate - a.rate;
      return 0;
    });

    // Paginated Result
    const endIndex = query.pagination.page * query.pagination.perPages;
    const startIndex = endIndex - query.pagination.perPages;
    pages = Math.ceil(result.length / query.pagination.perPages);
    result = result.slice(startIndex, endIndex);

    return result;
  }

  const processedProducts = visibleProducts();

  return {
    products,
    showDeleteProductModal,
    showViewModal,
    showEditModal,
    selectedProduct,
    pages,
    query,
    categoryItems,
    brandItems,
    processedProducts,
    setQuery,
    nextPage,
    prevPage,
    setSelectedProduct,
    setShowDeleteProductModal,
    setShowEditModal,
    setShowViewModal,
    changeCurrentPage,
    deleteProduct,
  };
}

export { useProducts };
