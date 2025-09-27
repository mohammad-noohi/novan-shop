import { AnimatePresence, motion } from "motion/react"; // eslint-disable-line
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function ViewModal({ show, onClose, children }) {
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
    if (show) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.documentElement.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.documentElement.style.paddingRight = ``;
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.documentElement.style.paddingRight = ``;
    };
  }, [show]);

  return createPortal(
    <AnimatePresence>
      {show && (
        <div onClick={onClose} className="fixed inset-0 min-h-screen min-w-screen bg-black/50 backdrop-blur-xs flex items-center justify-center z-10">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "linear" }}
            className="bg-white dark:text-white dark:bg-suface-dark w-full max-w-[90vw] rounded-lg overflow-hidden">
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
