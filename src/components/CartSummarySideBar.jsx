import { useState } from "react";
import { useCartContext } from "@/contexts/CartContext/useCartContext";
import { useDiscountContext } from "@/contexts/DiscountContext/useDiscountContext";
import { TriangleAlert } from "lucide-react";

export default function CartSummarySideBar() {
  const { cartProducts, totalPrice, purchase, finalPrice } = useCartContext();
  const { applyDiscount, discountError } = useDiscountContext();
  const [discountApplied, setDiscountApplied] = useState(false);
  const [input, setInput] = useState("");
  // Derived States
  const uniqeItems = cartProducts.length;
  const totalItems = cartProducts.reduce((acc, p) => {
    return acc + p.count;
  }, 0);

  // check the products in cart has enough stock or not
  const isCartValid = cartProducts.every(p => p.count <= p.stock);

  return (
    <aside className="w-full lg:w-[30%] bg-slate-50 border border-slate-200 rounded-lg p-3 lg:p-5 dark:bg-suface-dark dark:border-slate-800">
      <h3 className="text-xl font-bold dark:text-white">Order Summary</h3>
      <div className="mt-3">
        <p className="text-slate-600 dark:text-muted-dark">
          <span>uniqe items: </span>
          <span>{uniqeItems}</span>
        </p>

        <p className="text-slate-600 dark:text-muted-dark">
          <span>total items: </span>
          <span>{totalItems}</span>
        </p>
      </div>

      <div className="flex gap-3 mt-2.5">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="discount code"
          className="border border-slate-200 rounded-lg p-3 w-full outline-none focus:ring focus:ring-brand caret-brand transition-all dark:bg-app-dark dark:border-slate-800"
        />

        <button
          className="capitalize bg-brand text-white py-3 px-6 rounded-lg cursor-pointer hover:bg-indigo-500 dark:bg-indigo-500"
          onClick={() => {
            applyDiscount(input, totalPrice);
            setDiscountApplied(true);
          }}>
          apply
        </button>
      </div>
      {input && discountApplied && discountError && (
        <p className="text-red-500 mt-2 line-clamp-1 flex items-center gap-2">
          <TriangleAlert className="size-4" />
          <span>{discountError}</span>
        </p>
      )}

      {input && discountApplied && !discountError && (
        <p className="text-green-500 mt-2 line-clamp-1 flex items-center gap-2">
          <span>code applied successfully</span>
        </p>
      )}

      <div className="flex flex-col gap-2.5 mt-10">
        <p className="flex items-center justify-between">
          <span className="text-lg font-bold dark:text-white">sub total:</span>
          <span className="text-lg font-bold text-brand dark:text-indigo-500">${totalPrice.toLocaleString()}</span>
        </p>
        <p className="flex items-center justify-between">
          <span className="text-lg font-bold dark:text-white">final price:</span>
          <span className="text-lg font-bold text-brand dark:text-indigo-500">${finalPrice.toLocaleString()}</span>
        </p>

        <button
          disabled={!isCartValid}
          onClick={purchase}
          className="bg-brand text-white py-3 px-6 rounded-lg cursor-pointer w-full hover:bg-indigo-500 transition  font-semibold dark:bg-indigo-500 disabled:grayscale-50 disabled:opacity-50 disabled:cursor-not-allowed">
          purchase
        </button>
      </div>
    </aside>
  );
}
