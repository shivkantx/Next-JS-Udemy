import { useAppStore } from "../store/appStore.js";

function Navbar() {
  const user = useAppStore((state) => state.user);
  const theme = useAppStore((state) => state.theme);
  const logout = useAppStore((state) => state.logout);
  const toggleTheme = useAppStore((state) => state.toggleTheme);

  return (
    <nav className="w-full px-6 py-3 bg-white border-b border-gray-200 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Theme: <strong className="font-medium">{theme}</strong>
        </span>

        <button
          onClick={toggleTheme}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md
                     hover:bg-gray-100 transition"
        >
          Toggle
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <span className="text-sm font-medium">{user.name}</span>
            <button
              onClick={logout}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md
                         hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <span className="text-sm text-gray-500">Guest</span>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
