export default function DashboardLayout({ stats, feed }) {
  return (
    <div style={{ display: "flex", gap: "20px", color: "gray-900" }}>
      <div style={{ flex: 2, backgroundColor: "#f9fafb" }}>{stats}</div>
      <div style={{ flex: 1, backgroundColor: "lightgray" }}>{feed}</div>
    </div>
  );
}
