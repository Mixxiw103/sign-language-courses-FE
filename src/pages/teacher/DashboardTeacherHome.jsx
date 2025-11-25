import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

const stats = [
  {
    label: "Students",
    value: "1,674,767",
    icon: () => (
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-rose-50 text-rose-500 ring-1 ring-rose-100">
        👨‍🎓
      </span>
    ),
  },
  {
    label: "Online Courses",
    value: "3",
    icon: () => (
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
        🗓️
      </span>
    ),
  },
  {
    label: "USD Total Earning",
    value: "$7,461,767",
    icon: () => (
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-50 text-slate-700 ring-1 ring-slate-200">
        💵
      </span>
    ),
  },
  {
    label: "Course Sold",
    value: "56,489",
    icon: () => (
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-violet-50 text-violet-600 ring-1 ring-violet-100">
        📦
      </span>
    ),
  },
];

const revenueData = [
  { d: "Aug 01", v: 320000 },
  { d: "Aug 03", v: 450000 },
  { d: "Aug 05", v: 380000 },
  { d: "Aug 07", v: 517490 },
  { d: "Aug 10", v: 420000 },
  { d: "Aug 14", v: 470000 },
  { d: "Aug 18", v: 360000 },
  { d: "Aug 22", v: 520000 },
  { d: "Aug 26", v: 480000 },
  { d: "Aug 31", v: 560000 },
];

const overviewData = [
  { d: "Sun", a: 700000, b: 200000 },
  { d: "Mon", a: 500000, b: 400000 },
  { d: "Tue", a: 350000, b: 620000 },
  { d: "Wed", a: 260000, b: 510000 },
  { d: "Thu", a: 240000, b: 540000 },
  { d: "Fri", a: 610000, b: 460000 },
  { d: "Sat", a: 120000, b: 520000 },
];

const profileBars = [
  3200, 1200, 2600, 1800, 3400, 900, 3000, 2400, 2200, 1700, 3100, 1500,
];

const sparkline = [12, 20, 18, 26, 19, 23, 21, 28, 22, 24, 20, 25];

function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100 ${className}`}
    >
      {children}
    </div>
  );
}

function StatCard({ item }) {
  const Icon = item.icon;
  return (
    <Card>
      <div className="flex items-center gap-4">
        <Icon />
        <div>
          <div className="text-xl font-semibold text-slate-900">
            {item.value}
          </div>
          <div className="text-sm text-slate-500">{item.label}</div>
        </div>
      </div>
    </Card>
  );
}

export default function DashboardTeacherHome() {
  return (
    <div className="min-h-screen bg-slate-50 px-20 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} item={s} />
          ))}
        </div>

        {/* Middle row */}
        <div className="grid gap-4 lg:grid-cols-12">
          {/* Recent Activity */}
          <Card className="lg:col-span-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Recent Activity</h3>
              <span className="text-sm text-slate-500">Today</span>
            </div>
            <ul className="space-y-4">
              {[
                {
                  who: "Kevin",
                  text: 'comments on your lecture "What is ux" in "2021 ui/ux design with figma"',
                  when: "Just now",
                },
                {
                  who: "John",
                  text: 'give a 5 star rating on your course "2021 ui/ux design with figma"',
                  when: "5 mins ago",
                },
                {
                  who: "Sraboni",
                  text: 'purchase your course "2021 ui/ux design with figma"',
                  when: "6 mins ago",
                },
                {
                  who: "Arif",
                  text: 'purchase your course "2021 ui/ux design with figma"',
                  when: "8 mins ago",
                },
              ].map((a, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 flex-none rounded-full bg-orange-500"></span>
                  <div className="text-sm leading-6 text-slate-600">
                    <span className="font-medium text-slate-800">{a.who}</span>{" "}
                    {a.text}
                    <div className="text-xs text-slate-400">{a.when}</div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          {/* Revenue */}
          <Card className="lg:col-span-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Revenue</h3>
              <span className="text-sm text-slate-500">This month</span>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueData}
                  margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} stroke="#eef2ff" />
                  <XAxis
                    dataKey="d"
                    tickLine={false}
                    axisLine={false}
                    fontSize={12}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `${Math.round(v / 1000)}k`}
                    fontSize={12}
                  />
                  <Tooltip
                    formatter={(v) => `$${v.toLocaleString()}`}
                    labelClassName="text-slate-700"
                  />
                  <Line
                    type="monotone"
                    dataKey="v"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Profile Views */}
          <Card className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Profile View</h3>
              <span className="text-sm text-slate-500">Today</span>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={profileBars.map((v, idx) => ({ name: idx + 1, v }))}
                >
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Bar dataKey="v" radius={[4, 4, 0, 0]} fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 text-sm">
              <div className="text-slate-900 font-semibold">$7,443</div>
              <div className="text-slate-500">USD Dollar you earned.</div>
            </div>
          </Card>
        </div>

        {/* Bottom row */}
        <div className="grid gap-4 lg:grid-cols-12">
          {/* Overall Rating */}
          <Card className="lg:col-span-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Overall Course Rating</h3>
              <span className="text-sm text-slate-500">This week</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center rounded-lg bg-orange-50 p-6 text-orange-600">
                <div className="text-4xl font-bold">4.6</div>
                <div className="mt-1">★★★★★</div>
                <div className="mt-2 text-xs font-medium text-orange-700">
                  Overall Rating
                </div>
              </div>
              <div className="h-24 self-center">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparkline.map((v, i) => ({ i, v }))}>
                    <YAxis hide />
                    <XAxis hide />
                    <Line
                      type="monotone"
                      dataKey="v"
                      stroke="#fb923c"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {[
                { s: 5, p: 56 },
                { s: 4, p: 37 },
                { s: 3, p: 8 },
                { s: 2, p: 1 },
                { s: 1, p: 1 },
              ].map((r) => (
                <div key={r.s} className="flex items-center gap-3 text-sm">
                  <span className="w-16">{r.s} Star</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full bg-orange-400"
                      style={{ width: `${r.p}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-slate-500">{r.p}%</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Course Overview */}
          <Card className="lg:col-span-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Course Overview</h3>
              <span className="text-sm text-slate-500">This week</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={overviewData}
                  margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} stroke="#eef2ff" />
                  <XAxis
                    dataKey="d"
                    tickLine={false}
                    axisLine={false}
                    fontSize={12}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `${Math.round(v / 1000)}k`}
                    fontSize={12}
                  />
                  <Tooltip
                    formatter={(v) => `$${v.toLocaleString()}`}
                    labelClassName="text-slate-700"
                  />
                  <Area
                    type="monotone"
                    dataKey="a"
                    stroke="#f97316"
                    fill="#f97316"
                    fillOpacity={0.1}
                  />
                  <Area
                    type="monotone"
                    dataKey="b"
                    stroke="#6366f1"
                    fill="#6366f1"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ================== COMPACT ONE-PAGE ==================
