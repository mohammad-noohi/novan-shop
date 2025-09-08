import { createContext, useState, useEffect } from "react";
import { useAuthContext } from "../AuthContext/useAuthContext";
import { useDiscountContext } from "../DiscountContext/useDiscountContext";

const CartContext = createContext();

function CartProvider({ children }) {
  const { discountsList } = useDiscountContext();
  const { user } = useAuthContext();
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);

  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [cartLoading, setCartLoading] = useState(false);
  // ایدی محصولی که داره به سبد خرید اضافه میشه
  const [loadingProductId, setLoadingProductId] = useState(null);

  const cartProducts = cart.map(item => {
    const product = products.find(p => p.id === item.productId);

    return {
      ...item,
      ...product,
    };
  });

  const totalPrice = cartProducts.reduce((acc, p) => {
    return acc + p.price * p.count;
  }, 0);

  // calc final price after apply discount
  let finalPrice = totalPrice;

  if (discountsList.length) {
    discountsList.forEach(item => {
      if (item.type === "percent") {
        finalPrice = finalPrice - (finalPrice * item.value) / 100;
      } else if (item.type === "fixed") {
        finalPrice = finalPrice - item.value;
      }
    });

    // check if discount more than price so the final price must be zero not negetive value.
    if (finalPrice < 0) finalPrice = 0;
  }

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
      setCartId(data[0]?.id || null);
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
    if (!user) {
      alert("please login first");
      return;
    }

    setLoadingProductId(ID);
    setCartLoading(true);

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

      if (!cartId) {
        // اگر کاربر قبلا چیزی به سبد خریدش اضافه نکرده بوده پس سبد خرید نداره و یکی براش میسازیم

        const resp = await fetch(`http://localhost:3000/carts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id, items: [{ productId: ID, count: 1 }] }),
        });

        const newCart = await resp.json();
        setCartId(newCart.id);
        setCart(newCart.items);
      } else {
        // این یعنی کاربر قبلا سبد خرید داشته پس فقط اپدیت کن
        setCart(prevCart => {
          if (!cartItem) {
            // add new one
            return [...prevCart, { productId: ID, count: 1 }];
          } else {
            return prevCart.map(p => (p.productId === ID ? { ...p, count: p.count + 1 } : p));
          }
        });
      }
    } catch (err) {
      console.log("Add to cart error", err.message);
    } finally {
      setLoadingProductId(null);
      setCartLoading(false);
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

  // اینجا در واقع داری ساده سازی میکنیم و در اصل فقط باید سفارش کاربر به صورت در حال انتظار یا همون پندینگ ذخیره بشه و بعد کاربر میره توی صفحه ی تسویه حساب و یه سری اطلاعات رو وارد میکنه و بعد سفارش به صورت پرداخت شده یا همون پید در میاد و بعدش موجودی انبار اپدیت میشه
  async function purchase() {
    setCartLoading(true);
    try {
      //  update latest products and cart data
      await getAllProducts();
      await fetchCart();

      //  Prepare order data
      const orderData = {
        userId: user.id,
        items: cart,
        status: "paid",
        createdAt: new Date().toISOString(),
        totalPrice: totalPrice,
        // discount: discount.length ? discount.code : null,
        finalPrice: finalPrice,
      };

      // update discount data in API
      if (discountsList.length) {
        await Promise.all(
          discountsList.map(async discount => {
            const resp = await fetch(`http://localhost:3000/discounts/${discount.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ usedCount: discount.usedCount + 1 }),
            });

            return resp.json();
          })
        );
      }

      // save used discount for current user
      if (discountsList.length) {
        const newUsedDiscounts = discountsList.filter(d => !d.allowMultipleUse).map(item => item.code);

        await fetch(`http://localhost:3000/users/${user.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ usedDiscounts: [...user.usedDiscounts, ...newUsedDiscounts] }),
        });
      }

      //  Post New Order
      await fetch(`http://localhost:3000/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      //  Update Products Stock in API & State
      await Promise.all(
        cart.map(async item => {
          const product = products.find(p => p.id === item.productId);
          if (!product) return null;

          const newStock = product.stock - item.count;

          const resp = await fetch(`http://localhost:3000/products/${item.productId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ stock: newStock }),
          });

          return await resp.json(); // return a promise
        })
      );

      await getAllProducts();
      setCart([]);
    } catch (err) {
      console.log("purchase error", err.message);
      throw err;
    } finally {
      setCartLoading(false);
    }
  }

  /*--------------- Sync With API ---------------*/
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      // if user logout user is null so clear cart
      setCart([]);
      setCartId(null);
    }
  }, [user]);

  useEffect(() => {
    // اگر کاربر برای اولین بار وارد سایت میشه تا زمانی که محصولی به سبد خرید اضافه نکنه هیچ سبد خرید براش ساخته نمیشه و این موضوع رو مستقیما توی تابع افزودن به سبد خرید انجام میدیم تا از ساخت سبد خرید های توخالی جلوگیری کنیم

    // اپدیت سبدخرید توی دیتابیس البته به شرطی که کاربر قبلا یه محصولی به سبد خرید اضافه کرده باشه
    async function syncCart() {
      if (user && cartId) {
        try {
          await fetch(`http://localhost:3000/carts/${cartId}`, {
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
    }

    syncCart();
  }, [cart, user, cartId]);

  /*--------------- Init ---------------*/
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <CartContext.Provider value={{ products, productsLoading, cart, cartLoading, loadingProductId, cartProducts, totalPrice, finalPrice, addToCart, minusFromCart, removeFromCart, purchase }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
