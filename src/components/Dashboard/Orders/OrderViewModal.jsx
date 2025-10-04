import ViewModal from "../ViewModal";
import FallbackImage from "@/components/FallbackImage";

export default function OrderViewModal({ products, users, selectedOrder, modals, setModals }) {
  if (!selectedOrder) return;

  const user = users.find(user => user.id === selectedOrder.userId);
  const date = new Date(selectedOrder.createdAt);
  const year = date.getFullYear();
  const month = String(date.getMonth()).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const orderHour = String(date.getHours()).padStart(2, "0");
  const orderMin = String(date.getMinutes()).padStart(2, "0");
  const orderProducts = selectedOrder.items.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      id: product.id,
      thubmnail: product.mainImage,
      title: product.title,
      category: product.category,
      brand: product.brand,
      price: product.price,
      discount: product.discount,
      count: item.count,
    };
  });

  return (
    <ViewModal show={modals.view} onClose={() => setModals(prev => ({ ...prev, view: false }))}>
      <div className="w-[800px]">
        {/* title */}
        <div>
          <div className="flex items-center gap-4">
            <h4 className="text-3xl leading-0 font-semibold capitalize">Order Info</h4>
            <p className={`text-sm py-1 px-3 rounded-full ${selectedOrder.status === "paid" ? "bg-green-600" : selectedOrder.status === "pending" ? "bg-yellow-500" : "bg-red-500"} text-white`}>
              {selectedOrder?.status}
            </p>
          </div>

          <div className="mt-5">
            <p>
              <span className="text-lg font-medium capitalize">Created: </span>
              <span>{`${year}-${month}-${day}`}</span>
              <span className="inline-block size-1.5 bg-slate-500 rounded-full mx-3"></span>
              <span>
                {orderHour}:{orderMin}
              </span>
            </p>
            <p>
              <span className="text-lg font-medium capitalize">Username :</span> <span>{user.username}</span>
            </p>
            <p>
              <span className="text-lg font-medium capitalize">Email :</span> <span>{user.email}</span>
            </p>
            <p>
              <span className="text-lg font-medium capitalize">Total Price :</span> <span>${selectedOrder.totalPrice.toLocaleString()}</span>
            </p>
            <p>
              <span className="text-lg font-medium capitalize">Final Price(applied discount) :</span> <span>${selectedOrder.finalPrice.toLocaleString()}</span>
            </p>
          </div>

          {/* products of order */}
          <div className="overflow-x-auto">
            {/* products table */}
            <table className="bg-white dark:bg-app-dark text-nowrap w-full mt-5 text-center border-separate border-spacing-0 rounded-lg overflow-hidden">
              <thead>
                <tr className="*:border *:border-slate-200 dark:*:border-slate-700 *:uppercase *:p-3 bg-slate-50 dark:bg-slate-900">
                  <th>id</th>
                  <th>thumbnail</th>
                  <th>title</th>
                  <th>category</th>
                  <th>brand</th>
                  <th>price</th>
                  <th>discount</th>
                  <th>count</th>
                </tr>
              </thead>
              <tbody className="*:even:bg-slate-50 dark:*:even:bg-slate-900 *:transition-colors *:hover:bg-slate-100 dark:*:hover:bg-slate-800">
                {orderProducts.map(p => (
                  <tr key={p.id} className="*:border *:p-2 *:border-slate-200 dark:*:border-slate-700 ">
                    <td>{p.id}</td>
                    <td>
                      <div className="size-12  overflow-hidden mx-auto">
                        <FallbackImage src={`/${p.thubmnail}`} alt="avatar image" className="size-full object-cover" />
                      </div>
                    </td>
                    <td>{p.title}</td>
                    <td>{p.category}</td>
                    <td>{p.brand}</td>
                    <td>${p.price.toLocaleString()}</td>
                    <td>{p.discount}%</td>
                    <td>{p.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ViewModal>
  );
}
