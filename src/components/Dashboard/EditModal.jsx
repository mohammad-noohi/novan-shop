import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react"; // eslint-disable-line
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

export default function EditModal({ show, onClose, children }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keyup", handleKey);

    // clean-up
    return () => {
      document.removeEventListener("keyup", handleKey);
    };
  }, []);

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

  return createPortal(
    <AnimatePresence>
      {show && (
        <div
          ref={overlayRef}
          onClick={handleCloseByOverlay}
          className="fixed inset-0 min-h-screen min-w-screen
         bg-black/50 backdrop-blur-xs flex items-center justify-center z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "linear" }}
            className="bg-white fixed top-1/2 left-1/2 -translate-1/2  z-20 dark:text-white dark:bg-suface-dark  max-w-[90vw] rounded-lg ">
            <div className="p-3 flex items-center justify-end">
              <button onClick={onClose} className="hover:text-red-500 transition-colors cursor-pointer">
                <X className="size-6" />
              </button>
            </div>
            <div className="p-3 max-h-[90vh] overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.querySelector("#modals-root")
  );
}
