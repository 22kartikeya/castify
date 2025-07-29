import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 text-white"
    >
      <h2 className="text-5xl md:text-8xl font-bold mt-40 mb-6">
        <span className="italic bg-gradient-to-b from-orange-500 to-red-600 bg-clip-text text-transparent">
          Broadcast Boldly
        </span>
        <br />
        <span className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent drop-shadow-xs drop-shadow-slate-400">
          with Castify
        </span>
      </h2>
      <p className="text-xl md:text-2xl max-w-2xl font-extralight">
        A real-time messaging and broadcasting app to connect instantly with
        your audience.
      </p>
      <motion.img
        src="https://img.shoplineapp.com/media/image_clips/5faa601af932dd755366c007/original.png?1605001242"
        alt="Dashboard Preview"
        className="mt-12 rounded-4xl border-20 border-white/20 shadow-[0_25px_50px_rgba(31,38,135,0.4)] backdrop-blur-md
             relative overflow-hidden cursor-pointer
             before:absolute before:inset-0 before:rounded-4xl before:border-20 
             before:border-gradient-to-br before:from-white/30 before:via-white/10 before:to-transparent
             before:bg-gradient-to-br before:backdrop-blur-xl before:pointer-events-none
             after:absolute after:inset-0 after:rounded-4xl
             after:bg-gradient-to-br after:from-white/10 after:via-transparent after:to-transparent
             after:opacity-40 after:pointer-events-none"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          scale: { duration: 0.3, ease: "easeOut" },
        }}
        style={{
          boxShadow: `
      0 0 0 1px rgba(255, 255, 255, 0.1),
      0 0 0 2px rgba(255, 255, 255, 0.05),
      0 25px 50px rgba(31, 38, 135, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2)
    `,
        }}
      />
    </motion.section>
  );
};
