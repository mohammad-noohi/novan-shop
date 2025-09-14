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
    <div className="flex min-h-screen">
      <Sidebar collapsedLayout={collapsedLayout} onToggleLayout={toggleLayout} />
      <main className="bg-slate-400 grow flex flex-col transition-all">
        <Header />
        <article className="bg-white grow transition-all">
          <Outlet />
        </article>
      </main>
    </div>
  );
}
