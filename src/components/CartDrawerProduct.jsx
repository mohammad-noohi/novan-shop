import { Trash, Plus, Minus } from "lucide-react";
import { useCartContext } from "../contexts/CartContext/useCartContext";

export default function CartDrawerProduct({ product }) {
  const { addToCart, minusFromCart, removeFromCart } = useCartContext();

  return (
    <aside className="flex gap-4 border border-slate-200 dark:border-slate-800 rounded-lg p-2">
      <img src={product.mainImage} alt="" className="size-20 " />
      <div className="flex flex-col w-full">
        <h5 title={product.title} className="text-sm line-clamp-1  dark:text-muted-dark font-semibold">
          {product.title}
        </h5>
        <div className="flex items-center justify-between mt-auto">
          <div className="border border-slate-200 dark:border-slate-800 rounded-lg flex  overflow-hidden">
            <button onClick={() => addToCart(product)} className="p-1  px-2 cursor-pointer hover:bg-green-100 transition-colors dark:hover:bg-green-900 text-green-600 dark:hover:text-green-100">
              <Plus className="size-4  transition-colors" />
            </button>
            <button className="p-1 px-2   dark:text-muted-dark">{product.count}</button>
            <button
              onClick={() => {
                if (product.count > 1) minusFromCart(product);
              }}
              className="p-1  px-2  cursor-pointer dark:hover:bg-red-800 text-red-500 dark:text-red-800 dark:hover:text-red-100 hover:bg-red-100 transition-colors">
              <Minus className="size-4" />
            </button>
          </div>

          <button
            onClick={() => removeFromCart(product)}
            className="p-1 hover:bg-red-100 text-red-500 dark:text-red-800 dark:hover:text-red-200 rounded-sm transition-colors cursor-pointer dark:hover:bg-red-800">
            <Trash className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
