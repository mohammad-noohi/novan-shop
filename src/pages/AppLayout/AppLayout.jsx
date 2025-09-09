import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { CircleCheckBig, CircleX } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DevInfo from "../../components/DevInfo";

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen  dark:bg-app-dark">
      <Header />
      <Outlet />
      <Footer />
      <DevInfo />
      <Toaster
        icons={{
          success: <CircleCheckBig className="size-4! text-green-500!  dark:text-green-600!" />,
          error: <CircleX className="size-4! text-red-500! dark:text-red-600!" />,
        }}
      />
    </div>
  );
}
