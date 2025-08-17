// Pages
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import PrivateRoute from "./pages/PrivateRoute/PrivateRoute";
import CartPage from "./pages/CartPage/CartPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const routes = [
  { path: "/", Component: ProductsPage },
  { path: "/login", Component: LoginPage },
  { path: "/register", Component: RegisterPage },
  // private routes
  { Component: PrivateRoute, children: [{ path: "/cart", Component: CartPage }] },

  { path: "*", Component: NotFoundPage },
];

export default routes;
