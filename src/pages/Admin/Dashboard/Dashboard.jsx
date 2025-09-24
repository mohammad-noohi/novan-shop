import DashboardCardStat from "@/components/Dashboard/DashboardCardStat";
import DotStatus from "@/components/DotStatus";
import { Users, MoveUp, MoveDown, ChartSpline, ShoppingBag, Clock, FileDown, RefreshCcw, Circle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Rectangle, Cell, Pie, PieChart } from "recharts";
const recentOrdersData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const usersData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const data02 = [
  { name: "A1", value: 100 },
  { name: "A2", value: 300 },
  { name: "B1", value: 100 },
  { name: "B2", value: 80 },
  { name: "B3", value: 40 },
  { name: "B4", value: 30 },
  { name: "B5", value: 50 },
  { name: "C1", value: 100 },
  { name: "C2", value: 200 },
  { name: "D1", value: 150 },
  { name: "D2", value: 50 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-app-dark p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-slate-500">Welcome back! Here's what's happening.</p>
        </div>

        <div className="flex items-center gap-3">some content</div>
      </div>

      {/* Top Stats */}
      <div className="mt-5 grid gap-5 grid-cols-1 md:grid-cols-2  xl:grid-cols-4 ">
        {/* cart stat */}

        <DashboardCardStat title="Total Users" stat="8" icon={Clock} trendIcon={MoveUp} trendValue="+12.5%" trendColor="text-emerald-500" />

        <DashboardCardStat title="Revenu" stat="$54,320" icon={ChartSpline} trendIcon={MoveUp} trendValue="+8.2%" trendColor="text-emerald-500" />

        <DashboardCardStat title="Orders" stat="450" icon={ShoppingBag} trendIcon={MoveDown} trendValue="-2.1%" trendColor="text-red-500" />

        <DashboardCardStat title="Avg. Response" stat="2.3s" icon={Users} trendIcon={MoveUp} trendValue="+5.4%" trendColor="text-emerald-500" />
      </div>

      {/* Main Stats */}
      <div className="mt-5 grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* left column */}
        <div className="space-y-5">
          {/* Recent Orders chart */}
          <div className="rounded-lg bg-white dark:bg-suface-dark px-5 py-3 border border-slate-200 dark:border-slate-800">
            <h6 className="text-xl font-semibold">Order Status Distribution</h6>
            <div className="mt-5 flex h-60 items-center justify-center rounded-lg ">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart width={500} height={300} data={recentOrdersData} margin={{ top: 10, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Users chart */}
          <div className="rounded-lg bg-white dark:bg-suface-dark px-5 py-3 border border-slate-200 dark:border-slate-800">
            <h6 className="text-xl font-semibold">Users Overview</h6>
            <div className="mt-4 flex h-60 items-center justify-center rounded-lg ">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={usersData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pv" fill="#8884d8" />
                  <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenu chart */}
          <div className="rounded-lg bg-white dark:bg-suface-dark px-5 py-3 border border-slate-200 dark:border-slate-800">
            <h6 className="text-xl font-semibold">Revenue Overview</h6>
            <div className="mt-4 flex h-60 items-center justify-center rounded-lg ">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                  <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
                  <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* right column */}
        <div className="space-y-5">
          {/* Recent orders*/}
          <div className="rounded-lg bg-white dark:bg-suface-dark px-5 py-3 border border-slate-200 dark:border-slate-800">
            <h6 className="text-xl font-semibold">Recent Orders</h6>
            <div className="overflow-x-auto">
              <table className="bg-white dark:bg-app-dark text-nowrap w-full mt-5 text-center border-separate border-spacing-0 rounded-lg overflow-hidden">
                <thead>
                  <tr className="*:border *:border-slate-200 dark:*:border-slate-700 *:uppercase *:p-3 bg-slate-50 dark:bg-slate-900">
                    <th>id</th>
                    <th>consumer</th>
                    <th>product/s</th>
                    <th>date</th>
                    <th>status</th>
                    <th>total Price</th>
                  </tr>
                </thead>
                <tbody className="*:even:bg-slate-50 dark:*:even:bg-slate-900 *:transition-colors *:hover:bg-slate-100 dark:*:hover:bg-slate-800">
                  <tr className="*:border *:p-2 *:border-slate-200 dark:*:border-slate-700 ">
                    <td>2342</td>
                    <td>mohammad noohi</td>
                    <td>product</td>
                    <td>2025/04/05</td>
                    <td>paid</td>
                    <td>$38,000</td>
                  </tr>
                  <tr className="*:border *:p-2 *:border-slate-200 dark:*:border-slate-700">
                    <td>2342</td>
                    <td>mohammad noohi</td>
                    <td>product</td>
                    <td>2025/04/05</td>
                    <td>paid</td>
                    <td>$38,000</td>
                  </tr>
                  <tr className="*:border *:p-2 *:border-slate-200 dark:*:border-slate-700">
                    <td>2342</td>
                    <td>mohammad noohi</td>
                    <td>product</td>
                    <td>2025/04/05</td>
                    <td>paid</td>
                    <td>$38,000</td>
                  </tr>
                  <tr className="*:border *:p-2 *:border-slate-200 dark:*:border-slate-700">
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
          <div className="rounded-lg bg-white dark:bg-suface-dark px-5 py-3 border border-slate-200 dark:border-slate-800">
            <h6 className="text-xl font-semibold">Recent Users</h6>
            <div className="overflow-x-auto">
              <table className="bg-white dark:bg-app-dark text-nowrap w-full mt-5 text-center border-separate border-spacing-0 rounded-lg overflow-hidden">
                <thead>
                  <tr className="*:border *:border-slate-200 dark:*:border-slate-700 *:uppercase *:p-3 bg-slate-50 dark:bg-slate-900">
                    <th>id</th>
                    <th>avatar</th>
                    <th>user</th>
                    <th>role</th>
                    <th>joined</th>
                  </tr>
                </thead>
                <tbody className="*:even:bg-slate-50 dark:*:even:bg-slate-900 *:transition-colors *:hover:bg-slate-100 dark:*:hover:bg-slate-800">
                  <tr className="*:border *:p-2 *:border-slate-200 dark:*:border-slate-700 ">
                    <td>5345</td>
                    <td>
                      <div className="size-12 rounded-full overflow-hidden mx-auto">
                        <img src="/images/mohammad-noohi.jpeg" alt="avatar image" className="size-full" />
                      </div>
                    </td>
                    <td>mohammad noohi</td>
                    <td>product</td>
                    <td>2025/04/05</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Best-selling products */}
          <div className="rounded-lg bg-white dark:bg-suface-dark px-5 py-3 border border-slate-200 dark:border-slate-800">
            <h6 className="text-xl font-semibold">Best-selling products</h6>
            <div className="overflow-x-auto">
              <table className="bg-white dark:bg-app-dark text-nowrap w-full mt-5 text-center border-separate border-spacing-0 rounded-lg overflow-hidden">
                <thead>
                  <tr className="*:border *:border-slate-200 dark:*:border-slate-700 *:uppercase *:p-3 bg-slate-50 dark:bg-slate-900">
                    <th>thumbnail</th>
                    <th>title</th>
                    <th>category</th>
                    <th>units sold</th>
                    <th>revenu</th>
                    <th>stock status</th>
                  </tr>
                </thead>
                <tbody className="*:even:bg-slate-50 dark:*:even:bg-slate-900 *:transition-colors *:hover:bg-slate-100 dark:*:hover:bg-slate-800">
                  <tr className="*:border *:p-2 *:border-slate-200 dark:*:border-slate-700 ">
                    <td>
                      <div className="size-12  overflow-hidden mx-auto">
                        <img src="/images/products/Asus_ROG_Phone_8_Pro.png" alt="avatar image" className="size-full" />
                      </div>
                    </td>
                    <td>iPhone 15 Pro</td>
                    <td>Electronics</td>
                    <td>320</td>
                    <td>$384,000</td>
                    <td>
                      <p className="flex items-center justify-center gap-2">
                        <DotStatus color="green" />
                        <span>In Stock</span>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
