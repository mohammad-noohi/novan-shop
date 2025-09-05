import { createContext, useState, useEffect, useCallback } from "react";
import { useAuthContext } from "../AuthContext/useAuthContext";

const CartContext = createContext();

function CartProvider({ children }) {
  const { user } = useAuthContext();
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);

  const [cart, setCart] = useState([]); // { productId: 101, count: 2 }
  const [cartId, setCartId] = useState(null);
  const [cartLoading, setCartLoading] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState(null); // ایدی محصولی که داره به سبد خرید اضافه میشه

  /*----------------- Fetchers -----------------*/

  async function getAllProducts() {
    try {
      setProductsLoading(true);
      const resp = await fetch("http://localhost:3000/products");
      const data = await resp.json();
      setProducts(data);
    } catch (err) {
      console.log("Get products error:", err.message);
    } finally {
      setProductsLoading(false);
    }
  }

  async function fetchCart() {
    try {
      setCartLoading(true);
      const resp = await fetch(`http://localhost:3000/carts?userId=${user.id}`);
      const data = await resp.json();
      setCart(data[0]?.items || []);
      setCartId(data[0].id);
    } catch (err) {
      console.log("faild fetch cart", err.message);
    } finally {
      setCartLoading(false);
    }
  }

  async function fetchProduct(ID) {
    const resp = await fetch(`http://localhost:3000/products/${ID}`);
    const data = await resp.json();
    return data;
  }

  /*----------------- Cart Handlers -----------------*/

  async function addToCart(ID) {
    setLoadingProductId(ID);

    try {
      const product = await fetchProduct(ID); // get product info from API
      const cartItem = cart.find(p => p.productId === ID); // undefined or object

      // Handle out of stock error
      if (!product.stock) {
        alert("Out of stock");
        return;
      }

      // Handle stock is not enough error
      if (cartItem && cartItem.count >= product.stock) {
        alert("Stock is not enough!");
        return;
      }

      // update cart state
      setCart(prevCart => {
        if (!cartItem) {
          // add new one
          return [...prevCart, { productId: ID, count: 1 }];
        } else {
          return prevCart.map(p => (p.productId === ID ? { ...p, count: p.count + 1 } : p));
        }
      });
    } catch (err) {
      console.log("Add to cart error", err.message);
    } finally {
      setLoadingProductId(null);
    }
  }

  function minusFromCart(ID) {
    setCart(prevCart => {
      return prevCart.map(p => (p.productId === ID ? { ...p, count: p.count - 1 } : p));
    });
  }

  function removeFromCart(ID) {
    setCart(prevCart => prevCart.filter(p => p.productId !== ID));
  }

  /*--------------- Sync With API ---------------*/
  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  useEffect(() => {
    if (user && cartId) {
      try {
        fetch(`http://localhost:3000/carts/${cartId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items: cart }),
        });
      } catch (err) {
        console.log("sync cart error", err.message);
      }
    }
  }, [cart, user, cartId]);

  /*--------------- Init ---------------*/
  useEffect(() => {
    getAllProducts();
  }, []);

  return <CartContext.Provider value={{ products, productsLoading, cart, cartLoading, loadingProductId, addToCart, minusFromCart, removeFromCart }}>{children}</CartContext.Provider>;
}

export { CartContext, CartProvider };
