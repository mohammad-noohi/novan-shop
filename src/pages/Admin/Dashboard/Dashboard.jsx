import DashboardCardStat from "@/components/Dashboard/DashboardCardStat";
import DotStatus from "@/components/DotStatus";
import FallbackImage from "@/components/FallbackImage";
import { useCartContext } from "@/contexts/CartContext/useCartContext";
import { Users, MoveUp, MoveDown, ChartSpline, ShoppingBag, Boxes, FileDown, RefreshCcw, Circle } from "lucide-react";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Rectangle, Cell, Pie, PieChart } from "recharts";

export default function Dashboard() {
  const { products } = useCartContext();
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  console.log("orders =>", orders);

  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalRevenu = orders.reduce((acc, cur) => acc + cur.finalPrice, 0);
  const totalUsers = users.length;
  const recentOrders = orders.slice(0, 10); // اینو باید یه چندتا محصول بخرم و شاید نیاز باشه دیتایی که سمت سرور میفرستم رو تغییر بدم یا چیزی رو اضافه کنم
  const recentUsers = users.slice(0, 10);

  const monthlyUserCounts = users.reduce((acc, user) => {
    const date = new Date(user.createdAt);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // همیشه دو رقمی
    const monthKey = `${date.getFullYear()}-${month}`; // e.g., "2025-09"
    const monthLabel = date.toLocaleString("default", { month: "long", year: "numeric" });

    const existing = acc.find(item => item.key === monthKey);
    if (existing) {
      existing.quantity += 1;
    } else {
      acc.push({ key: monthKey, month: monthLabel, quantity: 1 });
    }

    return acc;
  }, []);

  // we need key just to sort data by date
  monthlyUserCounts.sort((a, b) => new Date(a.key + "-01") - new Date(b.key + "-01"));

  // Remove the key before final output
  const usersChartData = monthlyUserCounts.map(({ month, quantity }) => ({ month, quantity }));

  const monthlyOrdersCount = orders.reduce((acc, order) => {
    const date = new Date(order.createdAt);
    const month = date.getMonth();
    const monthKey = `${date.getFullYear()}-${month}`;
    const monthLabel = date.toLocaleDateString("default", { month: "long", year: "numeric" });

    const existing = acc.find(item => item.key === monthKey);
    if (existing) {
      existing.quantity += 1;
    } else {
      acc.push({ key: monthKey, month: monthLabel, quantity: 1 });
    }

    return acc;
  }, []);

  monthlyOrdersCount.sort((a, b) => new Date(a.key + "-01") - new Date(b.key + "-01"));
  const oredersChartData = monthlyOrdersCount.map(({ month, quantity }) => ({ month, quantity }));

  const monthlyRevenu = orders.reduce((acc, order) => {
    const date = new Date(order.createdAt);
    const month = date.getMonth();
    const monthKey = `${date.getFullYear()}-${month}`;
    const monthLabel = date.toLocaleString("default", { month: "long", year: "numeric" });

    const existing = acc.find(item => item.key === monthKey);
    if (existing) {
      existing.price += order.finalPrice;
    } else {
      acc.push({ key: monthKey, month: monthLabel, price: order.finalPrice });
    }

    return acc;
  }, []);

  monthlyRevenu.sort((a, b) => new Date(a.key + "-01") - new Date(b.key + "-01"));
  const revenuChartData = monthlyRevenu.map(({ month, price }) => ({ month, price }));

  console.log(revenuChartData);

  /*----------------------- Functions -----------------------*/

  async function fetchOrders() {
    try {
      const resp = await fetch("http://localhost:3000/orders");
      if (!resp.ok) throw new Error("can't fetch orders");
      const data = await resp.json();
      setOrders(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function fetchUsers() {
    try {
      const resp = await fetch("http://localhost:3000/users");
      if (!resp.ok) throw new Error("can't fetch users");
      const data = await resp.json();
      setUsers(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    (async () => {
      await fetchOrders();
      await fetchUsers();
    })();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-app-dark p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-slate-500">Welcome back! Here's what's happening.</p>
        </div>
      </div>

      {/* Top Stats */}
      <div className="mt-5 grid gap-5 grid-cols-1 md:grid-cols-2  xl:grid-cols-4 ">
        {/* cart stat */}

        <DashboardCardStat title="Total Users" stat={totalUsers} icon={Users} trendIcon={MoveUp} trendValue="+12.5%" trendColor="text-emerald-500" />

        <DashboardCardStat title="Revenu" stat={"$" + totalRevenu.toLocaleString()} icon={ChartSpline} trendIcon={MoveUp} trendValue="+8.2%" trendColor="text-emerald-500" />

        <DashboardCardStat title="Orders" stat={totalOrders} icon={ShoppingBag} trendIcon={MoveDown} trendValue="-2.1%" trendColor="text-red-500" />

        <DashboardCardStat title="total products" stat={totalProducts} icon={Boxes} trendIcon={MoveUp} trendValue="+5.4%" trendColor="text-emerald-500" />
      </div>

      {/* Main Stats */}
      <div className="mt-5 grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* left column */}
        <div className="space-y-5">
          {/* Recent Orders chart */}
          <div className="rounded-lg bg-white dark:bg-suface-dark px-5 py-3 border border-slate-200 dark:border-slate-800">
            <h6 className="text-xl font-semibold">Order Status Distribution</h6>
            {oredersChartData.length > 0 ? (
              <div className="mt-5 flex h-60 items-center justify-center rounded-lg ">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart width={500} height={300} data={oredersChartData} margin={{ top: 10, right: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="quantity" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="p-3 rounded-lg bg-red-50 mt-4 text-red-500">No orders have been placed yet.</p>
            )}
          </div>

          {/* Revenu chart */}
          <div className="rounded-lg bg-white dark:bg-suface-dark px-5 py-3 border border-slate-200 dark:border-slate-800">
            <h6 className="text-xl font-semibold">Revenue Overview</h6>
            <div className="mt-4 flex h-60 items-center justify-center rounded-lg ">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={revenuChartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="price" fill="cornflowerblue" />
                </BarChart>
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
                  data={usersChartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="quantity" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* right column */}
        <div className="space-y-5">
          {/* Recent orders*/}
          {recentOrders.length > 0 ? (
            <div className="rounded-lg bg-white dark:bg-suface-dark px-5 py-3 border border-slate-200 dark:border-slate-800">
              <h6 className="text-xl font-semibold">Recent Orders</h6>
              <div className="overflow-x-auto">
                <table className="bg-white dark:bg-app-dark text-nowrap w-full mt-5 text-center border-separate border-spacing-0 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="*:border *:border-slate-200 dark:*:border-slate-700 *:uppercase *:p-3 bg-slate-50 dark:bg-slate-900">
                      <th>id</th>
                      <th>consumer</th>
                      <th>date</th>
                      <th>status</th>
                      <th>total Price</th>
                      <th>final Price</th>
                      {/* <th>product/s</th> */}
                    </tr>
                  </thead>
                  <tbody className="*:even:bg-slate-50 dark:*:even:bg-slate-900 *:transition-colors *:hover:bg-slate-100 dark:*:hover:bg-slate-800">
                    {recentOrders.map(order => {
                      const user = users.find(user => user.id === order.userId);
                      if (user) {
                        return (
                          <tr key={order.id} className="*:border *:p-2 *:border-slate-200 dark:*:border-slate-700 ">
                            <td>{order.id}</td>
                            <td>
                              {user.firstname} {user.lastname}
                            </td>
                            <td>{order.createdAt?.split("T")[0]}</td>
                            <td>{order.status}</td>
                            <td>${order.totalPrice.toLocaleString()}</td>
                            <td>${order.finalPrice.toLocaleString()}</td>
                            {/* <td>see</td> */}
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          {/* Recent Users */}
          {recentUsers.length > 0 ? (
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
                    {recentUsers.map(user => (
                      <tr key={user.id} className="*:border *:p-2 *:border-slate-200 dark:*:border-slate-700 ">
                        <td>{user.id}</td>
                        <td>
                          <div className="size-12 rounded-full overflow-hidden mx-auto">
                            <FallbackImage src={`/${user.profile}`} alt="avatar image" className="size-full object-cover" />
                          </div>
                        </td>
                        <td>
                          {user.firstname} {user.lastname}
                        </td>
                        <td>{user.role}</td>
                        <td>{user.createdAt?.split("T")[0]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
