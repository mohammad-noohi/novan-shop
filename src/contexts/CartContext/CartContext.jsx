import { createContext, useState } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartLoading, setCartLoading] = useState(false);
  const [cart, setCart] = useState([]);

  /* Functions & Handlers */
  function addToCart() {
    // add product to cart state or need in user api data
    // or add user cart in localStorage
  }

  function removeFromCart() {
    // remove a product from cart
    // and update the state and localStorage
  }

  function decreaseProductFromCart() {
    // decrease product count
  }

  /* Effects */
  // may be need get user cart data in mount step.

  return <CartContext.Provider value={{}}>{children}</CartContext.Provider>;
}

export { CartContext, CartProvider };
