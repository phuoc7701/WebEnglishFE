import React, { useEffect, useState } from "react";
import axios from "axios";
import AddUserDialog from "./users/UserDiaglog";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleOptions, setRoleOptions] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const token = localStorage.getItem("token");
  // "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJlbmd6b25lLmNvbSIsInN1YiI6ImFkbWluIiwiZXhwIjoxNzQ4NDkyNjYyLCJpYXQiOjE3NDg0ODkwNjIsImp0aSI6ImE5ZmZhZTZiLTdmMzMtNGY5ZC04ZmVmLTZkMDM1ODJhNWVjZSIsInNjb3BlIjoiUk9MRV9BRE1JTiJ9.jhPjtQPTFB9r3aoa0gN0FE9HVbLn3dr6euTvnhh4YZRTmZCL4u-Y0dRkBHbUVf2bDLF3O9uaXqopl0gegcc-PQ"

  const getInitials = (name) => {
    if (!name) return "";
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };
  useEffect(() => {
    fetchUsers();
  }, []);


  const fetchUsers = async () => {
    try {
      const [usersRes, rolesRes] = await Promise.all([
        axios.get("http://localhost:8080/engzone/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8080/engzone/roles", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      const roles = rolesRes.data.result;
      if (!Array.isArray(roles)) {
        throw new Error("Roles API trả về không đúng định dạng");
      }

      // Tạo danh sách roleOptions từ API
      let roleOpts = roles.map((role) => ({
        value: role.name, // luôn là "USER" hoặc "ADMIN"
        label: role.description || (role.name === "ADMIN" ? "ADMIN" : "USER"),
      }));

      // Đảm bảo luôn có cả ADMIN và USER
      if (!roleOpts.some(r => r.value === "USER")) {
        roleOpts.push({ value: "USER", label: "USER" });
      }
      if (!roleOpts.some(r => r.value === "ADMIN")) {
        roleOpts.push({ value: "ADMIN", label: "ADMIN" });
      }

      setRoleOptions(roleOpts);
      const users = usersRes.data.result || usersRes.data;


      const usersWithNormalizedRole = users.map((user) => {
        let roles = [];
        if (Array.isArray(user.roles)) {
          // Nếu là mảng object, lấy name; nếu là mảng string, giữ nguyên
          roles = user.roles.map(r => typeof r === "string" ? r : r?.name || "");
        }
        return {
          ...user,
          roles,
          accountStatus: user.accountStatus === true || user.accountStatus === 1,
        };
      });

      setUsers(usersWithNormalizedRole);
      setError(null);
    } catch (error) {
      if (error.response) {
        setError(`Lỗi server: ${error.response.status}`);
      } else if (error.request) {
        setError("Không nhận được phản hồi từ server");
      } else {
        setError("Lỗi khi gửi request: " + error.message);
      }
    }
  };
  function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }



  const toggleAccountStatus = (user, newRole) => {

    const isActive = user.accountStatus === true; // true: đang hoạt động, false: đang bị khóa
    if (
      window.confirm(
        `Bạn có chắc muốn ${isActive ? "khóa" : "mở khóa"} tài khoản của ${user.fullname || user.username} không?`
      )
    ) {
      const roles =
        Array.isArray(user.roles)
          ? user.roles.map(r => typeof r === "string" ? r : r.name)
          : [];

      const payload = {
        username: user.username,
        email: user.email,
        fullname: user.fullname,
        dob: user.dob,
        accountStatus: !Boolean(user.accountStatus), // Đảo ngược trạng thái hiện tại
        roles: roles,
      };

      axios
        .put(
          `http://localhost:8080/engzone/users/${user.id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          alert(`Đã ${isActive ? "khóa" : "mở khóa"} tài khoản thành công.`);
          fetchUsers();
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            alert(JSON.stringify(err.response.data));
            console.error("Backend error:", err.response.data);
          } else {
            alert("Lỗi khi cập nhật trạng thái tài khoản.");
          }
        });
    }
  };

  const handleRoleChange = (user, newRole) => {
    const roleLabel = roleOptions.find((r) => r.value === newRole)?.label || newRole;
    if (
      window.confirm(
        `Bạn có chắc muốn chuyển vai trò của ${user.fullname || user.username} sang ${roleLabel}?`
      )
    ) {
      const payload = {
        username: user.username,
        email: user.email,
        fullname: user.fullname,
        dob: user.dob,
        accountStatus: user.accountStatus,
        roles: [newRole], // Gửi role mới
      };
      axios
        .put(
          `http://localhost:8080/engzone/users/${user.id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          alert("Đã cập nhật vai trò thành công.");
          fetchUsers();
        })
        .catch((err) => {
          alert("Lỗi khi cập nhật vai trò.");
          if (err.response && err.response.data) {
            console.log("Backend error:", err.response.data);
          }
        });
    }
  };

  const filteredUsers = users.filter((user) => {
    const name = user.fullname || user.username || "";
    const email = user.email || "";

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "active"
          ? user.accountStatus === true
          : user.accountStatus === false;

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="container-fluid px-4 mt-10">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold mb-2">Quản lý người dùng</h1>
        </div>
        <AddUserDialog
          roleOptions={roleOptions}
          onSave={async () => {
            await fetchUsers();
          }}
        />
      </div>

      {/* Filter and Search */}
      <div className="row g-3 mb-4">
        <div className="col-md-8">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Khóa</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="card mb-4">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="ps-3">
                    Họ Tên
                  </th>
                  <th scope="col">Email</th>
                  {/* <th scope="col">Ngày tham gia</th> */}
                  <th scope="col">Vai trò</th>
                  <th scope="col" className="text-end pe-4"></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="ps-4">
                        <div className="d-flex align-items-center">
                          <div
                            className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white me-3"
                            style={{ width: "42px", height: "42px" }}
                          >
                            {user.avatarUrl ? (
                              <img
                                src={user.avatarUrl}
                                alt="Avatar"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              />
                            ) : (
                              // Hiển thị ký tự viết tắt nếu chưa có avatar
                              getInitials(user.fullname || user.username)
                            )}
                          </div>
                          <div>
                            <h6 className="mb-0 fw-bold">{user.fullname || user.username}</h6>
                            <small className="text-muted">{user.sex}</small>
                          </div>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      {/* <td>{formatDate(randomDate(new Date(2022, 0, 1), new Date()))}</td> */}
                      <td>
                        <select
                          value={
                            user.roles && user.roles.length > 0
                              ? typeof user.roles[0] === "string"
                                ? user.roles[0]
                                : user.roles[0].name
                              : ""
                          }
                          onChange={(e) => handleRoleChange(user, e.target.value)}
                        >
                          <option value="" disabled>
                            Chọn vai trò
                          </option>
                          {roleOptions.map((role) => (
                            <option key={role.value} value={role.value}>
                              {role.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="text-end pe-4">
                        <button
                          onClick={() => toggleAccountStatus(user)}
                          className={`btn btn-sm ${user.accountStatus === true
                            ? "btn-outline-danger"
                            : "btn-outline-success"
                            }`}
                        >
                          {user.accountStatus === true ? "Khóa" : "Mở khóa"}
                        </button>
                        {user.accountStatus === false && (
                          <div className="text-danger fw-semibold mt-1">
                            Tài khoản đã bị vô hiệu hóa
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      <i className="bi bi-people-fill fs-1 text-muted mb-3 d-block"></i>
                      <h5>No users found</h5>
                      <p className="text-muted">
                        Try adjusting your search or filter criteria
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User Stats */}
      <div className="row g-4">
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <div
                className="bg-primary-subtle rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ width: "64px", height: "64px" }}
              >
                <i className="bi bi-people fs-3 text-primary"></i>
              </div>
              <h3 className="h2 fw-bold mb-1">{users.length}</h3>
              <p className="text-muted mb-0">Tổng số người dùng</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <div
                className="bg-success-subtle rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ width: "64px", height: "64px" }}
              >
                <i className="bi bi-person-check fs-3 text-success"></i>
              </div>
              <h3 className="h2 fw-bold mb-1">
                {users.filter((u) => u.accountStatus === true).length}
              </h3>
              <p className="text-muted mb-0">Đang hoạt động</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <div
                className="bg-danger-subtle rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ width: "64px", height: "64px" }}
              >
                <i className="bi bi-person-x fs-3 text-danger"></i>
              </div>
              <h3 className="h2 fw-bold mb-1">
                {users.filter((u) => u.accountStatus === false).length}
              </h3>
              <p className="text-muted mb-0">Inactive Users</p>
            </div>
          </div>
        </div>
        {/* Thêm thống kê khác nếu muốn */}
      </div>
    </div>
  );
}

export default AdminUsers;