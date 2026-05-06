import React from "react";

async function FetchAPI() {
  const response = await fetch(
    "https://timeapi.io/api/Time/current/zone?timeZone=Asia/Kolkata",
    {
      cache: "force-cache",
      next: { revalidate: 60, tag: "timeapi" },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  const data = await response.json();

  // Convert API datetime to milliseconds
  const milliseconds = new Date(data.dateTime).getTime();

  return (
    <div>
      <h1>Live Time API</h1>

      <p>Time: {data.time}</p>

      <p>Date: {data.date}</p>

      <p>Milliseconds: {milliseconds}</p>

      <p>Timezone: {data.timeZone}</p>
    </div>
  );
}

export default FetchAPI;
