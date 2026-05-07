import React from "react";
import { redirect } from "next/navigation";

async function FetchAPI() {
  const isloggedIn = true;

  if (!isloggedIn) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome User 🎉
        </h1>

        <p className="text-gray-600">You are successfully logged in.</p>
      </div>
    </div>
  );

  // const response = await fetch(
  //   "https://timeapi.io/api/Time/current/zone?timeZone=Asia/Kolkata",
  //   {
  //     cache: "force-cache",
  //     next: { revalidate: 60, tag: "timeapi" },
  //   },
  // );
  // if (!response.ok) {
  //   throw new Error("Failed to fetch");
  // }
  // const data = await response.json();
  // // Convert API datetime to milliseconds
  // const milliseconds = new Date(data.dateTime).getTime();
  // return (
  //   <div>
  //     <h1>Live Time API</h1>
  //     <p>Time: {data.time}</p>
  //     <p>Date: {data.date}</p>
  //     <p>Milliseconds: {milliseconds}</p>
  //     <p>Timezone: {data.timeZone}</p>
  //   </div>
  // );
}

export default FetchAPI;
