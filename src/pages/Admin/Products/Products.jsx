import ProductsTable from "@/components/Dashboard/Products/ProductsTable";
import FilterProducts from "@/components/Dashboard/Products/FilterProducts";
import SortProducts from "@/components/Dashboard/Products/SortProducts";
import { useProducts } from "@/components/Dashboard/Products/useProducts";
import ProductViewModal from "@/components/Dashboard/Products/ProductViewModal";
import AddProductForm from "@/components/Dashboard/AddProductForm";
import DeleteModal from "@/components/DeleteModal";
import EditModal from "@/components/Dashboard/EditModal";
import EditProductForm from "@/components/Dashboard/EditProductForm";

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

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-app-dark p-5">
      <h2 className="text-2xl font-bold">Products</h2>
      <p className="text-slate-500">Manage your products as you wish!</p>

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
