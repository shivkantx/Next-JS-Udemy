import React, { useState } from "react";

/* -------------------- User Profile Card -------------------- */
function UserProfileCard({ user, theme, actions }) {
  return (
    <div
      className={`p-6 rounded-xl shadow-md ${theme.backgroundColor} ${theme.textColor}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className={`w-16 h-16 flex items-center justify-center rounded-full font-bold text-xl ${theme.avatarBg}`}
        >
          {user.name.charAt(0)}
        </div>

        {/* User Info */}
        <div>
          <h2 className="font-bold text-xl">{user.name}</h2>
          <p className="text-sm">{user.email}</p>
          <span
            className={`inline-block mt-1 px-2 py-1 rounded-xl text-xs font-semibold ${theme.badgeBg}`}
          >
            {user.role} · {user.status}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-between text-center mt-4">
        <div>
          <p className="font-semibold text-sm">{user.stats.posts}</p>
          <p className="text-sm">Posts</p>
        </div>
        <div>
          <p className="font-semibold text-sm">{user.stats.followers}</p>
          <p className="text-sm">Followers</p>
        </div>
        <div>
          <p className="font-semibold text-sm">{user.stats.following}</p>
          <p className="text-sm">Following</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={actions.primary.onClick}
          className={`w-1/2 py-2 rounded-lg transition ${actions.primary.className}`}
        >
          {actions.primary.label}
        </button>

        <button
          onClick={actions.secondary.onClick}
          className={`w-1/2 py-2 rounded-lg transition ${actions.secondary.className}`}
        >
          {actions.secondary.label}
        </button>
      </div>
    </div>
  );
}

/* -------------------- Complex Props -------------------- */
function ComplexProps() {
  const [message, setMessage] = useState("");

  const usersData = [
    {
      user: {
        name: "Shiv Kant",
        email: "shivkant@example.com",
        role: "Admin",
        status: "Active",
        stats: {
          posts: 120,
          followers: 3000,
          following: 180,
        },
      },
      theme: {
        backgroundColor: "bg-gradient-to-br from-purple-100 to-blue-100",
        textColor: "text-gray-800",
        avatarBg: "bg-purple-300",
        badgeBg: "bg-purple-200",
      },
      actions: {
        primary: {
          label: "View Profile",
          onClick: () => setMessage("Viewing Shiv Kant's profile"),
          className: "bg-blue-500 text-white hover:bg-blue-600",
        },
        secondary: {
          label: "Message",
          onClick: () => setMessage("Opening message to Shiv Kant"),
          className: "bg-purple-500 text-white hover:bg-purple-600",
        },
      },
    },
    {
      user: {
        name: "Priyanshu Saini",
        email: "priyanshu.sharma@example.com",
        role: "Editor",
        status: "Inactive",
        stats: {
          posts: 58,
          followers: 1240,
          following: 310,
        },
      },
      theme: {
        backgroundColor: "bg-gradient-to-br from-green-100 to-teal-100",
        textColor: "text-gray-800",
        avatarBg: "bg-green-300",
        badgeBg: "bg-green-200",
      },
      actions: {
        primary: {
          label: "View Profile",
          onClick: () => setMessage("Viewing Priyanshu Saini's profile"),
          className: "bg-green-500 text-white hover:bg-green-600",
        },
        secondary: {
          label: "Message",
          onClick: () => setMessage("Opening message to Priyanshu Saini"),
          className: "bg-teal-500 text-white hover:bg-teal-600",
        },
      },
    },
  ];

  return (
    <section className="bg-white p-8 rounded-lg space-y-8">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        User Profile Cards (Complex Props)
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {usersData.map((data, index) => (
          <UserProfileCard key={index} {...data} />
        ))}
      </div>

      {message && (
        <div className="text-center bg-blue-50 text-blue-700 p-3 rounded-md">
          {message}
        </div>
      )}
    </section>
  );
}

export default ComplexProps;
