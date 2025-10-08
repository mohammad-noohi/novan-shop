import { useCartContext } from "../../contexts/CartContext/useCartContext";
import CartProduct from "../../components/CartProduct";
import { Link } from "react-router";
import ProductCard from "../../components/ProductCard";
import RelatedProducts from "@/components/RelatedProducts";
import CartSummarySideBar from "@/components/CartSummarySideBar";
import EmptyCart from "@/components/EmptyCart";

export default function CartPage() {
  /*------------- States -------------*/
  const { products, cartProducts } = useCartContext();

  // Drived States ( calculdate the related products )
  const categoriesSet = new Set(cartProducts.map(p => p.category));
  const categories = Array.from(categoriesSet);
  const relatedProducts = products.filter(p => {
    if (categories.includes(p.category)) {
      return p;
    }
  });

  /*----------------- UI -----------------*/
  return (
    <main className="py-10 bg-white dark:bg-app-dark">
      <div className="container">
        <section>
          <h2 className="text-2xl font-bold dark:text-white">Shopping Cart</h2>
          <div className="mt-5 flex flex-col lg:flex-row items-start gap-5 ">
            <article
              className="w-full lg:w-[70%] grow bg-slate-50 border border-slate-200 rounded-lg p-3 lg:p-5 dark:bg-suface-dark dark:border-slate-800"
              style={{ width: cartProducts.length === 0 && "100%" }}>
              {/* products list */}
              <div className="flex flex-col gap-y-3 lg:gap-y-6">{cartProducts.length === 0 ? <EmptyCart /> : cartProducts.map(p => <CartProduct key={p.id} product={p} />)}</div>
            </article>
            {/* cart sidebar */}
            {cartProducts.length !== 0 && <CartSummarySideBar />}
          </div>
        </section>

        {relatedProducts.length > 0 ? <RelatedProducts products={relatedProducts} /> : null}
      </div>
    </main>
  );
}
