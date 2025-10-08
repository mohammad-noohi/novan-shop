import ProductCard from "./ProductCard";

export default function RelatedProducts({ products }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold dark:text-white">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
