import { Outlet } from "react-router";
import { CircleCheckBig, CircleX } from "lucide-react";
import { Toaster } from "sonner";
import { useState } from "react";
import Header from "../../../components/Dashboard/Header";
import Sidebar from "../../../components/Dashboard/Sidebar";

export default function AdminLayout() {
  const [collapsedLayout, setCollapsedLayout] = useState(true);

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
            <article className="flex-1">
              <Outlet />
            </article>
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
