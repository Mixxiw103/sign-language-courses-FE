import { useState } from "react";
import { Link } from "react-router-dom";

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

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thanh toán thành công 🎉");
    };

    return (
        <div className="w-full min-h-screen bg-gray-50">
            {/* ===== Header ===== */}
            <header className="w-full bg-white shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="border border-cyan-400 rounded-md p-2">
                            <span className="font-bold text-gray-700">TOTC</span>
                        </div>
                    </div>

                    {/* Menu */}
                    <nav className="hidden md:flex space-x-8 text-gray-600 font-medium">
                        <Link to="/" className="hover:text-cyan-500">Trang chủ</Link>
                        <Link to="/courses" className="hover:text-cyan-500">Khóa học</Link>
                        <Link to="/careers" className="hover:text-cyan-500">Nghề nghiệp</Link>
                        <Link to="/blog" className="hover:text-cyan-500">Blog</Link>
                        <Link to="/about" className="hover:text-cyan-500">Về chúng tôi</Link>
                    </nav>

                    {/* User */}
                    <div className="flex items-center space-x-2">
                        <img
                            src="https://i.pravatar.cc/40?img=1"
                            alt="user"
                            className="w-8 h-8 rounded-full"
                        />
                        <span className="text-gray-700 font-medium">Lina ▼</span>
                    </div>
                </div>
            </header>

            {/* ===== Main Checkout Section ===== */}
            <div className="max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* ==== Form Checkout ==== */}
                <form
                    onSubmit={handleSubmit}
                    className="col-span-2 bg-white rounded-xl shadow-md p-8"
                >
                    <h2 className="text-2xl font-semibold mb-6 text-left">Thanh toán</h2>

                    {/* Loại thẻ */}
                    <p className="text-sm font-medium mb-4 text-left">Loại thẻ</p>
                    <div className="flex items-center gap-4 mb-6">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/5e/PayPal_Logo.png"
                            alt="PayPal"
                            className="h-10 border rounded-lg p-2"
                        />
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg"
                            alt="American Express"
                            className="h-10 border rounded-lg p-2"
                        />
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                            alt="Visa"
                            className="h-10 border rounded-lg p-2"
                        />
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                            alt="MasterCard"
                            className="h-10 border rounded-lg p-2"
                        />
                    </div>

                    {/* Tên chủ thẻ */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 text-left">
                            Tên trên thẻ
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nhập tên trên thẻ"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    {/* Số thẻ */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 text-left">
                            Số thẻ
                        </label>
                        <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="Nhập số thẻ"
                            className="w-full border border-gray-300  rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    {/* Ngày hết hạn + CVC */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-left">
                                Ngày hết hạn (MM/YY)
                            </label>
                            <input
                                type="text"
                                name="expiry"
                                value={formData.expiry}
                                onChange={handleChange}
                                placeholder="MM/YY"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-left">CVC</label>
                            <input
                                type="text"
                                name="cvc"
                                value={formData.cvc}
                                onChange={handleChange}
                                placeholder="CVC"
                                className="w-full border border-gray-300 rounded-b-sm px-3 py-2 focus:ring focus:ring-blue-300"
                                required
                            />
                        </div>
                    </div>

                    {/* Lưu thông tin */}
                    <div className="flex items-center mb-6">
                        <input
                            type="checkbox"
                            name="saveInfo"
                            checked={formData.saveInfo}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <label className="text-sm text-gray-600">
                            Lưu thông tin của tôi cho lần thanh toán sau
                        </label>
                    </div>

                    {/* Nút xác nhận */}
                    <button
                        type="submit"
                        className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-700 font-medium"
                    >
                        Xác nhận thanh toán
                    </button>
                </form>

                {/* ==== Tóm tắt đơn hàng ==== */}
                <div className="bg-blue-50 rounded-xl shadow-md p-6 h-fit">
                    <h2 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h2>

                    {/* Demo sản phẩm */}
                    <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-4 border-b pb-4">
                            <img
                                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1600&auto=format&fit=crop"
                                alt="course"
                                className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div>
                                <p className="text-sm font-medium">
                                    Khóa học A: Giới thiệu AWS
                                </p>
                                <p className="text-gray-600 text-sm">$24.69</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <img
                                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1600&auto=format&fit=crop"
                                alt="course"
                                className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div>
                                <p className="text-sm font-medium">
                                    Khóa học B: Lập trình Python
                                </p>
                                <p className="text-gray-600 text-sm">$24.69</p>
                            </div>
                        </div>
                    </div>

                    {/* Tổng kết */}
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span>Tạm tính</span>
                            <span>$51.38</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Giảm giá</span>
                            <span>0%</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Thuế (TAX)</span>
                            <span>5</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-semibold">
                            <span>Tổng cộng</span>
                            <span>$56.38</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== Ưu đãi khóa học ===== */}
            <div className="max-w-6xl mx-auto px-6 pb-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Ưu đãi và khuyến mãi giáo dục hàng đầu
                    </h2>
                    <button className="text-sm text-black hover:underline">
                        Xem tất cả
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[
                        { percent: "50%", title: "Khóa học Online A" },
                        { percent: "10%", title: "Khóa học Online B" },
                        { percent: "50%", title: "Khóa học Online C" },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="relative rounded-xl overflow-hidden shadow-md"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1600&auto=format&fit=crop"
                                alt={item.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 text-white">
                                <span className="bg-cyan-500 text-xs px-2 py-1 rounded-md w-fit mb-2">
                                    {item.percent}
                                </span>
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="text-sm text-gray-200">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
