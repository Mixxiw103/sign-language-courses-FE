import {
  ShoppingCart,
  Package,
  Users,
  BadgeDollarSign,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Demo data
const sales = [
  { month: "Jan", value: 4200 },
  { month: "Feb", value: 3800 },
  { month: "Mar", value: 5200 },
  { month: "Apr", value: 4900 },
  { month: "May", value: 6400 },
  { month: "Jun", value: 5900 },
];

const recentOrders = [
  { id: "#1234", customer: "Sarah Johnson", status: "Delivered", total: 45.9 },
  { id: "#1235", customer: "Mike Chen", status: "Pending", total: 32.5 },
  { id: "#1236", customer: "Emma Wilson", status: "Preparing", total: 78.2 },
  { id: "#1237", customer: "David Brown", status: "Delivered", total: 29.99 },
  { id: "#1238", customer: "Lisa Anderson", status: "Cancelled", total: 52.3 },
];

const StatCard = ({ label, value, delta, positive, icon }) => (
  <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-100 p-5 flex items-center gap-4">
    <div className="flex-1">
      <p className="text-sm text-slate-500">{label}</p>
      <div className="mt-1 text-2xl font-semibold text-slate-800">{value}</div>
      <div
        className={`mt-1 text-xs flex items-center gap-1 ${
          positive ? "text-emerald-600" : "text-rose-600"
        }`}
      >
        <span>{positive ? "↗" : "↘"}</span>
        <span className="font-medium">{delta}</span>
        <span className="text-slate-400">vs last month</span>
      </div>
    </div>
    <div className="shrink-0 h-12 w-12 rounded-xl bg-emerald-50 grid place-items-center text-emerald-600">
      {icon}
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const map = {
    Delivered: "bg-emerald-100 text-emerald-700",
    Pending: "bg-amber-100 text-amber-700",
    Preparing: "bg-indigo-100 text-indigo-700",
    Cancelled: "bg-rose-100 text-rose-700",
  };
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        map[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
};

export default function DashboardHome() {
  return (
    <div className="px-6 pb-8">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Orders Today"
          value={24}
          delta="+12%"
          positive
          icon={<ShoppingCart />}
        />
        <StatCard
          label="Revenue"
          value="$2,847"
          delta="+8%"
          positive
          icon={<BadgeDollarSign />}
        />
        <StatCard
          label="Pending Orders"
          value={7}
          delta="-3%"
          positive={false}
          icon={<Package />}
        />
        <StatCard
          label="Active Customers"
          value={156}
          delta="+15%"
          positive
          icon={<Users />}
        />
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        {/* Recent Orders */}
        <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-100 p-5">
          <div className="mb-4">
            <div className="font-semibold">Recent Orders</div>
            <div className="text-sm text-slate-500">
              Latest orders from your bakery
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="py-2">Order ID</th>
                  <th className="py-2">Customer</th>
                  <th className="py-2">Status</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOrders.map((o) => (
                  <tr key={o.id} className="">
                    <td className="py-3 font-medium text-slate-700">{o.id}</td>
                    <td className="py-3">{o.customer}</td>
                    <td className="py-3">
                      <StatusBadge status={o.status} />
                    </td>
                    <td className="py-3 text-right">${o.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sales Trend */}
        <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-100 p-5">
          <div className="mb-4">
            <div className="font-semibold">Sales Trend</div>
            <div className="text-sm text-slate-500">
              Monthly sales performance
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={sales}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={{ stroke: "#cbd5e1" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={{ stroke: "#cbd5e1" }}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ stroke: "#94a3b8" }}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #e2e8f0",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
