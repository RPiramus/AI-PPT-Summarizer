import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import FileUploader from "./FileUploader";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/logo.png";

export default function Header({ onUploadComplete }) {
  const [showUploader, setShowUploader] = useState(false);
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/");
  };

  return (
    <header className="bg-gray-50 dark:bg-zinc-900 shadow-md sticky top-0 z-50 transition-colors duration-200">
      <div className="container mx-auto py-3 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <img src={logo} alt="RapidPPT Logo" className="h-10 w-10 rounded-full" />
          <Link
            to="/"
            className="text-2xl font-bold text-zinc-900 dark:text-zinc-100"
          >
            RapidPPT
          </Link>
        </div>

        <nav className="space-x-4 flex items-center">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-zinc-100 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-zinc-100 transition-colors"
              >
                Signup
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-700 dark:text-zinc-200">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-full border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Logout
              </button>
            </div>
          )}

          <button
            onClick={() => setShowUploader(true)}
            className="px-4 py-2 bg-zinc-700 dark:bg-zinc-500 text-stone-100 rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-600 transition-colors"
          >
            Upload File
          </button>

          <ThemeToggle />
        </nav>
      </div>

      {showUploader && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 dark:bg-black/50">
          <div className="bg-gray-50 dark:bg-zinc-900 p-6 relative w-11/12 max-w-md rounded-2xl shadow-xl transition-colors">
            <button
              onClick={() => setShowUploader(false)}
              className="absolute top-2 right-2 text-zinc-500 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-zinc-100 rounded-full p-1 transition-colors"
              aria-label="Close uploader"
            >
              ✕
            </button>

            <FileUploader
              onComplete={(summary, pdfUrl) => {
                onUploadComplete(summary, pdfUrl);
                setShowUploader(false);
              }}
            />
          </div>
        </div>
      )}
    </header>
  );
}
