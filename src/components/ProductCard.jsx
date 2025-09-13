// icons
import { Star } from "lucide-react";
import { useCartContext } from "../contexts/CartContext/useCartContext";
import { useState } from "react";
import { motion } from "motion/react";

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
    <div className="relative flex flex-col justify-between pt-4 pl-4 pr-4 pb-6 rounded-lg border border-slate-200 bg-slate-50 dark:bg-suface-dark dark:border-slate-800">
      <div className="pt-4  flex flex-col gap-2.5">
        <div className="h-40  flex items-center justify-center ">
          <img
            className={`w-full h-full object-contain ${imgLoading ? "hidden" : "block"}`}
            src={product.mainImage ? product.mainImage : "#"}
            alt={product.title}
            onLoad={imgLoadHandler}
            onError={imgErrorHandler}
          />

          {imgLoading && <span className="block size-4 rounded-full border-2 border-brand border-t-transparent animate-spin"></span>}
        </div>

        <h5 className="font-bold dark:text-slate-200 line-clamp-1">{product.title}</h5>
        <div className="flex items-center justify-between">
          <p className="font-bold text-brand dark:text-indigo-500">${Number(product.price).toLocaleString()}</p>
          <div className="flex text-sm text-slate-600 dark:text-muted-dark">
            {Array.from({ length: product.rate }, (_, i) => (
              <Star key={i} size={16} fill="#615fff" strokeWidth={0} />
            ))}

            {Array.from({ length: 5 - product.rate }, (_, i) => (
              <Star key={i} size={16} color="#615fff" strokeWidth={2} />
            ))}
          </div>
        </div>
        <p className="text-slate-600 text-sm dark:text-muted-dark line-clamp-3">{product.caption}</p>
        <p className="text-slate-600 font-bold dark:text-muted-dark">Stock : {product.stock}</p>
      </div>
      <motion.button
        initial={{ scale: 1 }}
        whileTap={{ scale: 0.9 }}
        disabled={product.stock === 0}
        onClick={() => addToCart(product.id)}
        className="flex mt-8 items-center justify-center gap-3 bg-brand text-white py-3 w-full rounded-lg cursor-pointer dark:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70
       disabled:grayscale-100">
        {cartLoading && product.id === loadingProductId && <span className="block size-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>}
        {cartLoading && product.id === loadingProductId ? "loading..." : "Add To Cart"}
      </motion.button>

      {product.stock === 0 ? <span className="absolute border border-red-500 text-red-500 px-2 rounded-lg bg-slate-50 ">out of stock</span> : null}
    </div>
  );
}
