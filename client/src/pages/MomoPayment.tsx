import React, { useState } from "react";

const MomoPayment = () => {
  const [isPaid, setIsPaid] = useState(false);

  // Giả lập mã QR MoMo và thông tin thanh toán
  const momoInfo = {
    name: "WebEnglish",
    amount: "99.000đ",
    phone: "0901234567",
    qr: "https://img.vietqr.io/image/momo-0901234567-compact.png?amount=99000&addInfo=NangCapTaiKhoan", // Demo QR, thay bằng QR của bạn nếu có
    description: "Nâng cấp tài khoản WebEnglish",
  };

  const handleCheckPayment = () => {
    // Giả lập kiểm tra thanh toán thành công, thực tế cần tích hợp API MoMo
    setIsPaid(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-pink-600 mb-4">Thanh toán bằng MoMo</h1>
        {!isPaid ? (
          <>
            <p className="mb-2 text-gray-700">
              Quét mã QR bên dưới bằng <span className="font-bold">ứng dụng MoMo</span> để thanh toán:
            </p>
            <img
              src={momoInfo.qr}
              alt="Mã QR MoMo"
              className="mx-auto w-48 h-48 rounded-lg border mb-4"
            />
            <div className="mb-4">
              <div><b>Người nhận:</b> {momoInfo.name}</div>
              <div><b>Số điện thoại:</b> {momoInfo.phone}</div>
              <div><b>Số tiền:</b> {momoInfo.amount}</div>
              <div><b>Nội dung:</b> {momoInfo.description}</div>
            </div>
            <button
              onClick={handleCheckPayment}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-xl font-bold transition"
            >
              Tôi đã thanh toán
            </button>
          </>
        ) : (
          <div>
            <svg
              className="mx-auto mb-4"
              width="64"
              height="64"
              fill="none"
              viewBox="0 0 64 64"
            >
              <circle cx="32" cy="32" r="32" fill="#FCE7F3" />
              <path
                d="M20 34l8 8 16-16"
                stroke="#EC4899"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="text-xl font-bold text-pink-600 mb-2">
              Thanh toán thành công!
            </h2>
            <p className="text-gray-600 mb-4">
              Cảm ơn bạn đã thanh toán. Tài khoản của bạn sẽ được nâng cấp trong vài phút.
            </p>
            <a
              href="/"
              className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-xl transition"
            >
              Quay về trang chủ
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MomoPayment;