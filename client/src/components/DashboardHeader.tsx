

export const DashboardHeader = ({email, handlelogout}) => {
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
          <button
            onClick={handlelogout}
            className="text-white px-4 py-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-full text-base font-semibold transform transition-transform duration-200 hover:scale-110 cursor-pointer"
          >
            Logout
          </button>
        </nav>
      </header>
    );
}