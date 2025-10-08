import React from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center">
      <h3 className="dark:text-red-700 text-3xl capitalize ">your cart is empty</h3>

      <img src="images/Empty-cuate.png" className="max-h-100" alt="empty cart" />
      <span className="dark:text-muted-dark mt-3 inline-block">please add some products in to your cart</span>
      <Link to="/" className=" bg-brand flex items-center gap-2 hover:gap-3 transition-all mt-5 text-white py-3 px-6 rounded-lg cursor-pointer hover:bg-indigo-500   font-semibold dark:bg-indigo-500">
        <span>see products</span>
        <ArrowRight />
      </Link>
    </div>
  );
}
