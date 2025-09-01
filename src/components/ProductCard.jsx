// icons
import { Star } from "lucide-react";

const NO_IMAGE_URL = "images/products/No-Image-Placeholder.png";

export default function ProductCard({ product }) {
  function handleNoImageError(e) {
    e.currentTarget.src = NO_IMAGE_URL; // set to no image
    e.currentTarget.alt = "No image available"; // set alt text
    e.currentTarget.onerror = null; // برای جلوگیری از لوپ بی‌نهایت
  }
  return (
    <div className="pt-4 pl-4 pr-4 pb-6 rounded-lg border border-slate-200 bg-slate-50 dark:bg-suface-dark dark:border-slate-800">
      <img src={product.mainImage ? product.mainImage : NO_IMAGE_URL} alt={product.title} className="h-40 rounded-lg mx-auto" onError={handleNoImageError} />

      <div className="pt-4 pb-8 flex flex-col gap-2.5">
        <h5 className="font-bold dark:text-slate-200">{product.title}</h5>
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
        <p className="text-slate-600 text-sm dark:text-muted-dark">{product.caption}</p>
      </div>
      <button className="bg-brand text-white py-3 w-full rounded-lg cursor-pointer dark:bg-indigo-500">Add to Cart</button>
    </div>
  );
}
