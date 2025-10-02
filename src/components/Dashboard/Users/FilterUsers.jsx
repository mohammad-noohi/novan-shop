import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FilterUsers({ query, setQuery }) {
  const roleItems = ["user", "admin"];
  return (
    <div>
      <h4 className="text-xl font-semibold capitalize">filtering</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
        <div>
          <span>Role</span>
          <Select value={query.filters.role} onValueChange={value => setQuery(prev => ({ ...prev, filters: { role: value } }))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">all</SelectItem>
              {roleItems.map(role => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
