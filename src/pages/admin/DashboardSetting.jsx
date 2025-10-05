import { useState } from "react";

export default function DashboardSetting() {
  const [store, setStore] = useState({
    name: "SweetTreats Bakery",
    address: "123 Baker Street, Sweet City, SC 12345",
    phone: "+1 (555) 123-CAKE",
  });

  const [admin, setAdmin] = useState({
    name: "Admin User",
    email: "admin@sweettreats.com",
    password: "",
  });

  const handleStoreChange = (e) => {
    const { name, value } = e.target;
    setStore((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleStoreSubmit = (e) => {
    e.preventDefault();
    alert("Store information saved!");
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    alert("Admin account updated!");
  };

  return (
    <div className="min-h-screen bg-[#FFF6E9] p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-1">
        Settings
      </h2>
      <p className="text-gray-600 mb-6">
        Configure your bakery admin panel
      </p>

      {/* Two-column section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Store Information */}
        <div className="bg-white border-[0.5px] border-gray-300 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Store Information
          </h3>
          <p className="text-gray-500 mb-4 text-sm">
            Basic bakery details
          </p>

          <form onSubmit={handleStoreSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Store Name
              </label>
              <input
                type="text"
                name="name"
                value={store.name}
                onChange={handleStoreChange}
                className="w-full border-[0.5px] border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring focus:ring-blue-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={store.address}
                onChange={handleStoreChange}
                className="w-full border-[0.5px] border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring focus:ring-blue-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={store.phone}
                onChange={handleStoreChange}
                className="w-full border-[0.5px] border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring focus:ring-blue-200 outline-none"
              />
            </div>

            <button
              type="submit"
              className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition"
            >
              Save Changes
            </button>
          </form>
        </div>

        {/* Admin Account */}
        <div className="bg-white border-[0.5px] border-gray-300 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Admin Account
          </h3>
          <p className="text-gray-500 mb-4 text-sm">
            Your account settings
          </p>

          <form onSubmit={handleAdminSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={admin.name}
                onChange={handleAdminChange}
                className="w-full border-[0.5px] border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring focus:ring-blue-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={admin.email}
                onChange={handleAdminChange}
                className="w-full border-[0.5px] border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring focus:ring-blue-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                name="password"
                value={admin.password}
                onChange={handleAdminChange}
                placeholder="Enter new password"
                className="w-full border-[0.5px] border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring focus:ring-blue-200 outline-none"
              />
            </div>

            <button
              type="submit"
              className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition"
            >
              Update Account
            </button>
          </form>
        </div>
      </div>

      {/* System Preferences */}
      <div className="bg-white border-[0.5px] border-gray-300 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          System Preferences
        </h3>
        <p className="text-gray-500 mb-4 text-sm">
          Configure system-wide settings
        </p>

      </div>
    </div>
  );
}
