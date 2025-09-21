import { Users, MoveUp, MoveDown, ChartSpline, ShoppingBag, Clock, FileDown, RefreshCcw } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-slate-500">Welcome back! Here's what's happening.</p>
        </div>

        <div className="flex items-center gap-3">some content</div>
      </div>

      {/* Top Stats */}
      <div className="mt-5 grid gap-5 lg:grid-cols-4">
        {/* cart stat */}
        <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="inline-flex items-center justify-center rounded-lg bg-slate-200 p-3">
            <Clock />
          </div>
          <div>
            <h6 className="text-lg font-semibold text-slate-600">Total Users</h6>
            <p className="text-2xl font-semibold leading-4">8</p>
            <p className="mt-2 flex items-center gap-1 text-xs text-emerald-500">
              <MoveUp className="size-4" />
              <span>+12.5%</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="inline-flex items-center justify-center rounded-lg bg-slate-200 p-3">
            <ChartSpline />
          </div>
          <div>
            <h6 className="text-lg font-semibold text-slate-600">Revenue</h6>
            <p className="text-2xl font-semibold leading-4">$54,320</p>
            <p className="mt-2 flex items-center gap-1 text-xs text-emerald-500">
              <MoveUp className="size-4" />
              <span>+8.2%</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="inline-flex items-center justify-center rounded-lg bg-slate-200 p-3">
            <ShoppingBag />
          </div>
          <div>
            <h6 className="text-lg font-semibold text-slate-600">Orders</h6>
            <p className="text-2xl font-semibold leading-4">8</p>
            <p className="mt-2 flex items-center gap-1 text-xs text-red-500">
              <MoveDown className="size-4" />
              <span>-2.1%</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="inline-flex items-center justify-center rounded-lg bg-slate-200 p-3">
            <Users />
          </div>
          <div>
            <h6 className="text-lg font-semibold text-slate-600">Avg. Response</h6>
            <p className="text-2xl font-semibold leading-4">2.3s</p>
            <p className="mt-2 flex items-center gap-1 text-xs text-emerald-500">
              <MoveUp className="size-4" />
              <span>+5.4%</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Stats */}
      <div className="mt-5 flex items-start gap-5">
        {/* left column */}
        <div className="w-1/2 space-y-5">
          {/* Recent Orders chart */}
          <div className="rounded-lg bg-white px-5 py-3 shadow">
            <h6 className="text-xl font-semibold">Order Status Distribution</h6>
            <div className="mt-4 flex h-60 items-center justify-center rounded-lg bg-slate-200">chart</div>
          </div>

          {/* Users chart */}
          <div className="rounded-lg bg-white px-5 py-3 shadow">
            <h6 className="text-xl font-semibold">Users Overview</h6>
            <div className="mt-4 flex h-60 items-center justify-center rounded-lg bg-slate-200">chart</div>
          </div>

          {/* Revenu chart */}
          <div className="rounded-lg bg-white px-5 py-3 shadow">
            <h6 className="text-xl font-semibold">Revenue Overview</h6>
            <div className="mt-4 flex h-60 items-center justify-center rounded-lg bg-slate-200">chart</div>
          </div>
        </div>

        {/* right column */}
        <div className="w-1/2 space-y-5">
          {/* Recent orders*/}
          <div className="rounded-lg bg-white px-5 py-3 shadow">
            <h6 className="text-xl font-semibold">Recent Orders</h6>
            <div className="overflow-x-auto">
              <table className="bg-white w-full mt-5 text-center border-separate border-spacing-0 rounded-lg overflow-hidden">
                <thead>
                  <tr className="*:border *:border-slate-200 *:uppercase *:p-3 bg-slate-50">
                    <th>id</th>
                    <th>consumer</th>
                    <th>product/s</th>
                    <th>date</th>
                    <th>status</th>
                    <th>total Price</th>
                  </tr>
                </thead>
                <tbody className="*:even:bg-slate-50 *:transition-colors *:hover:bg-slate-100">
                  <tr className="*:border *:p-2 *:border-slate-200 ">
                    <td>2342</td>
                    <td>mohammad noohi</td>
                    <td>product</td>
                    <td>2025/04/05</td>
                    <td>paid</td>
                    <td>$38,000</td>
                  </tr>
                  <tr className="*:border *:p-2 *:border-slate-200">
                    <td>2342</td>
                    <td>mohammad noohi</td>
                    <td>product</td>
                    <td>2025/04/05</td>
                    <td>paid</td>
                    <td>$38,000</td>
                  </tr>
                  <tr className="*:border *:p-2 *:border-slate-200">
                    <td>2342</td>
                    <td>mohammad noohi</td>
                    <td>product</td>
                    <td>2025/04/05</td>
                    <td>paid</td>
                    <td>$38,000</td>
                  </tr>
                  <tr className="*:border *:p-2 *:border-slate-200">
                    <td>2342</td>
                    <td>mohammad noohi</td>
                    <td>product</td>
                    <td>2025/04/05</td>
                    <td>paid</td>
                    <td>$38,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Users */}
          <div className="rounded-lg bg-white px-5 py-3 shadow">
            <h6 className="text-xl font-semibold">Recent Users</h6>
            <table className="bg-white w-full mt-5 text-center border-separate border-spacing-0 rounded-lg overflow-hidden">
              <thead>
                <tr className="*:border *:border-slate-200 *:uppercase *:p-3 bg-slate-50">
                  <th>id</th>
                  <th>avatar</th>
                  <th>user</th>
                  <th>role</th>
                  <th>joined</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody className="*:even:bg-slate-50 *:transition-colors *:hover:bg-slate-100">
                <tr className="*:border *:p-2 *:border-slate-200 ">
                  <td>5345</td>
                  <td>avatar</td>
                  <td>mohammad noohi</td>
                  <td>product</td>
                  <td>2025/04/05</td>
                  <td>
                    <button className="text-lg capitalize rounded-lg bg-slate-300 py-1 px-4 cursor-pointer">view</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Best-selling products */}
          <div className="rounded-lg bg-white px-5 py-3 shadow">
            <h6 className="text-xl font-semibold">Best-selling products</h6>
            <table className="bg-white w-full mt-5 text-center border-separate border-spacing-0 rounded-lg overflow-hidden">
              <thead>
                <tr className="*:border *:border-slate-200 *:uppercase *:p-3 bg-slate-50">
                  <th>thumbnail</th>
                  <th>title</th>
                  <th>category</th>
                  <th>units sold</th>
                  <th>revenu</th>
                  <th>stock status</th>
                </tr>
              </thead>
              <tbody className="*:even:bg-slate-50 *:transition-colors *:hover:bg-slate-100">
                <tr className="*:border *:p-2 *:border-slate-200 ">
                  <td>img</td>
                  <td>iPhone 15 Pro</td>
                  <td>Electronics</td>
                  <td>320</td>
                  <td>$384,000</td>
                  <td>🟢 In Stock</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
