import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState(null); // ایدی محصولی که داره به سبد خرید اضافه میشه

  /*----------------- Functions & Handlers -----------------*/
  async function addToCart(product) {
    // set id of product to adding to cart
    setLoadingProductId(product.id);

    try {
      // 1. چک کردن stock از API
      const resp = await fetch(`http://localhost:3000/products/${product.id}`);
      const freshProduct = await resp.json();

      if (freshProduct.stock > 0) {
        // 2. کم کردن موجودی در API
        await decreaseStock(product.id);

        // 3. آپدیت محصولات در state
        await getAllProducts();

        // 4. آپدیت cart در state
        setCart(prevCart => {
          const hasProduct = prevCart.some(p => p.id === product.id);

          if (!hasProduct) {
            return [...prevCart, { ...freshProduct, count: 1 }];
          } else {
            return prevCart.map(p => (p.id === product.id ? { ...p, count: p.count + 1 } : p));
          }
        });
      } else {
        alert("Out of stock!");
      }
    } catch (err) {
      console.log("Add to cart error:", err.message);
    }
  }

  async function minusFromCart(product) {
    try {
      await increaseStock(product.id);
      await getAllProducts();

      setCart(prevCart => {
        return prevCart.map(p => {
          if (p.id === product.id) {
            return { ...p, count: p.count - 1 };
          } else {
            return p;
          }
        });
      });
    } catch (err) {
      console.log("minus product error", err.message);
    }
  }

  async function decreaseStock(productID) {
    try {
      setCartLoading(true);

      // 1. get product data
      const resp = await fetch(`http://localhost:3000/products/${productID}`);
      const productData = await resp.json();

      if (productData.stock > 0) {
        // 2. calc new stock
        const updatedStock = productData.stock - 1;

        // 3. update product in API
        await fetch(`http://localhost:3000/products/${productID}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ stock: updatedStock }),
        });
      }
    } catch (err) {
      console.log("Decrease stock error:", err.message);
      throw err;
    } finally {
      setCartLoading(false);
    }
  }

  async function increaseStock(productID) {
    const resp = await fetch(`http://localhost:3000/products/${productID}`);
    const freshProduct = await resp.json();

    const updatedStock = freshProduct.stock + 1;

    await fetch(`http://localhost:3000/products/${productID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stock: updatedStock }),
    });
  }

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

  async function removeFromCart(product) {
    console.log("product remove =>", product.title);
    setCart(prevCart => {
      return prevCart.filter(p => p.id !== product.id);
    });

    // update product stock in API
    const resp = await fetch(`http://localhost:3000/products/${product.id}`);
    const freshProduct = await resp.json();

    const updatedStock = freshProduct.stock + product.count;

    await fetch(`http://localhost:3000/products/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stock: updatedStock }),
    });

    await getAllProducts();
  }

  /*--------------- Effects ---------------*/
  useEffect(() => {
    getAllProducts();
  }, []);

  return <CartContext.Provider value={{ products, productsLoading, cart, cartLoading, loadingProductId, addToCart, minusFromCart, removeFromCart }}>{children}</CartContext.Provider>;
}

export { CartContext, CartProvider };
