import { Table, TableBody, TableHeader, TableColumn, TableRow, TableCell, Chip, Button } from "@heroui/react";
import { Users, MoveUp, MoveDown, ChartSpline, ShoppingBag, Clock, FileDown, RefreshCcw } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-slate-500">Welcome back! Here's what's happening.</p>
        </div>

        <div className="flex items-center gap-3">
          <Button title="download data" isIconOnly className="bg-white">
            <FileDown />
          </Button>
          <Button title="refresh data" isIconOnly className="bg-white">
            <RefreshCcw />
          </Button>
        </div>
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
            <Table className="mt-4">
              <TableHeader>
                <TableColumn>ORDER ID</TableColumn>
                <TableColumn>CUSTOMER</TableColumn>
                <TableColumn>AMOUNT</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>DATE</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell>5148</TableCell>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>$265.01</TableCell>
                  <TableCell>
                    <Chip className="bg-emerald-500 text-white">Paid</Chip>
                  </TableCell>
                  <TableCell>2025/8/7</TableCell>
                </TableRow>
                <TableRow key="2">
                  <TableCell>5148</TableCell>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>$265.01</TableCell>
                  <TableCell>
                    <Chip className="bg-red-500 text-white">Cancelled</Chip>
                  </TableCell>
                  <TableCell>2025/8/7</TableCell>
                </TableRow>
                <TableRow key="3">
                  <TableCell>5148</TableCell>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>$265.01</TableCell>
                  <TableCell>
                    <Chip className="bg-amber-500 text-white">Pending</Chip>
                  </TableCell>
                  <TableCell>2025/8/7</TableCell>
                </TableRow>
                <TableRow key="4">
                  <TableCell>5148</TableCell>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>$265.01</TableCell>
                  <TableCell>
                    <Chip className="bg-blue-500 text-white">Shipped</Chip>
                  </TableCell>
                  <TableCell>2025/8/7</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Recent Users */}
          <div className="rounded-lg bg-white px-5 py-3 shadow">
            <h6 className="text-xl font-semibold">Recent Users</h6>
            <Table className="mt-4">
              <TableHeader>
                <TableColumn>FULL NAME</TableColumn>
                <TableColumn>ROLE</TableColumn>
                <TableColumn>EMAIL</TableColumn>
                <TableColumn>REGISTER AT</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Mohammad Noohi</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>noohi.m98@gmail.com</TableCell>
                  <TableCell>2025/9/10</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Mohammad Noohi</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>noohi.m98@gmail.com</TableCell>
                  <TableCell>2025/9/10</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Mohammad Noohi</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>noohi.m98@gmail.com</TableCell>
                  <TableCell>2025/9/10</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Mohammad Noohi</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>noohi.m98@gmail.com</TableCell>
                  <TableCell>2025/9/10</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Best-selling products */}
          <div className="rounded-lg bg-white px-5 py-3 shadow">
            <h6 className="text-xl font-semibold">Best-selling products</h6>
            <Table className="mt-4">
              <TableHeader>
                <TableColumn>PRODUCT ID</TableColumn>
                <TableColumn>NAME</TableColumn>
                <TableColumn>COUNT</TableColumn>
                <TableColumn>TOTAL PRICE</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>12313</TableCell>
                  <TableCell>Mackbook pro m1</TableCell>
                  <TableCell>50</TableCell>
                  <TableCell>$90,000</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>12313</TableCell>
                  <TableCell>Mackbook pro m1</TableCell>
                  <TableCell>50</TableCell>
                  <TableCell>$90,000</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>12313</TableCell>
                  <TableCell>Mackbook pro m1</TableCell>
                  <TableCell>50</TableCell>
                  <TableCell>$90,000</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>12313</TableCell>
                  <TableCell>Mackbook pro m1</TableCell>
                  <TableCell>50</TableCell>
                  <TableCell>$90,000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
