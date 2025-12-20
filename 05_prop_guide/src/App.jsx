import React from "react";
import BasicProps from "./components/BasicProps";
import ChildrenProps from "./components/ChildrenProps";
import ComplexProps from "./components/ComplexProps";
import RefProps from "./components/RefProps";
import ThemeToggler, {
  ThemeProvider,
  useTheme,
} from "./components/ThemeToggler";

function Navigation() {
  const sections = [
    { id: "basic", label: "Basic Props", icon: "📦" },
    { id: "children", label: "Children Props", icon: "👶" },
    { id: "complex", label: "Complex Props", icon: "🧩" },
    { id: "ref", label: "Ref Props", icon: "🔗" },
    { id: "theme", label: "Theme Toggler", icon: "🎨" },
  ];

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 border-b border-white/10">
      <div className="flex justify-center gap-3 py-4">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition"
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

function AppContent() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
      <Navigation />

      <div className="container mx-auto px-4 py-10 space-y-10">
        <section id="basic">
          <BasicProps />
        </section>
        <section id="children">
          <ChildrenProps />
        </section>
        <section id="complex">
          <ComplexProps />
        </section>
        <section id="ref">
          <RefProps />
        </section>
        <section id="theme">
          <ThemeToggler />
        </section>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
