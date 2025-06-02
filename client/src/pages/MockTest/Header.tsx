import React from "react";
import { useNavigate } from "react-router-dom";
type Props = { title: string };

export default function Header({ title }: Props) {
  const navigate = useNavigate();
  const handleExit = () => {
    // Hiện thông báo xác nhận
    const confirmed = window.confirm("Bạn có chắc chắn muốn thoát khỏi bài làm?");
    if (confirmed) {
      navigate("/"); // hoặc navigate(-1) để quay lại trang trước
    }
  };
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      marginBottom: 12
    }}>
      <h2 style={{ fontWeight: 600, fontSize: 24 }}>
      {title}
      </h2>
      <button
        style={{
          border: "1px solid #aaa",
          borderRadius: 6,
          padding: "6px 16px",
          background: "#fff",
          cursor: "pointer",
        }}
        onClick={handleExit}
      >
        Thoát
      </button>
    </div>
  );
}