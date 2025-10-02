import ViewModal from "../ViewModal";
import FallbackImage from "@/components/FallbackImage";

export default function ProductViewModal({ showViewModal, setShowViewModal, selectedProduct }) {
  return (
    <ViewModal show={showViewModal} onClose={() => setShowViewModal(false)}>
      <div className="p-5">
        <div className="flex flex-col sm:flex-row items-start gap-10">
          <div className="w-70 shrink-0 flex mx-auto md:mx-0">
            <FallbackImage src={`/${selectedProduct?.mainImage}`} alt="" className="size-full drop-shadow-[20px_20px_8px_#3737375e] dark:drop-shadow-[20px_20px_8px_#1c2543d4]" />
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl line-clamp-2 md:text-3xl font-semibold">{selectedProduct?.title}</h3>
            <ul className="mt-6 space-y-1">
              <li className="space-x-2">
                Categories: <span className="text-sm py-0.5 px-2  rounded-full bg-slate-200 dark:bg-slate-700 dark:text-white">{selectedProduct?.category}</span>
              </li>
              <li>Brand: {selectedProduct?.brand}</li>
              <li className="font-medium lg:text-xl">
                <strong>Price: ${selectedProduct?.price.toLocaleString()}</strong>
              </li>
              <li>Discount: {selectedProduct?.discount}%</li>
              <li>Stock: {selectedProduct?.stock}</li>
              <li>Rate: {selectedProduct?.rate}</li>
              {selectedProduct?.colors.length !== 0 ? (
                <li className="flex items-center gap-3">
                  Colors:
                  <ul className="flex items-center gap-2">
                    {selectedProduct?.colors.map(color => (
                      <li key={color} className="size-6 ring ring-offset-2 ring-slate-300 rounded-full" style={{ backgroundColor: color }}></li>
                    ))}
                  </ul>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-5">
          <h4 className="capitalize lg:text-xl font-semibold">caption:</h4>
          <p className="text-slate-500 mt-2">{selectedProduct?.caption}</p>
        </div>

        {selectedProduct && Object.keys(selectedProduct.specs).length > 0 ? (
          <div className="overflow-x-auto mt-5">
            <h4 className="capitalize lgt:text-xl font-semibold">Specifications:</h4>
            <table className="bg-white dark:bg-app-dark text-nowrap w-full mt-5 text-center border-separate border-spacing-0 rounded-lg overflow-hidden">
              <thead>
                <tr className="*:border *:border-slate-200 dark:*:border-slate-700 *:uppercase *:p-3 bg-slate-50 dark:bg-slate-900">
                  {Object.keys(selectedProduct?.specs || {}).map(key => (
                    <th className="text-sm" key={key}>
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="*:even:bg-slate-50 dark:*:even:bg-slate-900 *:transition-colors *:hover:bg-slate-100 dark:*:hover:bg-slate-800">
                <tr className="*:border *:p-2 *:border-slate-200 dark:*:border-slate-700 ">
                  {Object.values(selectedProduct?.specs || {}).map(value => (
                    <td className="text-sm lg:text-base" key={value}>
                      {value}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </ViewModal>
  );
}
