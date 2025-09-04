import { X } from "lucide-react";
import CartDrawerProduct from "./CartDrawerProduct";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { useCartContext } from "../contexts/CartContext/useCartContext";

export default function CartDrawer({ show, onClose }) {
  const navigate = useNavigate();
  const { cart } = useCartContext();
  /* Drived States */
  const totalPrice = cart.reduce((acc, product) => {
    return acc + product.price * product.count;
  }, 0);

  function redirect() {
    onClose();
    navigate("/cart");
  }

  /*-------------- Effects --------------*/

  // disable scroll when drawer show
  useEffect(() => {
    function handleEscKey(e) {
      console.log(e);
      if (e.key === "Escape") onClose();
    }

    if (show) {
      // add listener when show is true or can use useCallback do this later to better performance
      document.addEventListener("keyup", handleEscKey);
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }

    // clean-up
    return () => {
      document.removeEventListener("keyup", handleEscKey);
      document.documentElement.style.overflow = "auto";
    };
  }, [show, onClose]);

  /*-------------- JSX --------------*/

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          key="cart-drawer"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`fixed top-0 left-0  z-20 bg-white w-xs lg:w-sm h-screen flex flex-col   dark:bg-app-dark dark:border-r border-slate-800 `}>
          {/* cart header */}
          <div className="flex items-center justify-between p-2 border-b border-slate-200 dark:border-slate-800">
            <h5 className="text-2xl dark:text-white">cart</h5>
            <button onClick={onClose}>
              <X className="size-6 cursor-pointer hover:text-red-500 transition-colors dark:text-white dark:hover:text-red-800" />
            </button>
          </div>
          {/* cart body */}
          <div className="p-2 grow overflow-y-auto ">
            {cart.length === 0 && (
              <div className="border rounded-lg bg-white border-red-500 p-2 text-red-500 text-center capitalize dark:bg-app-dark dark:text-red-800 dark:border-red-800">your cart is empty</div>
            )}
            {cart.length > 0 && (
              <div className="flex flex-col gap-3 ">
                {cart.map(p => (
                  <CartDrawerProduct key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
          {/* cart footer */}
          <div className="p-2 border-t flex flex-col gap-4 border-slate-200 dark:border-slate-800 mt-auto">
            <p className="text-lg capitalize dark:text-white">
              <span>total: </span>
              <span>$ {totalPrice.toLocaleString()}</span>
            </p>
            <button onClick={redirect} className="bg-brand text-white py-3 w-full  rounded-lg cursor-pointer dark:bg-indigo-500">
              go to cart
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.querySelector("#drawers-root")
  );
}
