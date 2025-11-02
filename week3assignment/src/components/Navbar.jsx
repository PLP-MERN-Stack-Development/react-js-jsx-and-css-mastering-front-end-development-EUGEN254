// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">
        React App
      </Link>

      <div className="flex gap-4 items-center">
        <Link to="/tasks" className="hover:underline">Tasks</Link>
        <Link to="/data" className="hover:underline">API Data</Link>

        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded bg-gray-200 text-black dark:bg-gray-700 dark:text-white transition"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}