export function CompactAllInOnePage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    if (!query) return coursesSeed;
    const q = query.toLowerCase();
    return coursesSeed.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.author.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero + Search */}
      <div
        className="relative h-44 w-full overflow-hidden bg-slate-200"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1600&auto=format&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-center px-6">
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </div>

      {/* Compact Stats */}
      <div className="mx-auto max-w-7xl px-6 -mt-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.slice(0, 4).map((s) => (
            <div
              key={s.label}
              className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100"
            >
              <div className="flex items-center gap-4">
                <s.icon />
                <div>
                  <div className="text-lg font-semibold text-slate-900">
                    {s.value}
                  </div>
                  <div className="text-sm text-slate-500">{s.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row (compact) */}
      <div className="mx-auto mt-6 grid max-w-7xl grid-cols-1 gap-4 px-6 lg:grid-cols-3">
        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold">Revenue</h3>
            <span className="text-sm text-slate-500">This month</span>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid vertical={false} stroke="#eef2ff" />
                <XAxis
                  dataKey="d"
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${Math.round(v / 1000)}k`}
                  fontSize={12}
                />
                <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold">Profile View</h3>
            <span className="text-sm text-slate-500">Today</span>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={profileBars.map((v, idx) => ({ name: idx + 1, v }))}
              >
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Bar dataKey="v" radius={[4, 4, 0, 0]} fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-sm">
            <span className="font-semibold text-slate-900">$7,443</span>{" "}
            <span className="text-slate-500">earned.</span>
          </div>
        </div>
      </div>

      {/* Courses Grid (max 6) */}
      <div className="mx-auto mt-8 max-w-7xl px-6">
        <Filters />
        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, 6).map((c) => (
            <CourseCard key={c.id} c={c} />
          ))}
        </div>
      </div>

      {/* Instructors (row of 3) */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">
            Classes taught by real creators
          </h2>
          <button className="text-sm font-medium text-slate-700 hover:text-slate-900">
            See all
          </button>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {instructors.slice(0, 3).map((i) => (
            <InstructorCard key={i.id} i={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
