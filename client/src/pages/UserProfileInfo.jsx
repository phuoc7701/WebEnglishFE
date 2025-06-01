import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfileInfo = () => {
  const userId = localStorage.getItem('userId'); // Thay bằng lấy từ localStorage hoặc context nếu cần
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    fullname: '',
    dob: '',
    gender: '',
    avatarUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm gọi API lấy profile
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Không tìm thấy access token, vui lòng đăng nhập');
        setLoading(false);
        return;
      }

      const res = await axios.get(`http://localhost:8080/engzone/users/${userId}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setProfile(res.data.result);
      setForm({
        fullname: res.data.result.fullname || '',
        dob: res.data.result.dob || '',
        gender: res.data.result.gender || '',
        avatarUrl: res.data.result.avatarUrl || ''
      });
      setLoading(false);
      console.log('DOB from backend:', res.data.result.dob);
    } catch (err) {
      console.error('Failed to load profile:', err);
      setError('Lỗi khi tải thông tin cá nhân');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Không tìm thấy access token, vui lòng đăng nhập lại');
        return;
      }

      const res = await axios.put(`http://localhost:8080/engzone/users/${userId}/profile`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      alert('Cập nhật thành công!');
      setProfile(res.data.result);
    } catch (err) {
      console.error(err);
      alert('Cập nhật thất bại!');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500 font-bold">{error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex font-sans text-black rounded-xl bg-white overflow-hidden max-w-[1000px] w-full">

        {/* Sidebar */}
        <div className="w-[300px] bg-sky-500 text-white p-6 flex flex-col items-center rounded-l-xl">
          <h2 className="text-xl font-semibold mb-6">{profile.fullname}</h2>
          <div className="w-36 h-36 rounded-full overflow-hidden mb-4">
            <img src={profile.avatarUrl || '/avatar.png'} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <button className="bg-white text-sky-500 font-semibold py-2 px-4 rounded-xl mb-4">
            Thay ảnh đại diện
          </button>
          {/* ... phần sidebar còn lại như bạn đã có */}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-10">
          <h3 className="text-xl font-semibold mb-4">Thông tin tài khoản</h3>
          <p className="mb-6">
            <strong>Thời hạn Premium:</strong> {profile.premiumExpiry} (<span className="text-red-500 font-semibold">hết hạn</span>)
          </p>

          <h3 className="text-xl font-semibold mb-4">Thông tin cá nhân</h3>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block font-semibold mb-1">Họ & Tên:</label>
              <input
                type="text"
                name="fullname"
                value={form.fullname}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full max-w-md"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Ngày sinh:</label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full max-w-md"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Giới tính:</label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={form.gender === 'male'}
                    onChange={handleChange}
                  />
                  Nam
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={form.gender === 'female'}
                    onChange={handleChange}
                  />
                  Nữ
                </label>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-1">Địa chỉ email:</p>
              <p className="text-gray-500">{profile.email}</p>
            </div>

            <button type="submit" className="mt-4 bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded font-semibold">
              Lưu thay đổi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo;
