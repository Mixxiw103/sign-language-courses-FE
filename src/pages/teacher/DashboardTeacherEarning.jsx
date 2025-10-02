import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const stats = [
  { label: "Total Revenue", value: "$13,804.00" },
  { label: "Current Balance", value: "$16,593.00" },
  { label: "Total Withdrawals", value: "$13,184.00" },
  { label: "Today Revenue", value: "$162.00" },
];

const chartData = [
  { d: "Aug 01", v: 120000 },
  { d: "Aug 07", v: 517490 },
  { d: "Aug 10", v: 180000 },
  { d: "Aug 15", v: 250000 },
  { d: "Aug 20", v: 190000 },
  { d: "Aug 31", v: 270000 },
];

const withdrawHistory = [
  { date: "21 Sep, 2021 at 2:14 AM", method: "Mastercards", amount: "American Express", status: "Pending" },
  { date: "21 Sep, 2021 at 2:14 AM", method: "Visa", amount: "American Express", status: "Pending" },
  { date: "21 Sep, 2021 at 2:14 AM", method: "Visa", amount: "American Express", status: "Completed" },
  { date: "21 Sep, 2021 at 2:14 AM", method: "Mastercards", amount: "American Express", status: "Canceled" },
];

export default function DashboardTeacherEarning() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 px-20">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Stats Row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <div className="text-lg font-semibold text-slate-900">{s.value}</div>
              <div className="text-sm text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Chart + Card */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100 lg:col-span-2">
            <div className="mb-4 flex justify-between">
              <h3 className="font-semibold">Statistic</h3>
              <span className="text-sm text-slate-500">Revenue</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="d" />
                  <YAxis tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                  <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                  <Line type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <div className="mb-4 flex justify-between">
              <h3 className="font-semibold">Cards</h3>
              <span className="text-sm text-slate-500">Revenue</span>
            </div>
            <div className="space-y-4">
              <div className="rounded-xl bg-indigo-600 p-5 text-white shadow">
                <div className="text-lg font-semibold">VISA</div>
                <div className="mt-6 text-lg">4855 **** **** ****</div>
                <div className="mt-2 text-sm">Expires 04/24</div>
                <div className="mt-1 text-sm">Vako Shvili</div>
              </div>
              <button className="w-full rounded-lg border-2 border-dashed border-slate-200 py-4 text-sm text-slate-500 hover:bg-slate-50">
                + Add new card
              </button>
            </div>
          </div>
        </div>

        {/* Withdraw Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <h3 className="mb-4 font-semibold">Withdraw your money</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-md border px-3 py-2">
                <span>Visa •••• 4855</span>
                <span className="text-green-500">✔</span>
              </div>
              <div className="flex items-center justify-between rounded-md border px-3 py-2">
                <span>Mastercard •••• 2855</span>
              </div>
              <div className="flex items-center justify-between rounded-md border px-3 py-2">
                <span>PayPal</span>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <div className="text-lg font-semibold">$16,593.00</div>
              <button className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600">
                Withdraw Money
              </button>
            </div>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <h3 className="mb-4 font-semibold">Withdraw History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-slate-500">
                    <th className="pb-2">DATE</th>
                    <th className="pb-2">METHOD</th>
                    <th className="pb-2">AMOUNT</th>
                    <th className="pb-2">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawHistory.map((w, i) => (
                    <tr key={i} className="border-t text-slate-700">
                      <td className="py-2">{w.date}</td>
                      <td>{w.method}</td>
                      <td>{w.amount}</td>
                      <td>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            w.status === "Completed"
                              ? "bg-green-100 text-green-600"
                              : w.status === "Pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {w.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
