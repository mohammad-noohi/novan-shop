import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star } from "lucide-react";

export default function FilterProducts({ query, setQuery, categoryItems, brandItems }) {
  return (
    <div>
      <h4 className="text-xl font-semibold capitalize">filtering</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
        <div>
          <span>Category</span>
          <Select
            value={query.filters.category}
            onValueChange={value => {
              setQuery(prev => {
                return { ...prev, filters: { ...prev.filters, category: value } };
              });
            }}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="all">all</SelectItem>
                {categoryItems.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <span>Brand</span>
          <Select
            value={query.filters.brand}
            onValueChange={value => {
              setQuery(prev => {
                return { ...prev, filters: { ...prev.filters, brand: value } };
              });
            }}>
            <SelectTrigger>
              <SelectValue placeholder="Select a brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Brand</SelectLabel>
                <SelectItem value="all">all</SelectItem>
                {brandItems.map(brand => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <span>Stock</span>
          <Select
            value={query.filters.stock}
            onValueChange={value => {
              setQuery(prev => {
                return { ...prev, filters: { ...prev.filters, stock: value } };
              });
            }}>
            <SelectTrigger>
              <SelectValue placeholder="Select a stock status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Stock</SelectLabel>
                <SelectItem value="all">all</SelectItem>
                <SelectItem value="instock">in stock</SelectItem>
                <SelectItem value="outofstock">out of stock</SelectItem>
                <SelectItem value="lowstock">low stock</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <span>Discount</span>
          <Select
            value={query.filters.discount}
            onValueChange={value => {
              setQuery(prev => {
                return { ...prev, filters: { ...prev.filters, discount: value } };
              });
            }}>
            <SelectTrigger>
              <SelectValue placeholder="Select a discount" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Discount</SelectLabel>
                <SelectItem value="all">all</SelectItem>
                <SelectItem value="nodiscount">no discount</SelectItem>
                <SelectItem value="lowdiscount">1%-10%</SelectItem>
                <SelectItem value="highdiscount">10%-100%</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <span>Rate</span>
          <Select
            value={query.filters.rate}
            onValueChange={value => {
              setQuery(prev => {
                return { ...prev, filters: { ...prev.filters, rate: value } };
              });
            }}>
            <SelectTrigger>
              <SelectValue placeholder="Select a rate" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Rate</SelectLabel>
                <SelectItem value="all">all</SelectItem>
                <SelectItem value="1">
                  <Star className="size-4 text-yellow-500 fill-yellow-500" />
                </SelectItem>
                <SelectItem value="2">
                  <div className="flex items-center">
                    <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    <Star className="size-4 text-yellow-500 fill-yellow-500" />
                  </div>
                </SelectItem>
                <SelectItem value="3">
                  <div className="flex items-center">
                    <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    <Star className="size-4 text-yellow-500 fill-yellow-500" />
                  </div>
                </SelectItem>
                <SelectItem value="4">
                  <div className="flex items-center">
                    <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    <Star className="size-4 text-yellow-500 fill-yellow-500" />
                  </div>
                </SelectItem>
                <SelectItem value="5">
                  <div className="flex items-center">
                    <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    <Star className="size-4 text-yellow-500 fill-yellow-500" />
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
