import { AnimatePresence, motion } from "motion/react"; // eslint-disable-line
import { createPortal } from "react-dom";
import Overlay from "../Overlay";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function ViewModal({ show, onClose, children }) {
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

  return createPortal(
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "linear" }}
            className="bg-white fixed top-1/2 left-1/2 -translate-1/2  z-20 dark:text-white dark:bg-suface-dark w-full max-w-[90vw]  rounded-lg ">
            <div className="p-3 flex justify-end">
              <button onClick={onClose} className=" hover:text-red-500 transition-colors cursor-pointer">
                <X className="size-4 lg:size-6" />
              </button>
            </div>
            <div className="mt-2 p-3 max-h-[90vh] overflow-y-auto ">{children}</div>
          </motion.div>

          <Overlay onClose={onClose} />
        </>
      )}
    </AnimatePresence>,
    document.querySelector("#modals-root")
  );
}
