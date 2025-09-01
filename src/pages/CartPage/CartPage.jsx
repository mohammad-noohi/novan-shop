// icons
import { Plus } from "lucide-react";
import { Minus } from "lucide-react";
import { Trash } from "lucide-react";

export default function CartPage() {
  return (
    <main className="py-10 bg-white dark:bg-app-dark">
      <div className="container">
        <h1 className="text-2xl font-bold dark:text-white">Shopping Cart</h1>
        <div className="mt-10 flex items-start gap-5 ">
          {/* if cart is empty show an image and button to go back products page */}
          <article className="w-[70%] bg-slate-50 border border-slate-200 rounded-lg p-5 dark:bg-suface-dark dark:border-slate-800">
            {/* products list */}
            <div className="flex flex-col gap-y-6">
              {/* product item */}
              <div className="flex gap-3 bg-white border border-slate-200 rounded-lg p-5 dark:bg-app-dark dark:border-slate-800">
                <div className="size-35 bg-slate-200 rounded-lg">{/* <img src="#" alt="" className="size-35" /> */}</div>
                {/* prodcut info */}
                <div className="grow">
                  <div className="flex items-center justify-between">
                    <h6 className="text-lg font-semibold dark:text-white">Product 1 name</h6>
                    <span className="text-brand font-bold text-lg dark:text-indigo-500">$129.00</span>
                  </div>
                  <p className="text-slate-600 mt-2.5">
                    <span>Quantity : </span>
                    <span>1</span>
                  </p>
                  <div className="mt-8 flex items-center gap-3">
                    <button className="size-8 flex justify-center items-center rounded-lg bg-brand  cursor-pointer dark:bg-indigo-500">
                      <Plus className="size-4 text-white" />
                    </button>
                    <button className="size-8 flex justify-center items-center rounded-lg bg-brand  cursor-pointer dark:bg-indigo-500">
                      <Minus className="size-4 text-white" />
                    </button>
                    <button className="size-8 flex justify-center items-center rounded-lg bg-red-600 ms-auto cursor-pointer dark:bg-red-800">
                      <Trash className="size-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <aside className="w-[30%] bg-slate-50 border border-slate-200 rounded-lg p-5 dark:bg-suface-dark dark:border-slate-800">
            <h3 className="text-xl font-bold dark:text-white">Order Summary</h3>
            <div className="mt-3">
              <p className="text-slate-600 dark:text-muted-dark">
                <span>total items: </span>
                <span>3</span>
              </p>

              <p className="text-slate-600 dark:text-muted-dark">
                <span>discount value: </span>
                <span>$10</span>
              </p>
            </div>

            <div className="flex gap-3 mt-2.5">
              <input
                type="text"
                placeholder="discount code"
                className="border border-slate-200 rounded-lg p-3 w-full outline-none focus:ring focus:ring-brand caret-brand transition-all dark:bg-app-dark dark:border-slate-800"
              />
              <button className="capitalize bg-brand text-white py-3 px-6 rounded-lg cursor-pointer hover:bg-indigo-500 dark:bg-indigo-500">apply</button>
            </div>

            <div className="flex flex-col gap-2.5 mt-10">
              <p className="flex items-center justify-between">
                <span className="text-lg font-bold dark:text-white">Total</span>
                <span className="text-lg font-bold text-brand dark:text-indigo-500">$230</span>
              </p>

              <button className="bg-brand text-white py-3 px-6 rounded-lg cursor-pointer w-full hover:bg-indigo-500 transition  font-semibold dark:bg-indigo-500">purchase</button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
