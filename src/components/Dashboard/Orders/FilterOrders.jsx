import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import DatePicker from "@/components/DatePicker";

export default function FilterOrders({ query, setQuery }) {
  return (
    <div>
      <h4 className="text-xl font-semibold capitalize">filtering</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
        <Select value={query.filters.status} onValueChange={value => setQuery(prev => ({ ...prev, filters: { ...prev.filters, status: value } }))}>
          <SelectTrigger>
            <SelectValue placeholder="filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>status</SelectLabel>
              <SelectItem value="all">all</SelectItem>
              <SelectItem value="paid">paid</SelectItem>
              <SelectItem value="pending">pending</SelectItem>
              <SelectItem value="canceled">canceled</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <DatePicker
          labelText="from :"
          selected={query.filters.fromDate}
          onSelect={newDate => {
            console.log("change from date");
            setQuery(prev => ({
              ...prev,
              filters: { ...prev.filters, fromDate: newDate },
            }));
          }}
        />
        <DatePicker
          labelText="to :"
          selected={query.filters.toDate}
          onSelect={newDate =>
            setQuery(prev => ({
              ...prev,
              filters: { ...prev.filters, toDate: newDate },
            }))
          }
        />
      </div>
    </div>
  );
}
