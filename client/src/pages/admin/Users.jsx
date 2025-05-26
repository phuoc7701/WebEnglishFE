import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddUserDialog from "./UserDialog";


function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleOptions, setRoleOptions] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const [usersRes, rolesRes] = await Promise.all([
        axios.get("http://localhost:8080/EngZone/admin/users"),
        axios.get("http://localhost:8080/EngZone/admin/roles"),
      ]);

      const roles = rolesRes.data;

      // Tạo danh sách roles cho dropdown
      setRoleOptions(
        roles.map((role) => ({
          value: role.roleId,
          label: role.roleName,
        }))
      );

      // Gán roleId cho từng user dựa vào role.users
      const usersWithRole = usersRes.data.map((user) => {
        const userRole = roles.find((role) =>
          role.users.some((u) => u.userId === user.userId)
        );
        return {
          ...user,
          roleId: userRole?.roleId || null,
        };
      });

      setUsers(usersWithRole);
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

  useEffect(() => {
    axios
      .get("http://localhost:8080/EngZone/admin/roles")
      .then((response) => {
        console.log("Users from API:", response.data);
        const mappedRoles = response.data.map((role) => ({
          value: role.roleId,
          label: role.roleName,
        }));
        setRoleOptions(mappedRoles);
      })
      .catch((err) => console.error("Lấy vai trò thất bại", err));
  }, []);

  const toggleAccountStatus = (user) => {
    const newStatus = user.accountStatus === 1 ? 0 : 1;
    if (
      window.confirm(
        `Bạn có chắc muốn ${newStatus === 1 ? "mở khóa" : "khóa"} tài khoản của ${user.fullName} không?`
      )
    ) {
      axios
        .put(`http://localhost:8080/EngZone/admin/users/${user.userId}`, {
          ...user,
          accountStatus: newStatus,
        })
        .then(() => {
          alert(`Đã ${newStatus === 1 ? "mở khóa" : "khóa"} tài khoản thành công.`);
          fetchUsers(); // reload lại danh sách người dùng sau khi cập nhật
        })
        .catch(() => alert("Lỗi khi cập nhật trạng thái tài khoản."));
    }
  };


  // Sửa hàm toggleUserRole dùng roleOptions thay vì roles không khai báo
  const toggleUserRole = (user) => {
    if (roleOptions.length === 0) return;

    const currentIndex = roleOptions.findIndex((r) => r.value === user.roleId);
    if (currentIndex === -1) return;

    const nextIndex = (currentIndex + 1) % roleOptions.length;
    const newRole = roleOptions[nextIndex].value;

    if (
      window.confirm(
        `Bạn có chắc muốn chuyển vai trò của ${user.fullName} từ ${roleOptions[currentIndex].label} sang ${roleOptions[nextIndex].label}?`
      )
    ) {
      axios
        .put(`http://localhost:8080/EngZone/admin/users/${user.userId}`, {
          ...user,
          roleId: newRole,
        })
        .then(() => {
          alert("Đã cập nhật vai trò thành công.");
          fetchUsers();
        })
        .catch(() => alert("Lỗi khi cập nhật vai trò."));
    }
  };

  const handleRoleChange = (user, newRole) => {
    const roleLabel = roleOptions.find((r) => r.value === newRole)?.label || newRole;
    if (
      window.confirm(
        `Bạn có chắc muốn chuyển vai trò của ${user.fullName} sang ${roleLabel}?`
      )
    ) {
      axios
        .put(`http://localhost:8080/EngZone/admin/users/${user.userId}`, {
          ...user,
          roleId: newRole,
        })
        .then(() => {
          alert("Đã cập nhật vai trò thành công.");
          fetchUsers();
        })
        .catch(() => alert("Lỗi khi cập nhật vai trò."));
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "active"
          ? user.accountStatus === 1
          : user.accountStatus !== 1;

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="container-fluid px-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold mb-2">Quản lý người dùng</h1>
        </div>
        <AddUserDialog
          roleOptions={roleOptions}
          onSave={async (updatedUser) => {
            await fetchUsers();
          }}></AddUserDialog>
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
                  <th scope="col" className="ps-4">Họ Tên</th>
                  <th scope="col">Email</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col">Ngày tham gia</th>
                  <th scope="col">Vai trò</th>
                  <th scope="col" className="text-end pe-4"></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    console.log("User role:", user.role),
                    <tr key={user.userId}>
                      <td className="ps-4">
                        <div className="d-flex align-items-center">
                          <div
                            className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white me-3"
                            style={{ width: "42px", height: "42px" }}
                          >
                            {user.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </div>
                          <div>
                            <h6 className="mb-0 fw-bold">{user.fullName}</h6>
                            <small className="text-muted">{user.sex}</small>
                          </div>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{formatDate(user.createdAt)}</td>
                      <td>
                        <select
                          value={user.roleId || ""}
                          onChange={(e) => handleRoleChange(user, Number(e.target.value))}
                        >
                          <option value="" disabled>Chọn vai trò</option>
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
                          className={`btn btn-sm ${user.accountStatus === 1 ? "btn-outline-danger" : "btn-outline-success"}`}
                        >
                          {user.accountStatus === 1 ? "Khóa" : "Mở khóa"}
                        </button>

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
              <p className="text-muted mb-0">Total Users</p>
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
                {users.filter((u) => u.accountStatus === 1).length}
              </h3>
              <p className="text-muted mb-0">Active Users</p>
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
                <i className="bi bi-person-dash fs-3 text-danger"></i>
              </div>
              <h3 className="h2 fw-bold mb-1">
                {users.filter((u) => u.accountStatus !== 1).length}
              </h3>
              <p className="text-muted mb-0">Inactive Users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
