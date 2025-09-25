import { createPortal } from "react-dom";
import Overlay from "../Overlay";
import { AnimatePresence, motion } from "motion/react"; // eslint-disable-line
import { X } from "lucide-react";
import { useEffect } from "react";

export default function EditModal({ show, onClose, children }) {
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "linear" }}
            className="bg-white fixed top-1/2 left-1/2 -translate-1/2  z-20 dark:text-white dark:bg-suface-dark w-full max-w-[90vw] rounded-lg ">
            <div className="p-3 flex items-center justify-end">
              <button onClick={onClose} className="hover:text-red-500 transition-colors cursor-pointer">
                <X className="size-6" />
              </button>
            </div>
            <div className="p-3 max-h-[90vh] overflow-y-auto ">{children}</div>
          </motion.div>

          <Overlay onClose={onClose} />
        </>
      )}
    </AnimatePresence>,
    document.querySelector("#modals-root")
  );
}
