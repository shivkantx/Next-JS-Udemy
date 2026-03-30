import React from "react";

function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold">About Me</h1>
          <p className="text-gray-600 mt-3">
            A brief introduction about me and my work.
          </p>
        </div>

        {/* About Section */}
        <div className="bg-white shadow rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold">Who I Am</h2>
          <p className="text-gray-600">
            I am a developer who enjoys building clean and user-friendly web
            applications. I focus on writing simple, efficient, and maintainable
            code.
          </p>
        </div>

        {/* Skills Section */}
        <div className="bg-white shadow rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold">Skills</h2>
          <ul className="grid grid-cols-2 gap-2 text-gray-700">
            <li>React</li>
            <li>JavaScript</li>
            <li>Tailwind CSS</li>
            <li>Node.js</li>
            <li>Git & GitHub</li>
            <li>REST APIs</li>
          </ul>
        </div>

        {/* Goals Section */}
        <div className="bg-white shadow rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold">Goals</h2>
          <p className="text-gray-600">
            My goal is to grow as a full-stack developer and build real-world
            applications that are useful and scalable.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
