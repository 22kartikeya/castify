import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 left-1/2 z-50 w-[95%] -translate-x-1/2 rounded-2xl bg-white/10 px-6 py-3 backdrop-blur-lg flex justify-between items-center shadow-md before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-50 before:pointer-events-none overflow-hidden"
    >
      {/* Glass reflection effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-30 pointer-events-none" />
      {/* Glass highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <button
        onClick={() => navigate("/")}
        className="relative text-3xl font-bold text-white cursor-pointer z-10"
      >
        Castify
      </button>
      <div className="relative space-x-8 z-10">
        <button
          onClick={() => navigate("/login")}
          className="relative text-white px-0 py-2 text-base font-semibold cursor-pointer transition duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] hover:text-orange-400 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-gradient-to-r before:from-orange-400 before:to-orange-600 before:transition-all before:duration-300 before:content-[''] hover:before:w-full before:shadow-[0_0_8px_rgba(255,165,0,0.6)]"
        >
          Sign In
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="text-white px-4 py-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-full text-base font-semibold transform transition-transform duration-200 hover:scale-110 cursor-pointer"
        >
          Sign Up
        </button>
      </div>
    </motion.nav>
  );
};
