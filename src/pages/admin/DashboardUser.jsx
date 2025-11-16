import {
  UserCircle2,
  Mail,
  Phone,
  ShoppingCart,
  CalendarDays,
  DollarSign,
  Edit3,
  Trash2,
} from "lucide-react";

const customers = [
  {
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 234-5678",
    orders: 12,
    lastOrder: "2024-01-15",
    totalSpent: 456.78,
  },
  {
    name: "Mike Chen",
    email: "mike.chen@email.com",
    phone: "+1 (555) 123-4567",
    orders: 8,
    lastOrder: "2024-01-14",
    totalSpent: 234.5,
  },
  {
    name: "Emma Wilson",
    email: "emma.w@email.com",
    phone: "+1 (555) 345-6789",
    orders: 15,
    lastOrder: "2024-01-13",
    totalSpent: 789.2,
  },
  {
    name: "David Brown",
    email: "david.b@email.com",
    phone: "+1 (555) 456-7890",
    orders: 5,
    lastOrder: "2024-01-12",
    totalSpent: 156.99,
  },
];

export default function DashboardUser() {
  return (
    <div className="min-h-screen bg-[#fdf2e9] p-6">
      {/* Tiêu đề */}
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <UserCircle2 className="text-gray-600" /> Customers
      </h1>
      <p className="text-gray-600 mb-6">Manage your customer relationships</p>

      {/* Bảng khách hàng */}
      <div className="bg-white rounded-xl shadow p-6">
        {/* Header bảng + ô search */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-gray-600" /> Customer Database
          </h2>
          <input
            type="text"
            placeholder="Search customers..."
            className="px-3 py-2 border rounded-md text-sm focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Table */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="py-3">Name</th>
              <th className="py-3">Contact</th>
              <th className="py-3">Orders</th>
              <th className="py-3">Last Order</th>
              <th className="py-3">Total Spent</th>
              <th className="py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                {/* Name */}
                <td className="py-3 text-sm text-gray-800">
                  <div className="flex items-center gap-2">
                    <UserCircle2 className="w-5 h-5 text-gray-500" />
                    {c.name}
                  </div>
                </td>

                {/* Contact */}
                <td className="py-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5 py-0.5">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="flex items-center ">{c.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="flex items-center">{c.phone}</span>
                  </div>
                </td>

                {/* Orders */}
                <td className="py-3">
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <ShoppingCart className="w-4 h-4 text-gray-500" />
                    {c.orders} orders
                  </div>
                </td>

                {/* Last Order */}
                <td className="py-3">
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <CalendarDays className="w-4 h-4 text-gray-500" />
                    {c.lastOrder}
                  </div>
                </td>

                {/* Total Spent */}
                <td className="py-3">
                  <div className="flex items-center gap-2 text-[#1faec4] font-semibold whitespace-nowrap">
                    <DollarSign className="w-4 h-4" />
                    {c.totalSpent.toFixed(2)}
                  </div>
                </td>

                {/* Actions */}
                <td className="py-3">
                  <div className="flex gap-5 items-center">
                    <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
                      <Edit3 size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-700 cursor-pointer">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
