// Pages
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import PrivateRoute from "./pages/PrivateRoute/PrivateRoute";
import CartPage from "./pages/CartPage/CartPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import AppLayout from "./pages/AppLayout/AppLayout";

const routes = [
  // layout route
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
];

export default routes;
