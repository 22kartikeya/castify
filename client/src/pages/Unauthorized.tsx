import { useNavigate } from "react-router-dom";

export const Unauthorized = () => {
    const navigate = useNavigate();
    return (
      <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_center,_#6a0572,_#1f1c2c,_#000428)]">
        <div className="text-center">
          <p className="sm:text-4xl text-2xl font-semibold bg-gradient-to-b from-orange-500 to-red-600 bg-clip-text text-transparent">
            404
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={() => navigate("/")}
              className="text-white px-4 py-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-full text-base font-semibold transform transition-transform duration-200 hover:scale-110 cursor-pointer"
            >
              Go back home
            </button>
          </div>
        </div>
      </main>
    );
}

