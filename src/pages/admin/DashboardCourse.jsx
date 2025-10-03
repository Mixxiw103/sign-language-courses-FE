import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Star, Users } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Professional Cake Decorating",
    instructor: "Chef Maria Rodriguez",
    category: "Decorating",
    price: 89.99,
    students: 245,
    rating: 4.8,
    status: "published",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Artisan Bread Making",
    instructor: "Chef Jean Baptiste",
    category: "Baking",
    price: 75,
    students: 189,
    rating: 4.9,
    status: "published",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Pastry Fundamentals",
    instructor: "Chef Sophie Chen",
    category: "Pastries",
    price: 65.5,
    students: 156,
    rating: 4.7,
    status: "published",
    image: "https://images.unsplash.com/photo-1514790193030-c89d266d5a9d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Wedding Cake Design",
    instructor: "Chef Isabella Romano",
    category: "Decorating",
    price: 129.99,
    students: 78,
    rating: 4.9,
    status: "draft",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function DashboardCourse() {
  const [search, setSearch] = useState("");

  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#FFF7ED] min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-semibold">Courses</h2>
            <p className="text-gray-500">
              Manage your e-learning courses and content
            </p>
          </div>
          <button className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-600">
            + Add Course
          </button>
        </div>

        {/* Search */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">All Courses</h3>
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm w-64 focus:outline-none focus:ring focus:ring-teal-200"
          />
        </div>

        {/* Table */}
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-sm text-gray-600">
              <th className="pb-2">Course</th>
              <th className="pb-2">Category</th>
              <th className="pb-2">Price</th>
              <th className="pb-2">Students</th>
              <th className="pb-2">Rating</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr
                key={c.id}
                className="bg-white hover:bg-gray-50 align-middle"
              >
                {/* Course */}
                <td className="py-3 px-2 text-left">
                  <div className="flex items-center gap-3">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="w-12 h-12 rounded object-cover border"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{c.title}</p>
                      <p className="text-sm text-gray-500">{c.instructor}</p>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="py-3 px-2 text-left">
                  <span className="px-3 py-1 text-xs font-medium   text-gray-600">
                    {c.category}
                  </span>
                </td>

                {/* Price */}
                <td className="py-3 px-2 text-gray-800 text-left">
                  $ {c.price}
                </td>

                {/* Students */}
                <td className="py-3 px-2 text-gray-700 text-left">
                  <div className="flex items-center gap-1">
                    <Users size={16} className="text-gray-500" />
                    {c.students}
                  </div>
                </td>

                {/* Rating */}
                <td className="py-3 px-2 text-gray-700 text-left">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    {c.rating}
                  </div>
                </td>

                {/* Status */}
                <td className="py-3 px-2 text-left">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${c.status === "published"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {c.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-3 px-2 text-left">
                  <div className="flex gap-3">
                    <button className="text-gray-500 hover:text-gray-700">
                      <FiEdit size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FiTrash2 size={18} />
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
