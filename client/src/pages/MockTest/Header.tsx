import React from "react";
export default function Header() {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      marginBottom: 12
    }}>
      <h2 style={{ fontWeight: 600, fontSize: 24 }}>
        Test 1
      </h2>
      <button style={{
        border: "1px solid #aaa", borderRadius: 6,
        padding: "6px 16px", background: "#fff", cursor: "pointer"
      }}>Thoát</button>
    </div>
  );
}