import { Plus, Minus, Trash } from "lucide-react";
import { useCartContext } from "../contexts/CartContext/useCartContext";
import { useState } from "react";

const NO_IMAGE_URL = "images/products/No-Image-Placeholder.png";

export default function CartProduct({ product }) {
  const { addToCart, minusFromCart, removeFromCart } = useCartContext();
  const [imgLoading, setImgLoading] = useState(true);

  function imgLoadHandler() {
    setImgLoading(false);
  }

  function imgErrorHandler(e) {
    e.currentTarget.alt = "No image available";
    e.currentTarget.src = NO_IMAGE_URL;
    e.currentTarget.onerror = null; // void inifinite loop;
    setImgLoading(false);
  }

  return (
    <div className=" flex gap-3 bg-white border border-slate-200 rounded-lg p-3 lg:p-5 dark:bg-app-dark dark:border-slate-800">
      <div className="min-[400px]:size-35 flex items-center justify-center rounded-lg">
        <img src={product.mainImage} alt={product.title} className={`size-full ${imgLoading ? "hidden" : "block"}`} onLoad={imgLoadHandler} onError={imgErrorHandler} />

        {imgLoading && <span className="block size-4 rounded-full border-2 border-brand border-t-transparent animate-spin"></span>}
      </div>
      {/* prodcut info */}
      <div className="grow">
        <div className=" lg:flex items-center justify-between">
          <h6 className=" lg:text-lg font-semibold dark:text-white line-clamp-1" title="product title 1">
            {product.title}
          </h6>
          <span className="text-brand font-bold lg:text-lg dark:text-indigo-500">${product.price.toLocaleString()}</span>
        </div>
        <p className="text-sm text-slate-600 mt-2.5">
          <span>Quantity : </span>
          <span>{product.count}</span>
        </p>
        <div className="mt-8 flex items-center gap-3">
          <button onClick={() => addToCart(product)} className="size-8 flex justify-center items-center rounded-lg bg-brand  cursor-pointer dark:bg-indigo-500">
            <Plus className="size-4 text-white" />
          </button>
          <button onClick={() => minusFromCart(product)} className="size-8 flex justify-center items-center rounded-lg bg-brand  cursor-pointer dark:bg-indigo-500">
            <Minus className="size-4 text-white" />
          </button>
          <button onClick={() => removeFromCart(product)} className="size-8 flex justify-center items-center rounded-lg bg-red-600 ms-auto cursor-pointer dark:bg-red-800">
            <Trash className="size-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
