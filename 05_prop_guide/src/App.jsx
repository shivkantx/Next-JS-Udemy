import React from "react";

import BasicProps from "./components/BasicProps";
import ChildrenProps from "./components/ChildrenProps";
import ComplexProps from "./components/ComplexProps";
import RefProps from "./components/RefProps";
import ThemeToggler from "./components/ThemeToggler";

function Navigation() {
  const sections = [
    { id: "basic", label: "Basic Props", icon: "📦" },
    { id: "children", label: "Children Props", icon: "👶" },
    { id: "complex", label: "Complex Props", icon: "🧩" },
    { id: "ref", label: "Ref Props", icon: "🔗" },
    { id: "theme", label: "Theme Toggler", icon: "🎨" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 to-slate-800 backdrop-blur border-b border-white/10">
      <div className="flex justify-center items-center gap-3 py-4 px-4">
        {sections.map((section) => (
          <button
            key={section.id}
            className="
              flex items-center gap-2
              font-medium text-sm
              bg-indigo-600 text-white
              px-4 py-2 rounded-lg
              hover:bg-indigo-500
              active:scale-95
              transition-all duration-200
            "
          >
            <span>{section.icon}</span>
            <span>{section.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

function AppContent() {
  const isDark = true;
  return (
    <div className="min-h-screen w-full text-white bg-gray-800">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <header
          className={`text-center mb-12 transition-colors ${
            isDark ? "text-white" : "text-gray-800"
          }`}
        >
          <h1 className="text-5xl font-bold mb-4">React Props Explained</h1>
          <p
            className={` text-xl ${isDark ? "text-gray-300" : "text-gray-500"}`}
          >
            A comprehensive guide to understanding React props
          </p>
        </header>

        <div className="space-y-8">
          <div id="basic" className="scroll-mt-200 ">
            <BasicProps />
          </div>
          <div id="basic" className="scroll-mt-200 ">
            <ChildrenProps />
          </div>
          <div id="basic" className="scroll-mt-200 ">
            <ComplexProps />
          </div>
          <div id="basic" className="scroll-mt-200 ">
            <RefProps />
          </div>

          <div id="theme" className="scroll-mt-200 ">
            <ThemeToggler />
          </div>
        </div>
        <footer className="text-center mt-12 py-6 border-t border-gray-700 text-gray-400">
          &copy; {new Date().getFullYear()} React Props Guide. All rights
          reserved by Shiv.
        </footer>
      </div>
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
