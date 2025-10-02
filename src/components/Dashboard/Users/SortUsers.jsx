import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SortUsers({ query, setQuery }) {
  return (
    <div>
      <h4 className="text-xl font-semibold capitalize mt-5">Sorting</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
        <div>
          <span>Firstname</span>
          <Select value={query.sort} onValueChange={value => setQuery(prev => ({ ...prev, sort: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="sort by firstname" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">none</SelectItem>
              <SelectItem value="firstname-asc">A - Z</SelectItem>
              <SelectItem value="firstname-desc">Z - A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <span>Lastname</span>
          <Select value={query.sort} onValueChange={value => setQuery(prev => ({ ...prev, sort: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="sort by lastname" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">none</SelectItem>
              <SelectItem value="lastname-asc">A - Z</SelectItem>
              <SelectItem value="lastname-desc">Z - A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <span>Date</span>
          <Select value={query.sort} onValueChange={value => setQuery(prev => ({ ...prev, sort: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="sort by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">none</SelectItem>
              <SelectItem value="date-asc">oldest first</SelectItem>
              <SelectItem value="date-desc">newest first</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
