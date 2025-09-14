// Site Pages
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import PrivateRoute from "./pages/PrivateRoute/PrivateRoute";
import CartPage from "./pages/CartPage/CartPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import AppLayout from "./pages/AppLayout/AppLayout";

// Admin Dashboard Pages
import AdminLayout from "./pages/Admin/AdminLayout/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Discounts from "./pages/Admin/Discounts/Discounts";
import Orders from "./pages/Admin/Orders/Orders";
import Products from "./pages/Admin/Products/Products";
import Users from "./pages/Admin/Users/Users";
import Comments from "./pages/Admin/Comments/Comments";
import Profile from "./pages/Admin/Profile/Profile";
import Tickets from "./pages/Admin/Tickets/Tickets";

const routes = [
  // Public Routes
  {
    Component: AppLayout,
    children: [
      { path: "/", Component: ProductsPage },
      { path: "/login", Component: LoginPage },
      { path: "/register", Component: RegisterPage },
      // private route
      { Component: PrivateRoute, children: [{ path: "/cart", Component: CartPage }] },
      // 404 page
      { path: "*", Component: NotFoundPage },
    ],
  },

  // Admin Routes
  {
    Component: PrivateRoute,
    children: [
      {
        Component: AdminLayout,
        children: [
          { path: "/admin/dashboard", Component: Dashboard },
          { path: "/admin/products", Component: Products },
          { path: "/admin/orders", Component: Orders },
          { path: "/admin/comments", Component: Comments },
          { path: "/admin/users", Component: Users },
          { path: "/admin/discounts", Component: Discounts },
          { path: "/admin/tickets", Component: Tickets },
          { path: "/admin/profile", Component: Profile },
        ],
      },
    ],
  },
];

export default routes;
