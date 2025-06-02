import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setError('');
    setSuccessMsg('');

    if (!email) {
      setError('Vui lòng nhập email');
      return;
    }

    alert(`Yêu cầu lấy lại mật khẩu đã được gửi tới ${email}`);
    setSuccessMsg('Vui lòng kiểm tra email để nhận hướng dẫn lấy lại mật khẩu');
    setEmail('');
  };

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-md max-w-md w-full p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Quên mật khẩu</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMsg && <p className="text-green-600 mb-4">{successMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block font-semibold mb-1">
              Email của bạn
            </label>
            <input
              type="email"
              id="email"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0d6efd]"
              required
            />
          </div>

          {/* Hai nút nằm trên cùng một hàng */}
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="border border-gray-400 text-gray-700 font-semibold py-2 px-5 rounded-[40px] hover:bg-gray-200 transition"
            >
              Quay lại
            </button>

            <button
              type="submit"
              className="bg-[#0d6efd] hover:bg-[#0b5ed7] text-white font-semibold py-2 px-6 rounded-[40px] transition"
            >
              Gửi yêu cầu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
