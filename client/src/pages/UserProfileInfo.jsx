import React, { useEffect, useState } from 'react';
import axios from 'axios';

const getInitials = (name) => {
  if (!name) return '';
  const names = name.trim().split(' ');
  if (names.length === 1) return names[0][0].toUpperCase();
  return (names[0][0] + names[names.length - 1][0]).toUpperCase();
};

const UserProfileInfo = () => {
  const userId = localStorage.getItem('userId');
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    fullname: '',
    dob: '',
    gender: '',
    avatarUrl: ''
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setAvatarPreview(null);
    }
  };

  const handleUploadAvatar = async () => {
    if (!avatarFile) {
      alert("Vui lòng chọn ảnh trước");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Không tìm thấy access token, vui lòng đăng nhập lại");
      return;
    }

    const formData = new FormData();
    formData.append("avatarFile", avatarFile);

    try {
      const res = await axios.post("http://localhost:8080/engzone/users/upload-avatar", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Cập nhật avatar thành công!");
      fetchProfile();
      setAvatarFile(null);
      setAvatarPreview(null);
    } catch (err) {
      console.error(err);
      alert("Upload ảnh thất bại!");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500 font-bold">{error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex font-sans text-black rounded-xl bg-white overflow-hidden max-w-[1000px] w-full">

        {/* Sidebar */}
        <div className="w-[300px] bg-sky-500 text-white p-6 flex flex-col items-center rounded-l-xl relative">
          <h2 className="text-xl font-semibold mb-6">{profile.fullname}</h2>

          <div className="relative mb-4">
            {/* Avatar Circle */}
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100">
              {avatarPreview || profile.avatarUrl ? (
                <img
                  src={avatarPreview || profile.avatarUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sky-500 text-4xl font-bold">
                  {getInitials(profile.fullname)}
                </div>
              )}
            </div>

            {/* Camera Icon - OUTSIDE the avatar circle */}
            <label
              className="absolute bg-white p-2 rounded-full cursor-pointer shadow-md hover:scale-105 transition-transform"
              style={{ bottom: '3px', right: '16px' }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              {/* Icon camera đơn giản */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-sky-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 9a3 3 0 100 6 3 3 0 000-6zm8-3h-3.17l-.58-.58A2 2 0 0014.83 5H9.17a2 2 0 00-1.42.59L7.17 6H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2zM12 17a5 5 0 110-10 5 5 0 010 10z" />
              </svg>

            </label>

          </div>


          {avatarFile && (
            <button
              onClick={handleUploadAvatar}
              className="bg-white text-sky-500 font-semibold py-2 px-4 rounded-xl"
            >
              Upload ảnh
            </button>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-10">
          <h3 className="text-xl font-semibold mb-4">Thông tin tài khoản</h3>
          <p className="mb-6">
            <strong>Thời hạn Premium:</strong> {profile.premiumExpiry || 'Chưa có'}
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
