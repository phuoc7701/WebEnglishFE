import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white px-8 py-12 rounded-2xl shadow-2xl max-w-md text-center">
        <svg
          className="mx-auto mb-6"
          width="64"
          height="64"
          fill="none"
          viewBox="0 0 64 64"
        >
          <circle cx="32" cy="32" r="32" fill="#D1FAE5" />
          <path
            d="M20 34l8 8 16-16"
            stroke="#10B981"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1 className="text-2xl sm:text-3xl font-bold text-green-700 mb-2">
          Thanh toán thành công!
        </h1>
        <p className="text-gray-600 mb-6">
          Cảm ơn bạn đã nâng cấp tài khoản. Bạn đã nhận được quyền truy cập đầy đủ vào các tính năng của chúng tôi.
        </p>
        <Link
          to="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-xl transition"
        >
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;