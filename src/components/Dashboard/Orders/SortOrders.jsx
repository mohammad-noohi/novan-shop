import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SortOrders({ query, setQuery }) {
  return (
    <div>
      <h4 className="text-xl font-semibold capitalize mt-5">Sorting</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
        <Select value={query.filters.sort} onValueChange={value => setQuery(prev => ({ ...prev, sort: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="sort by price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">cheap to expense</SelectItem>
            <SelectItem value="price-desc">expense to cheap</SelectItem>
          </SelectContent>
        </Select>

        <Select value={query.filters.sort} onValueChange={value => setQuery(prev => ({ ...prev, sort: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="sort by created at" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-asc">oldest first</SelectItem>
            <SelectItem value="date-desc">newest first</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
