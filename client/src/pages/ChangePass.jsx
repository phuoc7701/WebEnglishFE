import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Hàm reset thông báo khi người dùng sửa input
  const resetMessages = () => {
    if (error) setError('');
    if (successMsg) setSuccessMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu mới không khớp');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      await axios.put(
        `http://localhost:8080/engzone/users/change-password`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMsg('Đổi mật khẩu thành công!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setError(error.response?.data?.message || 'Có lỗi xảy ra!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 relative">
      <div className="bg-white rounded-lg shadow-md max-w-md w-full p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Đổi mật khẩu</h2>

        {(error || successMsg) && (
          <div
            className={`mb-4 px-4 py-3 rounded-md text-center text-sm font-medium ${
              error ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
            }`}
          >
            {error || successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold mb-1">Mật khẩu cũ</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
                resetMessages();
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0d6efd]"
              placeholder="Nhập mật khẩu cũ"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Mật khẩu mới</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                resetMessages();
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0d6efd]"
              placeholder="Nhập mật khẩu mới"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Nhập lại mật khẩu mới</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                resetMessages();
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0d6efd]"
              placeholder="Nhập lại mật khẩu mới"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? 'bg-gray-400' : 'bg-[#0d6efd] hover:bg-[#0b5ed7]'
            } text-white font-semibold py-2 rounded-[40px] transition`}
          >
            {loading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
