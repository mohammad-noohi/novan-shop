import { Outlet, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion"; // eslint-disable-line
import { CircleCheckBig, CircleX } from "lucide-react";
import { Toaster } from "sonner";
import { useState } from "react";
import Header from "../../../components/Dashboard/Header";
import Sidebar from "../../../components/Dashboard/Sidebar";

export default function AdminLayout() {
  const [collapsedLayout, setCollapsedLayout] = useState(true);
  const location = useLocation(); // just for motion

  function toggleLayout() {
    setCollapsedLayout(prev => !prev);
  }

  return (
    <>
      <div className="flex h-screen flex-col">
        {/* Header ثابت */}
        <Header />

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar ثابت */}
          <Sidebar collapsedLayout={collapsedLayout} onToggleLayout={toggleLayout} className="w-64 flex-shrink-0 border-r border-slate-200 bg-white" />

          {/* Main content اسکرول شود */}
          <main className="flex flex-1 flex-col overflow-auto">
            <AnimatePresence mode="wait">
              <motion.article
                key={location.pathname}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                // exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex-1">
                <Outlet />
              </motion.article>
            </AnimatePresence>
          </main>
        </div>
      </div>
      <Toaster
        position="top-right"
        icons={{
          success: <CircleCheckBig className="size-4! text-green-500!  dark:text-green-600!" />,
          error: <CircleX className="size-4! text-red-500! dark:text-red-600!" />,
        }}
      />
    </>
  );
}
