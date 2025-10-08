import { Star } from "lucide-react";
import { useCartContext } from "../contexts/CartContext/useCartContext";
import { useState } from "react";
import { motion } from "motion/react"; // eslint-disable-line

const NO_IMAGE_URL = "images/products/No-Image-Placeholder.png";

export default function ProductCard({ product }) {
  const { addToCart, cartLoading, loadingProductId } = useCartContext();
  const [imgLoading, setImgLoading] = useState(true);

  function imgLoadHandler() {
    setImgLoading(false);
  }

  function imgErrorHandler(e) {
    e.currentTarget.src = NO_IMAGE_URL; // set to no image
    e.currentTarget.alt = "No image available"; // set alt text
    e.currentTarget.onerror = null; // برای جلوگیری از لوپ بی‌نهایت
    setImgLoading(false);
  }

  return (
    <div className="dark:bg-suface-dark relative flex flex-col justify-between rounded-lg border border-slate-200 bg-slate-50 pb-6 pl-4 pr-4 pt-4 dark:border-slate-800">
      <div className="flex flex-col gap-2.5 pt-4">
        <div className="flex h-40 items-center justify-center">
          <img
            className={`w-full h-full object-contain ${imgLoading ? "hidden" : "block"}`}
            src={product.mainImage ? product.mainImage : "#"}
            alt={product.title}
            onLoad={imgLoadHandler}
            onError={imgErrorHandler}
          />

          {imgLoading && <span className="size-4 border-brand block animate-spin rounded-full border-2 border-t-transparent"></span>}
        </div>

        <h5 className="line-clamp-1 font-bold dark:text-slate-200">{product.title}</h5>
        <div className="flex items-center justify-between">
          <p className="text-brand font-bold dark:text-indigo-500">${Number(product.price).toLocaleString()}</p>
          <div className="dark:text-muted-dark flex text-sm text-slate-600">
            {Array.from({ length: product.rate }, (_, i) => (
              <Star key={i} size={16} fill="#615fff" strokeWidth={0} />
            ))}

            {Array.from({ length: 5 - product.rate }, (_, i) => (
              <Star key={i} size={16} color="#615fff" strokeWidth={2} />
            ))}
          </div>
        </div>
        <p className="dark:text-muted-dark line-clamp-3 text-sm text-slate-600">{product.caption}</p>
        <p className="dark:text-muted-dark font-bold text-slate-600">Stock : {product.stock}</p>
      </div>
      <motion.button
        initial={{ scale: 1 }}
        whileTap={{ scale: 0.9 }}
        disabled={product.stock === 0}
        onClick={() => addToCart(product.id)}
        className="bg-brand disabled:grayscale-100 mt-8 flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg py-3 text-white disabled:cursor-not-allowed disabled:opacity-70 dark:bg-indigo-500">
        {cartLoading && product.id === loadingProductId && <span className="size-4 block animate-spin rounded-full border-2 border-white border-t-transparent"></span>}
        {cartLoading && product.id === loadingProductId ? "loading..." : "Add To Cart"}
      </motion.button>

      {product.stock === 0 ? <span className="absolute rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 px-2 text-red-500 dark:bg-suface-dark">out of stock</span> : null}
    </div>
  );
}
