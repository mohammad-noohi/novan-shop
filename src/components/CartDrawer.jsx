import { X } from "lucide-react";
import CartDrawerProduct from "./CartDrawerProduct";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";

/* check if user logged in after click on button redirect to cart page */
/* 

1. user framer motion to handle animation
2. seprate overlay in another component and use portal to do that and use this overlay for any modal or drawer or anything else to be consistance with other components and DRY rule.

*/

export default function CartDrawer({ show, onClose }) {
  const navigate = useNavigate();

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
  // if (!show) return null;
  // may be need seprate overlay and drawer to hanle them easier

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          key="cart-drawer"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`fixed top-0 left-0  z-20 bg-white w-xs h-screen flex flex-col   dark:bg-app-dark dark:border-r border-slate-800 `}>
          {/* cart header */}
          <div className="flex items-center justify-between p-2 border-b border-slate-200 dark:border-slate-800">
            <h5 className="text-2xl dark:text-white">cart</h5>
            <button>
              <X className="size-6 cursor-pointer hover:text-red-500 transition-colors dark:text-white dark:hover:text-red-800" onClick={onClose} />
            </button>
          </div>
          {/* cart body */}
          <div className="p-2 grow overflow-y-auto ">
            <div className="flex flex-col gap-3 ">
              <CartDrawerProduct />
              <CartDrawerProduct />
              <CartDrawerProduct />
              <CartDrawerProduct />
              <CartDrawerProduct />
              <CartDrawerProduct />
              <CartDrawerProduct />
            </div>
          </div>
          {/* cart footer */}
          <div className="p-2 border-t flex flex-col gap-4 border-slate-200 dark:border-slate-800 mt-auto">
            <p className="text-lg capitalize dark:text-white">
              <span>total: </span>
              <span>$234.34</span>
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
