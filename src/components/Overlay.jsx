import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";

export default function Overlay({ show, onClose }) {
  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className={`fixed inset-0 w-screen h-screen z-10 bg-black/50 backdrop-blur-xs`}></motion.div>
      )}
    </AnimatePresence>,
    document.querySelector("#overlay-root")
  );
}
