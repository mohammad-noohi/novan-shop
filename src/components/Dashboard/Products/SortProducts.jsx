import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SortProducts({ query, setQuery }) {
  return (
    <div>
      <h4 className="text-xl font-semibold capitalize mt-5">Sorting</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
        <div>
          <span>Alphabatic</span>
          <Select
            value={query.sort}
            onValueChange={value => {
              setQuery(prev => ({ ...prev, sort: value }));
            }}>
            <SelectTrigger>
              <SelectValue placeholder="sort by name" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">A - Z</SelectItem>
              <SelectItem value="name-desc">Z - A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <span>Price</span>
          <Select
            value={query.sort}
            onValueChange={value => {
              setQuery(prev => ({ ...prev, sort: value }));
            }}>
            <SelectTrigger>
              <SelectValue placeholder="sort by price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">cheap to expense</SelectItem>
              <SelectItem value="price-desc">expense to cheap</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <span>Created At</span>
          <Select
            value={query.sort}
            onValueChange={value => {
              setQuery(prev => ({ ...prev, sort: value }));
            }}>
            <SelectTrigger>
              <SelectValue placeholder="sort by created at" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-asc">oldest first</SelectItem>
              <SelectItem value="date-desc">newest first</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <span>Stock</span>
          <Select
            value={query.sort}
            onValueChange={value => {
              setQuery(prev => ({ ...prev, sort: value }));
            }}>
            <SelectTrigger>
              <SelectValue placeholder="sort by stock" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stock-asc">low to high</SelectItem>
              <SelectItem value="stock-desc">hight to low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <span>Discount</span>
          <Select
            value={query.sort}
            onValueChange={value => {
              setQuery(prev => ({ ...prev, sort: value }));
            }}>
            <SelectTrigger>
              <SelectValue placeholder="sort by discount" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="discount-asc">lowest discount</SelectItem>
              <SelectItem value="discount-desc">highest discount</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          Rate
          <Select
            value={query.sort}
            onValueChange={value => {
              setQuery(prev => ({ ...prev, sort: value }));
            }}>
            <SelectTrigger>
              <SelectValue placeholder="sort by rate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rate-asc">lowest rated</SelectItem>
              <SelectItem value="rate-desc">highest rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
