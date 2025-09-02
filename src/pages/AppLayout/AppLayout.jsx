import { Outlet } from "react-router";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DevInfo from "../../components/DevInfo";
import CartDrawer from "../../components/CartDrawer";

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen  dark:bg-app-dark">
      <Header />
      <Outlet />
      <Footer />
      <DevInfo />
    </div>
  );
}
