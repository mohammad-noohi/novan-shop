import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import routes from "./routes.js";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ThemeProvider } from "./contexts/ThemeContext/ThemeContext.jsx";
import { AuthProvider } from "./contexts/AuthContext/AuthContext.jsx";
import { CartProvider } from "./contexts/CartContext/CartContext.jsx";
import { DiscountProvider } from "./contexts/DiscountContext/DiscountContext.jsx";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <DiscountProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </DiscountProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
