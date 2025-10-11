import { createContext, useState, useEffect, useCallback } from "react";
import { useAuthContext } from "../AuthContext/useAuthContext";
import { toast } from "sonner";
import { BASE_API_URL } from "../../../constants";

const CartContext = createContext();

function CartProvider({ children }) {
  const { user } = useAuthContext();

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [cartLoading, setCartLoading] = useState(false);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState(null);

  const cartProducts = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, ...product };
  });

  const totalPrice = cartProducts.reduce((acc, p) => acc + p.price * p.count, 0);

  /*----------------- Fetchers -----------------*/

  const getAllProducts = useCallback(async () => {
    try {
      setProductsLoading(true);
      const resp = await fetch(`${BASE_API_URL}/products`);
      const data = await resp.json();
      setProducts(data);
      return data;
    } catch (err) {
      console.log("Get products error:", err.message);
    } finally {
      setProductsLoading(false);
    }
  }, []);

  const fetchCart = useCallback(async () => {
    if (!user) return;
    try {
      setCartLoading(true);
      const resp = await fetch(`${BASE_API_URL}/carts?userId=${user.id}`);
      const data = await resp.json();
      setCart(data[0]?.items || []);
      setCartId(data[0]?.id || null);
    } catch (err) {
      console.log("Fetch cart error:", err.message);
    } finally {
      setCartLoading(false);
    }
  }, [user]);

  async function fetchProduct(ID) {
    const resp = await fetch(`${BASE_API_URL}/products/${ID}`);
    return await resp.json();
  }

  /*----------------- Cart Handlers -----------------*/
  async function addToCart(ID) {
    if (!user) {
      toast.info("Please login first", { classNames: { toast: "dark:bg-suface-dark! dark:text-white!" } });
      return;
    }

    setLoadingProductId(ID);
    setCartLoading(true);

    try {
      const product = await fetchProduct(ID);
      const cartItem = cart.find(p => p.productId === ID);

      if (!product.stock) {
        toast.error("Out of stock", { classNames: { toast: "dark:bg-suface-dark! dark:text-white!" } });
        return;
      }

      if (cartItem && cartItem.count >= product.stock) {
        toast.error("Stock is not enough", { classNames: { toast: "dark:bg-suface-dark! dark:text-white!" } });
        return;
      }

      if (!cartId) {
        const resp = await fetch(`${BASE_API_URL}/carts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, items: [{ productId: ID, count: 1 }] }),
        });
        const newCart = await resp.json();
        setCartId(newCart.id);
        setCart(newCart.items);
      } else {
        setCart(prevCart => {
          if (!cartItem) return [...prevCart, { productId: ID, count: 1 }];
          return prevCart.map(p => (p.productId === ID ? { ...p, count: p.count + 1 } : p));
        });
      }

      toast.success("Product added successfully", { classNames: { toast: "dark:bg-suface-dark! dark:text-green-600!" } });
    } catch (err) {
      console.log("Add to cart error:", err.message);
    } finally {
      setLoadingProductId(null);
      setCartLoading(false);
    }
  }

  function minusFromCart(ID) {
    setCart(prevCart => prevCart.map(p => (p.productId === ID ? { ...p, count: p.count - 1 } : p)));
    toast.success("Reduced product quantity", { classNames: { toast: "dark:bg-suface-dark! dark:text-green-600!" } });
  }

  function removeFromCart(ID) {
    setCart(prevCart => prevCart.filter(p => p.productId !== ID));
  }

  /*----------------- Purchase -----------------*/
  async function purchase({ appliedDiscounts = [], finalPrice }) {
    if (!user) return;

    setPurchaseLoading(true);
    setCartLoading(true);

    try {
      await getAllProducts();
      await fetchCart();

      const orderData = {
        userId: user.id,
        items: cart,
        status: "paid",
        createdAt: new Date().toISOString(),
        totalPrice,
        finalPrice,
        appliedDiscounts,
      };

      // Update stock for each product
      await Promise.all(
        cart.map(async item => {
          const product = products.find(p => p.id === item.productId);
          if (!product) return;

          const newStock = product.stock - item.count;
          await fetch(`${BASE_API_URL}/products/${item.productId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ stock: newStock }),
          });
        })
      );

      // Update discount usage count in API
      await Promise.all(
        appliedDiscounts.map(async discount => {
          const resp = await fetch(`${BASE_API_URL}/discounts/${discount.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usedCount: discount.usedCount + 1 }),
          });
          return resp.json();
        })
      );

      // Update user's used discounts
      const singleUseCodes = appliedDiscounts.filter(d => !d.allowMultipleUse).map(d => d.code);
      if (singleUseCodes.length) {
        await fetch(`${BASE_API_URL}/users/${user.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usedDiscounts: [...user.usedDiscounts, ...singleUseCodes] }),
        });
      }

      // Post new order
      await fetch(`${BASE_API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      toast.success("Your order has been placed.", {
        onAutoClose: () => setCart([]),
        duration: 1500,
      });
    } catch (err) {
      console.log("Purchase error:", err.message);
      throw err;
    } finally {
      setCartLoading(false);
      setPurchaseLoading(false);
    }
  }

  /*----------------- Effects -----------------*/
  useEffect(() => {
    if (user) fetchCart();
    else {
      setCart([]);
      setCartId(null);
    }
  }, [user, fetchCart]);

  useEffect(() => {
    async function syncCart() {
      if (user && cartId) {
        try {
          await fetch(`${BASE_API_URL}/carts/${cartId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: cart }),
          });
        } catch (err) {
          console.log("Sync cart error:", err.message);
        }
      }
    }
    syncCart();
  }, [cart, user, cartId]);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <CartContext.Provider
      value={{
        products,
        productsLoading,
        cart,
        cartLoading,
        purchaseLoading,
        loadingProductId,
        cartProducts,
        totalPrice,
        addToCart,
        minusFromCart,
        removeFromCart,
        purchase,
        getAllProducts,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
