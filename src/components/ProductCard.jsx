export default function ProductCard() {
  return (
    <div className="pt-4 pl-4 pr-4 pb-6 rounded-lg border border-slate-200 bg-slate-50 dark:bg-suface-dark dark:border-slate-800">
      <img src="#" alt="" className="h-40 bg-slate-300 rounded-lg" />
      <div className="pt-4 pb-8 flex flex-col gap-2.5">
        <h5 className="font-bold dark:text-slate-200">Wireless Headphones</h5>
        <div className="flex items-center justify-between">
          <p className="font-bold text-brand dark:text-indigo-500">$129.00</p>
          <p className="text-sm text-slate-600 dark:text-muted-dark">★★★★☆</p>
        </div>
        <p className="text-slate-600 text-sm dark:text-muted-dark">Noise-cancelling, 30h battery.</p>
      </div>
      <button className="bg-brand text-white py-3 w-full rounded-lg cursor-pointer dark:bg-indigo-500">Add to Cart</button>
    </div>
  );
}
