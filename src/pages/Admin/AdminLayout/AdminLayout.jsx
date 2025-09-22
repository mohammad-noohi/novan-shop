import { Outlet } from "react-router";

import { useState } from "react";
import Header from "../../../components/Dashboard/Header";
import Sidebar from "../../../components/Dashboard/Sidebar";

export default function AdminLayout() {
  const [collapsedLayout, setCollapsedLayout] = useState(true);

  function toggleLayout() {
    setCollapsedLayout(prev => !prev);
  }

  return (
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
  );
}
