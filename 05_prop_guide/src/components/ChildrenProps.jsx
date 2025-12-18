import React from "react";

/* -------------------- Card Component -------------------- */
function Card({ children, title, color = "blue" }) {
  const colorClass = {
    blue: "border-blue-500 bg-blue-500",
    green: "border-green-500 bg-green-500",
    purple: "border-purple-500 bg-purple-500",
    red: "border-red-500 bg-red-500",
  };

  return (
    <div className={`border-l-4 rounded-lg shadow-md ${colorClass[color]}`}>
      {/* Card Header */}
      {title && (
        <div className="px-6 py-3 border-b border-black/10">
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
      )}

      {/* Card Body */}
      <div className="px-6 py-4 text-white space-y-2">{children}</div>
    </div>
  );
}

/* -------------------- Container Component -------------------- */
function Container({ children, layout = "grid" }) {
  const layoutClasses = {
    vertical: "flex flex-col space-y-4",
    horizontal: "flex flex-row gap-4 flex-wrap",
    grid: "grid grid-cols-1 md:grid-cols-2 gap-4",
  };

  return <div className={layoutClasses[layout]}>{children}</div>;
}

/* -------------------- Children Props Demo -------------------- */
function ChildrenProps() {
  return (
    <section className="p-8 bg-white rounded-lg shadow-md space-y-6">
      <h1 className="text-2xl font-bold text-black">Children Props</h1>

      <p className="text-gray-600">
        Children props allow you to pass components as data to other components,
        making them highly reusable.
      </p>

      <h3 className="font-semibold">Card components with Children</h3>

      <Container>
        {/* -------- User Profile -------- */}
        <Card title="User Profile" color="blue">
          <p>
            <strong>Name:</strong> John Doe
          </p>
          <p>
            <strong>Email:</strong> john@example.com
          </p>
          <p>
            <strong>Role:</strong> Developer
          </p>
        </Card>

        {/* -------- Statistics -------- */}
        <Card title="Statistics" color="green">
          <p className="flex justify-between">
            <span>Total Users:</span> <strong>1,234</strong>
          </p>
          <p className="flex justify-between">
            <span>Active Sessions:</span> <strong>567</strong>
          </p>
          <p className="flex justify-between">
            <span>Revenue:</span> <strong>$89,000</strong>
          </p>
        </Card>

        {/* -------- Quick Actions -------- */}
        <Card title="Quick Actions" color="purple">
          <button className="w-full mb-2 bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition">
            Create New
          </button>
          <button className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition">
            View All
          </button>
        </Card>

        {/* -------- Warning -------- */}
        <Card title="Warning" color="red">
          <p>
            Your trial period ends in 5 days. Please upgrade your account to
            continue using all features.
          </p>
        </Card>
      </Container>
    </section>
  );
}

export default ChildrenProps;
