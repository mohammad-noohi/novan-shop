import { X } from "lucide-react";
import CartDrawerProduct from "./CartDrawerProduct";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react"; // eslint-disable-line
import { useCartContext } from "../contexts/CartContext/useCartContext";

export default function CartDrawer({ show, onClose }) {
  const navigate = useNavigate();
  const { products, cart } = useCartContext();
  const overlayRef = useRef(null);

  const cartProducts = cart.map(item => {
    const product = products.find(p => p.id === item.productId);

    return {
      ...item,
      ...product,
    };
  });

  const totalPrice = cartProducts.reduce((acc, product) => {
    return acc + product.price * product.count;
  }, 0);

  function redirect() {
    onClose();
    navigate("/cart");
  }

  /*-------------- Effects --------------*/

  /* Close Modal With ESC Key */
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keyup", handleKey);

    // clean-up
    return () => {
      document.removeEventListener("keyup", handleKey);
    };
  }, [onClose]);

  useEffect(() => {
    // disble scroll event when modal show & handle shift layout with scrollbar
    if (show) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.paddingRight = ``;
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.paddingRight = ``;
    };
  }, [show]);

  function handleCloseByOverlay(e) {
    if (overlayRef.current && overlayRef.current === e.target) {
      onClose();
    }
  }

  /*-------------- JSX --------------*/

  return createPortal(
    <AnimatePresence>
      {show && (
        <div ref={overlayRef} onClick={handleCloseByOverlay} className="fixed inset-0 min-w-screen min-h-screen bg-black/50 backdrop-blur-xs flex items-center justify-center z-10">
          <motion.div
            key="cart-drawer"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.2, ease: "linear" }}
            className={`absolute top-0 border-r  left-0  bg-white w-xs lg:w-sm h-screen flex flex-col   dark:bg-app-dark dark:border-r border-slate-200 dark:border-slate-800`}>
            {/* cart header */}
            <div className="flex items-center justify-between p-2 border-b border-slate-200 dark:border-slate-800">
              <h5 className="text-2xl dark:text-white">cart</h5>
              <button onClick={onClose}>
                <X className="size-6 cursor-pointer hover:text-red-500 transition-colors dark:text-white dark:hover:text-red-800" />
              </button>
            </div>
            {/* cart body */}
            <div className="p-2 grow overflow-y-auto ">
              {cartProducts?.length === 0 && (
                <div className="border rounded-lg bg-white border-red-500 p-2 text-red-500 text-center capitalize dark:bg-app-dark dark:text-red-800 dark:border-red-800">your cart is empty</div>
              )}
              {cartProducts?.length > 0 && (
                <div className="flex flex-col gap-3 ">
                  {cartProducts.map(p => (
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
        </div>
      )}
    </AnimatePresence>,
    document.querySelector("#drawers-root")
  );
}
