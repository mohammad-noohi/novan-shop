import { createPortal } from "react-dom";
import { CircleX } from "lucide-react";
import { AnimatePresence, motion } from "motion/react"; // eslint-disable-line
// import Overlay from "./Overlay";
import { useEffect, useRef } from "react";

export default function DeleteModal({ show, onClose, onConfirm, title = "", text = "Are you sure ?", confirmText = "confirm", cancelText = "cancel", footerText = "your action can't undo" }) {
  const overlayRef = useRef(null);

  function handleConfirm() {
    onConfirm();
    onClose();
  }

  /* Close Modal With ESC Key */
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keyup", handleKey);

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
        <div ref={overlayRef} onClick={handleCloseByOverlay} className="fixed inset-0 min-w-screen min-h-screen bg-black/50 backdrop-blur-xs flex items-center justify-center z-10">
          <motion.div
            initial={{
              y: -20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{ duration: 0.3, ease: "linear" }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            className=" bg-white max-h-[80vh] dark:text-white dark:bg-suface-dark max-w-sm w-full rounded-lg flex flex-col">
            {/* header */}
            <div className="flex items-center justify-between p-3">
              <h5 className="dark:text-white text-2xl capitalize">{title}</h5>
              <button onClick={onClose} className="dark:text-slate-500 transition-colors hover:text-red-500 cursor-pointer dark:hover:text-red-700">
                <CircleX className="size-6 transition-colors" />
              </button>
            </div>
            {/* body */}
            <div className="mt-2 p-3 overflow-y-auto grow">
              <p className="text-lg text-center">{text}</p>
              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  onClick={handleConfirm}
                  className="bg-red-500 capitalize hover:bg-red-600 dark:bg-red-800 dark:hover:bg-red-700 transition-colors text-white py-3 px-6 rounded-lg cursor-pointer ">
                  {confirmText}
                </button>
                <button
                  onClick={onClose}
                  className="bg-slate-200 py-3 capitalize px-6 rounded-lg cursor-pointer hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white transition-colors">
                  {cancelText}
                </button>
              </div>
            </div>
            {/* footer */}
            <div className="p-3 border-t border-slate-200 dark:border-slate-800 mt-4">
              <p className="text-slate-600 text-center text-sm">{footerText}</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.querySelector("#modals-root")
  );
}
