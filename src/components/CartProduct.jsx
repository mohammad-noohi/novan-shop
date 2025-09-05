import { Plus, Minus, Trash, TriangleAlert } from "lucide-react";
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
          <h6 className={` lg:text-lg font-semibold dark:text-white line-clamp-1 ${product.stock === 0 ? "grayscale-50 opacity-50" : ""}`} title="product title 1">
            {product.title}
          </h6>
          <span className={`text-brand font-bold lg:text-lg dark:text-indigo-500 ${product.stock === 0 ? "grayscale-50 opacity-50" : ""}`}>${product.price.toLocaleString()}</span>
        </div>
        <p className={`text-sm text-slate-600 mt-2.5 ${product.stock === 0 ? "grayscale-50 opacity-50" : ""}`}>
          <span>Quantity : </span>
          <span>{product.count}</span>
        </p>
        {product.stock === 0 && (
          <p className="text-red-500 flex items-center gap-2 mt-2">
            <TriangleAlert className="size-4" />
            out of stock please delete this item
          </p>
        )}
        {product.count > product.stock && product.stock !== 0 && (
          <p className="text-amber-500 flex items-center gap-2 mt-2">
            <TriangleAlert className="size-4" />
            Availbel only {product.stock} items. please reduce the quantity
          </p>
        )}
        <div className="mt-6 flex items-center gap-3">
          <button
            disabled={product.count >= product.stock || product.stock === 0}
            onClick={() => addToCart(product.id)}
            className="size-8 flex justify-center items-center rounded-lg bg-brand  cursor-pointer dark:bg-indigo-500 disabled:grayscale-100 disabled:opacity-50 disabled:cursor-not-allowed">
            <Plus className="size-4 text-white" />
          </button>
          <button
            onClick={() => {
              if (product.count > 1) minusFromCart(product.id);
            }}
            disabled={product.stock === 0}
            className="size-8 flex justify-center items-center rounded-lg bg-brand  cursor-pointer dark:bg-indigo-500 disabled:grayscale-100 disabled:opacity-50 disabled:cursor-not-allowed">
            <Minus className="size-4 text-white" />
          </button>
          <button onClick={() => removeFromCart(product.id)} className="size-8 flex justify-center items-center rounded-lg bg-red-600 ms-auto cursor-pointer dark:bg-red-800">
            <Trash className="size-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
