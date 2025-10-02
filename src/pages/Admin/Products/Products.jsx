import ProductsTable from "@/components/Dashboard/Products/ProductsTable";
import FilterProducts from "@/components/Dashboard/Products/FilterProducts";
import SortProducts from "@/components/Dashboard/Products/SortProducts";
import { useProducts } from "@/components/Dashboard/Products/useProducts";
import ProductViewModal from "@/components/Dashboard/Products/ProductViewModal";
import AddProductForm from "@/components/Dashboard/Products/AddProductForm";
import DeleteModal from "@/components/DeleteModal";
import EditModal from "@/components/Dashboard/EditModal";
import EditProductForm from "@/components/Dashboard/EditProductForm";
import { FileText, Sheet } from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export default function Products() {
  const {
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
  } = useProducts();

  function exportToPDF() {
    const doc = new jsPDF();

    // ستون‌ها
    const columns = ["ID", "Title", "Category", "Brand", "Price", "Stock", "Rate"];

    // ردیف‌ها
    const rows = products.map(p => [
      p.id,
      (p.title ?? "").length > 50 ? p.title.slice(0, 47) + "..." : p.title, // کوتاه کردن عنوان
      p.category ?? "",
      p.brand ?? "",
      typeof p.price === "number" ? p.price.toLocaleString() : p.price, // فرمت قیمت
      p.stock ?? "",
      p.rate ?? "",
    ]);

    // جدول
    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 20,
      styles: { fontSize: 10 }, // خواناتر
      headStyles: { fillColor: [41, 98, 255] }, // رنگ هدر
    });

    // عنوان
    doc.text("Products Report", 14, 15);

    // دانلود
    doc.save("products.pdf");
  }

  function exportToExcel() {
    if (!products || products.length === 0) {
      alert("هیچ محصولی برای اکسپورت وجود ندارد.");
      return;
    }

    // فقط ستون‌های مهم رو نگه داریم
    const filtered = products.map(p => ({
      ID: p.id,
      Title: p.title,
      Category: p.category,
      Brand: p.brand,
      Price: typeof p.price === "number" ? p.price.toLocaleString() : p.price,
      Stock: p.stock,
      Rate: p.rate,
    }));

    // JSON → Sheet
    const worksheet = XLSX.utils.json_to_sheet(filtered);

    // Sheet → Workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    // ذخیره
    XLSX.writeFile(workbook, "products.xlsx");
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-app-dark p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Products</h2>
          <p className="text-slate-500">Manage your products as you wish!</p>
        </div>

        <div className="flex items-center gap-3">
          <span>export: </span>
          <button className="cursor-pointer" onClick={exportToPDF}>
            <FileText />
          </button>
          <button className="cursor-pointer" onClick={exportToExcel}>
            <Sheet />
          </button>
        </div>
      </div>

      <div className="mt-10">
        <AddProductForm />

        {/* Toolbar Section*/}
        <div className="bg-white dark:bg-suface-dark border border-slate-200 dark:border-slate-800 mt-10 p-5 rounded-lg">
          <FilterProducts query={query} setQuery={setQuery} categoryItems={categoryItems} brandItems={brandItems} />

          <SortProducts query={query} setQuery={setQuery} />
        </div>

        <ProductsTable
          query={query}
          nextPage={nextPage}
          pages={pages}
          prevPage={prevPage}
          processedProducts={processedProducts}
          products={products}
          setQuery={setQuery}
          setSelectedProduct={setSelectedProduct}
          setShowDeleteProductModal={setShowDeleteProductModal}
          setShowEditModal={setShowEditModal}
          setShowViewModal={setShowViewModal}
          changeCurrentPage={changeCurrentPage}
        />
      </div>

      <DeleteModal show={showDeleteProductModal} onClose={() => setShowDeleteProductModal(false)} confirmText="delete" text="Are you sure you want to delete the product?" onConfirm={deleteProduct} />

      <ProductViewModal selectedProduct={selectedProduct} setShowViewModal={setShowViewModal} showViewModal={showViewModal} />

      <EditModal show={showEditModal} onClose={() => setShowEditModal(false)}>
        <EditProductForm selectedProduct={selectedProduct} setShowEditModal={setShowEditModal} />
      </EditModal>
    </div>
  );
}
