import { useAuthStore } from "../store/useAuthStore";
import type { DashHeader } from "../types";

export const DashboardHeader = ({
  email,
  handleCreateMessage,
  handlelogout
}: DashHeader) => {
  const { role } = useAuthStore();
  return (
    <header className="fixed top-0 left-0 w-full z-50 py-3">
      <nav className="max-w-[85rem] mx-auto px-4 flex items-center justify-between">
        <a className="text-3xl font-bold text-white" href="#">
          Castify
        </a>
        <div className="hidden sm:flex gap-5 mt-0 text-white">
          <span>Account:</span>
          {email}
        </div>
        <div className="flex flex-row gap-4">
          {role === "admin" && (
            <button
              onClick={handleCreateMessage}
              className="group relative px-4 py-2 rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 text-black font-semibold tracking-wider text-base hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-700 transform hover:rotate-1 transition-all duration-300 ease-out shadow-[0_0_20px_rgba(251,191,36,0.5)] hover:shadow-[0_0_30px_rgba(251,191,36,0.7)] active:scale-90 overflow-hidden before:absolute before:inset-0 before:rounded-full before:border-2 before:border-amber-400/50 before:transition-all before:duration-300 hover:before:scale-105 cursor-pointer"
            >
              <span className="flex items-center gap-2 relative z-10">
                Create Message
                <svg
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                  className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2"
                >
                  <path
                    d="M5 12h14m-7-7l7 7-7 7"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </span>
            </button>
          )}
          <button
            onClick={handlelogout}
            className="text-white px-4 py-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-full text-base font-semibold transform transition-transform duration-200 hover:scale-110 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};
