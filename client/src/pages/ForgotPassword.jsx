import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setError('');
    setSuccessMsg('');

    if (!email) {
      setError('Vui lòng nhập email');
      return;
    }

    // Gửi yêu cầu lấy lại mật khẩu (ví dụ gọi API)
    // Ở đây demo alert, bạn thay bằng axios.post(...)
    alert(`Yêu cầu lấy lại mật khẩu đã được gửi tới ${email}`);

    setSuccessMsg('Vui lòng kiểm tra email để nhận hướng dẫn lấy lại mật khẩu');
    setEmail('');
    setIsHuman(false);
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
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 rounded transition"
          >
            Gửi yêu cầu
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
