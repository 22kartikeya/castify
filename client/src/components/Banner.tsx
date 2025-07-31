import { XMarkIcon } from "@heroicons/react/20/solid";
import type { BannerProps } from "../types";
import { AnimatePresence, motion } from "framer-motion";

export const Banner = ({ messages, onDismiss }: BannerProps) => {
  if (!messages || messages.length === 0) return null;

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 250, damping: 30 }}
            className="relative isolate flex items-center gap-x-6 overflow-hidden rounded-2xl bg-gradient-to-r from-pink-100 via-pink-200 to-pink-400 px-6 py-3 sm:px-5 shadow-xl text-sm"
          >
            <div className="flex flex-1 flex-wrap items-center gap-x-4 gap-y-2 min-w-0">
              <p className="font-semibold truncate text-slate-900">
                {msg.message}
              </p>
            </div>
            <div className="flex">
              <button
                aria-label="Dismiss"
                onClick={() => onDismiss?.(msg.id)}
                className="rounded-full p-2 text-black hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-400 transition cursor-pointer"
              >
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
