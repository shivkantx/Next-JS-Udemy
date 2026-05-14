import { url } from "inspector";
import React from "react";

export const metadata = {
  title: "About Us",
  description: "Learn more about our company and team.",
  openGraph: {
    title: "Authentic web vibe",
    description: "Discover our company values, mission, and team members.",
    url: "https://www.example.com/about",
    image: [
      {
        url: "/globe.svg",
        width: 800,
        height: 600,
        alt: "Og Image Alt",
      },
      {
        url: "/globe.svg",
        width: 1800,
        height: 1600,
        alt: "Og Image Alt Second",
      },
    ],
  },
};

function AboutPage() {
  return <div>About page</div>;
}

export default AboutPage;
