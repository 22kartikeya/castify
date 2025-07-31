import { XMarkIcon } from "@heroicons/react/20/solid";
import type { BannerProps } from "../types";

export const Banner = ({messages, onDismiss} : BannerProps) => {
  return (
    <div className="space-y-2">
      {messages.map((msg) => (
        <div
          key={`${msg.id}`}
          className="relative isolate flex items-center gap-x-6 overflow-hidden rounded-2xl bg-gradient-to-r from-pink-100 via-pink-200 to-pink-400 px-6 py-3 sm:px-5 shadow-xl animate-fade-in"
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="font-semibold text-sm text-slate-900">
              {msg.message}
            </p>
          </div>
          <div className="flex flex-1 justify-end">
            <button
              type="button"
              aria-label="Dismiss"
              onClick={() => onDismiss?.(msg.id)}
              className="rounded-full p-2 text-black hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-400 transition cursor-pointer"
            >
              <XMarkIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
