import { createContext, useContext, useState } from "react";

/* ================= THEME CONTEXT ================= */
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, isDark: theme === "dark" }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}

/* ================= TOGGLE BUTTON ================= */
function ThemeTogglerButton() {
  const { toggleTheme, isDark } = useTheme();

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium">
        {isDark ? "Dark Mode" : "Light Mode"}
      </span>

      <button
        onClick={toggleTheme}
        className={`relative w-14 h-7 rounded-full overflow-hidden
          transition-colors duration-300
          ${isDark ? "bg-blue-600" : "bg-gray-300"}
        `}
      >
        {/* Toggle Knob */}
        <span
          className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full
            flex items-center justify-center text-xs
            transition-transform duration-300
            ${isDark ? "translate-x-7" : "translate-x-0"}
          `}
        >
          {isDark ? "🌙" : "☀️"}
        </span>
      </button>
    </div>
  );
}

/* ================= CARD ================= */
function Card({ title, children }) {
  const { isDark } = useTheme();

  return (
    <div
      className={`p-6 rounded-xl shadow-md transition-colors duration-300
        ${isDark ? "bg-slate-800 text-slate-200" : "bg-white text-slate-800"}
      `}
    >
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}

/* ================= SECTIONS ================= */
function UserInformation() {
  const { isDark } = useTheme();

  return (
    <Card title="User Information">
      <p>Name: John Doe</p>
      <p>Email: john@example.com</p>
      <p>Role: Developer</p>

      <div className="flex gap-3 mt-4">
        <button
          className={`px-4 py-2 rounded-md text-sm font-bold text-white
            ${isDark ? "bg-blue-600" : "bg-orange-500"}
          `}
        >
          Edit Profile
        </button>

        <button
          className={`px-4 py-2 rounded-md text-sm font-bold
            ${
              isDark
                ? "bg-slate-700 text-slate-200"
                : "bg-gray-200 text-slate-800"
            }
          `}
        >
          Settings
        </button>
      </div>
    </Card>
  );
}

function Statistics() {
  const { theme } = useTheme();

  return (
    <Card title="Statistics">
      <div className="flex justify-between">
        <span>Total Clicks:</span>
        <span className="font-semibold text-blue-500">0</span>
      </div>

      <div className="flex justify-between mt-2">
        <span>Theme:</span>
        <span className="font-semibold">{theme}</span>
      </div>

      <div className="flex justify-between mt-2">
        <span>Status:</span>
        <span className="font-semibold text-green-500">Active</span>
      </div>
    </Card>
  );
}

function InteractiveDemo() {
  const { isDark } = useTheme();

  return (
    <Card title="Interactive Demo">
      <p className="mb-4 text-sm">
        Try clicking the buttons below to see how they adapt to the current
        theme:
      </p>

      <div className="flex gap-3 flex-wrap">
        <button
          className={`px-4 py-2 rounded-md text-sm font-bold text-white
            ${isDark ? "bg-blue-600" : "bg-orange-500"}
          `}
        >
          Primary Action
        </button>

        <button
          className={`px-4 py-2 rounded-md text-sm font-bold
            ${
              isDark
                ? "bg-slate-700 text-slate-200"
                : "bg-gray-200 text-slate-800"
            }
          `}
        >
          Secondary Action
        </button>

        <button
          className={`px-4 py-2 rounded-md text-sm font-bold text-white
            ${isDark ? "bg-blue-600" : "bg-orange-500"}
          `}
        >
          Reset Counter
        </button>
      </div>
    </Card>
  );
}

/* ================= MAIN EXPORT ================= */
export default function ThemeToggler() {
  const { isDark } = useTheme();

  return (
    <section
      className={`p-8 rounded-xl transition-colors duration-300
        ${isDark ? "bg-slate-900 text-white" : "bg-gray-50 text-slate-800"}
      `}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Theme Toggler</h2>
          <p className="text-sm opacity-80">
            This section demonstrates theme toggling using Context API.
          </p>
        </div>

        <ThemeTogglerButton />
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <UserInformation />
        <Statistics />
      </div>

      {/* Interactive Demo */}
      <div className="mt-6">
        <InteractiveDemo />
      </div>
    </section>
  );
}
