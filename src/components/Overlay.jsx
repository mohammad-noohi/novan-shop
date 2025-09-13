import { motion } from "motion/react"; // eslint-disable-line

export default function Overlay({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1, ease: "linear" }}
      onClick={onClose}
      className="fixed inset-0 w-screen h-screen z-10 bg-black/50 backdrop-blur-xs"></motion.div>
  );
}
