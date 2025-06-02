import React, { useState } from 'react';

const NewPass = () => {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    // Kiểm tra nhập đủ
    if (!code || !newPassword || !confirmPassword) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    // Kiểm tra khớp mật khẩu mới
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu mới không khớp');
      return;
    }

    // TODO: Gọi API reset mật khẩu tại đây nếu cần

    setSuccessMsg('Đặt lại mật khẩu thành công!');
    setCode('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-md max-w-md w-full p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Đặt lại mật khẩu</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMsg && <p className="text-green-600 mb-4">{successMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold mb-1">Mã xác nhận</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Nhập mã xác nhận"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0d6efd]"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Mật khẩu mới</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nhập mật khẩu mới"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0d6efd]"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Xác nhận mật khẩu mới</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu mới"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0d6efd]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0d6efd] hover:bg-[#0b5ed7] text-white font-semibold py-2 rounded-[40px] transition"
          >
            Xác nhận
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPass;
