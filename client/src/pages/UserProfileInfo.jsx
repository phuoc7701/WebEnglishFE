import React from 'react';

const UserProfileInfo = () => {
  return (
    // Bỏ shadow-lg, đổi nền thành trắng hoặc để trống
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex font-sans text-black rounded-xl bg-white overflow-hidden max-w-[1000px] w-full">
        {/* Sidebar */}
        <div className="w-[300px] bg-sky-500 text-white p-6 flex flex-col items-center rounded-l-xl">
          <h2 className="text-xl font-semibold mb-6">Nguyễn Minh Hoài</h2>
          <div className="w-36 h-36 rounded-full overflow-hidden mb-4">
            <img src="/avatar.png" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <button className="bg-white text-sky-500 font-semibold py-2 px-4 rounded-xl mb-4">
            Thay ảnh đại diện
          </button>
          <div className="flex space-x-4 text-xl mb-6">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-github"></i>
          </div>
          <div className="w-full space-y-2">
            <button className="w-full bg-white text-sky-500 py-2 rounded-md font-semibold hover:opacity-90">Thông tin tài khoản</button>
            <button className="w-full bg-white text-sky-500 py-2 rounded-md font-semibold hover:bg-sky-100">Tổng quan ôn luyện</button>
            <button className="w-full bg-white text-sky-500 py-2 rounded-md font-semibold hover:bg-sky-100">Ngữ pháp đã học</button>
            <button className="w-full bg-white text-sky-500 py-2 rounded-md font-semibold hover:bg-sky-100">Từ vựng đã học</button>
            <button className="w-full bg-white text-sky-500 py-2 rounded-md font-semibold hover:bg-sky-100">Phân tích hiệu quả</button>
            <button className="w-full bg-white text-sky-500 py-2 rounded-md font-semibold hover:bg-sky-100">Thông báo của tôi</button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-10">
          <h3 className="text-xl font-semibold mb-4">Thông tin tài khoản</h3>
          <p className="mb-1"><strong>User id:</strong> 2407280013</p>
          <p className="mb-6"><strong>Thời hạn Premium:</strong> 04/08/2024 (<span className="text-red-500 font-semibold">hết hạn</span>)</p>

          <h3 className="text-xl font-semibold mb-4">Thông tin cá nhân</h3>
          <form className="space-y-5">
            <div>
              <label className="block font-semibold mb-1">Họ & Tên:</label>
              <input type="text" defaultValue="Nguyễn Minh Hoài" className="border border-gray-300 rounded px-3 py-2 w-full max-w-md" />
            </div>

            <div>
              <label className="block font-semibold mb-1">Ngày sinh:</label>
              <input type="date" defaultValue="2003-09-05" className="border border-gray-300 rounded px-3 py-2 w-full max-w-md" />
            </div>

            <div>
              <label className="block font-semibold mb-1">Giới tính:</label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input type="radio" name="gender" value="male" defaultChecked />
                  Nam
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="gender" value="female" />
                  Nữ
                </label>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-1">Địa chỉ email:</p>
              <p className="text-gray-500">hoaiminion365@gmail.com</p>
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
