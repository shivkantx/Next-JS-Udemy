import Link from "next/link";

export default function DashboardLayout({ tab1, tab2 }) {
  return (
    <div className="text-gray-900">
      <nav style={{ marginBottom: "10px" }}>
        <Link href={"/dashboard-main/tab1"}>Tab 1</Link> |{" "}
        <Link href={"/dashboard-main/tab2"}>Tab 2</Link>
      </nav>

      <div>
        {tab1}
        {tab2}
      </div>
    </div>
  );
}
