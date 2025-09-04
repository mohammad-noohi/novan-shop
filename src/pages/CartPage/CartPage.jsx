// icons
import { ArrowRight } from "lucide-react";
import { useCartContext } from "../../contexts/CartContext/useCartContext";
import CartProduct from "../../components/CartProduct";
import { Link } from "react-router";
import ProductCard from "../../components/ProductCard";

export default function CartPage() {
  /*------------- States -------------*/
  const { cart, products } = useCartContext();
  const categoriesSet = new Set(cart.map(p => p.category));
  const categories = Array.from(categoriesSet);
  const relatedProducts = products.filter(p => {
    if (categories.includes(p.category)) {
      return p;
    }
  });

  console.log(relatedProducts);
  const cartItemsCount = cart.length;
  const totalPrice = cart.reduce((acc, p) => {
    return acc + p.price;
  }, 0);

  /*----------------- UI -----------------*/
  return (
    <main className="py-10 bg-white dark:bg-app-dark">
      <div className="container">
        <section>
          <h2 className="text-2xl font-bold dark:text-white">Shopping Cart</h2>
          <div className="mt-5 flex flex-col lg:flex-row items-start gap-5 ">
            <article
              className="w-full lg:w-[70%] grow bg-slate-50 border border-slate-200 rounded-lg p-3 lg:p-5 dark:bg-suface-dark dark:border-slate-800"
              style={{ width: cart.length === 0 && "100%" }}>
              {/* products list */}
              <div className="flex flex-col gap-y-3 lg:gap-y-6">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center">
                    <h3 className="dark:text-red-700 text-3xl capitalize ">your cart is empty</h3>

                    <img src="images/Empty-cuate.png" className="max-h-100" alt="empty cart" />
                    <span className="dark:text-muted-dark mt-3 inline-block">please add some products in to your cart</span>
                    <Link
                      to="/"
                      className=" bg-brand flex items-center gap-2 hover:gap-3 transition-all mt-5 text-white py-3 px-6 rounded-lg cursor-pointer hover:bg-indigo-500   font-semibold dark:bg-indigo-500">
                      <span>see products</span>
                      <ArrowRight />
                    </Link>
                  </div>
                ) : (
                  cart.map(p => <CartProduct key={p.id} product={p} />)
                )}
              </div>
            </article>
            {/* cart sidebar */}
            {cart.length !== 0 && (
              <aside className="w-full lg:w-[30%] bg-slate-50 border border-slate-200 rounded-lg p-3 lg:p-5 dark:bg-suface-dark dark:border-slate-800">
                <h3 className="text-xl font-bold dark:text-white">Order Summary</h3>
                <div className="mt-3">
                  <p className="text-slate-600 dark:text-muted-dark">
                    <span>total items: </span>
                    <span>{cartItemsCount}</span>
                  </p>

                  <p className="text-slate-600 dark:text-muted-dark">
                    <span>discount value: </span>
                    <span>$10</span>
                  </p>
                </div>

                <div className="flex gap-3 mt-2.5">
                  <input
                    type="text"
                    placeholder="discount code"
                    className="border border-slate-200 rounded-lg p-3 w-full outline-none focus:ring focus:ring-brand caret-brand transition-all dark:bg-app-dark dark:border-slate-800"
                  />
                  <button className="capitalize bg-brand text-white py-3 px-6 rounded-lg cursor-pointer hover:bg-indigo-500 dark:bg-indigo-500">apply</button>
                </div>

                <div className="flex flex-col gap-2.5 mt-10">
                  <p className="flex items-center justify-between">
                    <span className="text-lg font-bold dark:text-white">Total</span>
                    <span className="text-lg font-bold text-brand dark:text-indigo-500">${totalPrice}</span>
                  </p>

                  <button className="bg-brand text-white py-3 px-6 rounded-lg cursor-pointer w-full hover:bg-indigo-500 transition  font-semibold dark:bg-indigo-500">purchase</button>
                </div>
              </aside>
            )}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold dark:text-white">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
