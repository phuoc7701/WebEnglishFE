import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Gói Cơ bản",
    description: "Miễn phí với tính năng giới hạn",
    price: "0đ",
  },
  {
    name: "Gói Pro",
    description: "Toàn bộ bài học & AI",
    price: "99.000đ / tháng",
  },
  {
    name: "Gói Premium",
    description: "Hỗ trợ cá nhân & báo cáo",
    price: "199.000đ / tháng",
  },
];

const paymentMethods = ["💳 Thẻ tín dụng", "📱 Momo", "💸 Chuyển khoản"];

const UpgradeForm = () => {
  const [selectedMethod, setSelectedMethod] = useState("💳 Thẻ tín dụng");
  const [selectedPlan, setSelectedPlan] = useState("Gói Pro"); // Mặc định chọn Pro
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMethod === "📱 Momo") {
      navigate("/momo-payment");
    } else {
      navigate("/payment-success");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto mt-8 p-4 sm:p-8 bg-white shadow-2xl rounded-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Nâng cấp tài khoản</h1>

        {/* Gói dịch vụ */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedPlan(plan.name)}
              className={`border-2 rounded-xl p-4 cursor-pointer transition 
                ${selectedPlan === plan.name
                  ? "border-blue-600 bg-blue-50 shadow-lg"
                  : "border-gray-300 hover:border-blue-600"
                }`}
            >
              <h2 className={`text-lg font-semibold ${selectedPlan === plan.name ? "text-blue-700" : ""}`}>
                {plan.name}
              </h2>
              <p className="mt-2 text-gray-600 text-sm">{plan.description}</p>
              <p className={`text-xl font-bold mt-3 ${selectedPlan === plan.name ? "text-blue-700" : ""}`}>
                {plan.price}
              </p>
            </div>
          ))}
        </div>

        {/* Biểu mẫu thanh toán */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="card-name">Tên trên thẻ</label>
            <input
              type="text"
              id="card-name"
              className="w-full border border-gray-300 rounded-lg p-3"
              placeholder="Nguyễn Văn A"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="card-number">Số thẻ</label>
            <input
              type="text"
              id="card-number"
              className="w-full border border-gray-300 rounded-lg p-3"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="expiry">Ngày hết hạn</label>
              <input
                type="text"
                id="expiry"
                className="w-full border border-gray-300 rounded-lg p-3"
                placeholder="MM/YY"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="cvc">CVC</label>
              <input
                type="text"
                id="cvc"
                className="w-full border border-gray-300 rounded-lg p-3"
                placeholder="123"
                required
              />
            </div>
          </div>

          {/* Phương thức thanh toán */}
          <div>
            <p className="font-medium mb-2">Chọn phương thức thanh toán:</p>
            <div className="flex flex-col sm:flex-row gap-4">
              {paymentMethods.map((method) => (
                <button
                  type="button"
                  key={method}
                  onClick={() => setSelectedMethod(method)} // ĐÃ SỬA ĐÚNG
                  className={`w-full sm:w-auto px-4 py-2 border rounded-lg transition ${
                    selectedMethod === method ? "bg-blue-100 border-blue-600" : "hover:bg-gray-100"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Nút xác nhận */}
          <div className="text-center">
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl text-lg shadow-lg transition"
            >
              Thanh toán ngay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpgradeForm;