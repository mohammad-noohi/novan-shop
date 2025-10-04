import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

export default function OrderEditForm({ setModals, fetchOrders, selectedOrder }) {
  const [form, setForm] = useState({
    loading: false,
    status: selectedOrder?.status,
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (selectedOrder.status === form.status) {
      toast.info("nothing to changes");
      return;
    }

    const newInfo = {
      status: form.status,
    };

    try {
      setForm(prev => ({ ...prev, loading: true }));
      const resp = await fetch(`http://localhost:3000/orders/${selectedOrder.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInfo),
      });

      if (!resp.ok) throw new Error("failed to change order status");

      await fetchOrders();
      setModals(prev => ({ ...prev, edit: false }));
      toast.success(`order change from ${selectedOrder.status} to ${form.status}`);
    } catch (err) {
      console.log(err.message);
    } finally {
      setForm(prev => ({ ...prev, loading: false }));
    }
  }

  if (!selectedOrder) return null;

  return (
    <div>
      <h4 className="text-xl font-semibold capitalize">Edit Order</h4>
      <form onSubmit={handleSubmit} className="mt-5">
        <Select value={form.status} onValueChange={value => setForm(prev => ({ ...prev, status: value }))}>
          <SelectTrigger className="w-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>change order status</SelectLabel>
              <SelectItem value="paid">paid</SelectItem>
              <SelectItem value="pending">pending</SelectItem>
              <SelectItem value="canceled">canceled</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <button className="py-1 px-4 mt-5 bg-slate-500 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg text-lg capitalize cursor-pointer hover:bg-slate-600 text-white transition-colors disabled:opacity-50 disabled:pointer-none:">
          {form.loading ? "editing...." : "edit"}
        </button>
      </form>
    </div>
  );
}
