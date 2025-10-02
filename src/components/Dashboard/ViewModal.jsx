import { AnimatePresence, motion } from "motion/react"; // eslint-disable-line
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

export default function ViewModal({ show, onClose, children }) {
  const overlayRef = useRef(null);

  /* Close Modal With ESC Key */
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keyup", handleKey);

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

  return createPortal(
    <AnimatePresence>
      {show && (
        <div onClick={handleCloseByOverlay} className="fixed inset-0 min-h-screen min-w-screen bg-black/50 backdrop-blur-xs flex items-center justify-center z-10">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "linear" }}
            className="bg-white   dark:text-white dark:bg-suface-dark  max-w-[90vw] rounded-lg overflow-hidden">
            {/* Header */}
            <div className="p-3 flex justify-end">
              <button onClick={onClose} className="hover:text-red-500 transition-colors cursor-pointer">
                <X className="size-4 lg:size-6" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="max-h-[90vh] overflow-y-auto p-3 pr-4" style={{ scrollbarGutter: "stable" }}>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.querySelector("#modals-root")
  );
}
