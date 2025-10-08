import { useState } from "react";
import CourseCard from "../components/CourseCard";
export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    saveInfo: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const offers = [
    {
      image: "https://picsum.photos/400/200?random=1",
      category: "Design",
      duration: "3h 20m",
      title: "Learn UI/UX Design from scratch",
      description: "Master the basics of UI/UX with real-world projects.",
      avatar: "https://i.pravatar.cc/100?img=1",
      author: "Jane Doe",
      oldPrice: 99,
      price: 49,
    },
    {
      image: "https://picsum.photos/400/200?random=2",
      category: "Programming",
      duration: "5h 45m",
      title: "React.js Full Guide",
      description: "Learn React step by step with hooks, context and projects.",
      avatar: "https://i.pravatar.cc/100?img=2",
      author: "John Smith",
      oldPrice: 120,
      price: 60,
    },
    {
      image: "https://picsum.photos/400/200?random=3",
      category: "Marketing",
      duration: "2h 15m",
      title: "Digital Marketing Essentials",
      description: "Grow your business with social media and SEO.",
      avatar: "https://i.pravatar.cc/100?img=3",
      author: "Alex Lee",
      oldPrice: 80,
      price: 40,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanh toán thành công ");
  };

  return (
    <div className="px-8 bg-gray-50 min-h-screen">
      {/* Container */}
      <div className="grid md:grid-cols-2 gap-8 ">
        {/* Checkout Form */}
        <div className="md:col-span-1 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl text-left font-semibold mb-2">Checkout</h2>
          <h3 className="text-gray-400 text-left font-semibold mb-4">
            Card type
          </h3>

          {/* Card Type */}
          <div className="flex items-center space-x-6 mb-6">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="PayPal"
              className="h-8"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg"
              alt="Amex"
              className="h-8"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
              alt="Visa"
              className="h-8"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="Mastercard"
              className="h-8"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name on Card */}
            <div>
              <label className="block  text-left text-sm font-medium text-gray-700 mb-1">
                Name on Card
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name on Card"
                className="w-full border  text-left border-gray-300 rounded-md px-3 py-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Card Number */}
            <div>
              <label className="block  text-left text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="Enter Card Number"
                className="w-full border  text-left border-gray-300 rounded-md px-3 py-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Expiration + CVC */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block   text-left text-sm font-medium text-gray-700 mb-1">
                  Expiration Date (MM/YY)
                </label>
                <input
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  className="w-full border border-gray-300 rounded-md px-3 py-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                  CVC
                </label>
                <input
                  type="text"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleChange}
                  placeholder="CVC"
                  className="w-full border border-gray-300 rounded-md px-3 py-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Save Info */}
            <label className="flex items-center space-x-2 text-sm text-gray-600">
              <input
                type="checkbox"
                name="saveInfo"
                checked={formData.saveInfo}
                onChange={handleChange}
                className="accent-blue-500 w-4 h-4"
              />
              <span>Save my information for faster checkout</span>
            </label>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-3 rounded-md font-medium hover:bg-gray-900 transition"
            >
              Confirm Payment
            </button>
          </form>
        </div>

        {/* Summary */}
        <div className="bg-blue-50 rounded-lg shadow p-6 ">
          <h2 className="text-lg text-left font-semibold mb-6">Summary</h2>

          <div className="space-y-4 mb-4">
            <div className="flex space-x-3">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop"
                alt="item"
                className="w-20 h-20 rounded"
              />
              <div>
                <p className="text-sm font-medium text-left mb-0.5">
                  adipising elit, sed do eiusmod tempor
                </p>
                <p className="text-sm text-gray-400 text-left mb-0.5">
                  Lorem ipsum dolor sit amet
                </p>
                <p className="font-semibold text-left">$24.69</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop"
                alt="item"
                className="w-20 h-20 rounded"
              />
              <div>
                <p className="text-sm font-medium text-left mb-0.5">
                  adipising elit, sed do eiusmod tempor
                </p>
                <p className="text-sm text-gray-400 text-left mb-0.5">
                  Lorem ipsum dolor sit amet
                </p>
                <p className="font-semibold text-left">$24.69</p>
              </div>
            </div>
          </div>

          {/* Totals */}
          <div className="border-t pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$51.38</span>
            </div>
            <div className="flex justify-between">
              <span>Coupon Discount</span>
              <span>0%</span>
            </div>
            <div className="flex justify-between">
              <span>TAX</span>
              <span>5</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>$56.38</span>
            </div>
          </div>
        </div>
      </div>

      {/* Offers */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">
            Top Education offers and deals are listed here
          </h2>
          <a href="#" className="text-blue-600 text-sm">
            See all
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((c, i) => (
            <CourseCard key={i} c={c} />
          ))}
        </div>
      </div>
    </div>
  );
}
