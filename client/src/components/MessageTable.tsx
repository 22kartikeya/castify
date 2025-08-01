import type { MessageTableProps } from "../types";
import { Loading } from "./ui/Loading";
import { MessageCard } from "./ui/MessageCard";

export const MessageTable = ({
  data,
  onDelete,
  isDeletingId,
}: MessageTableProps) => {
  if (data.length === 0) {
    return (
      <div className="mt-4 text-sm text-white/70 bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">
        No records found.
      </div>
    );
  }

  return (
    <div>
      <div className="-m-1.5 overflow-visible">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-visible rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl">
            <table className="min-w-full divide-y divide-white/10">
              <thead className="bg-white/20">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-bold text-white/90 uppercase tracking-wider ">
                    Title
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-white/90 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-white/90 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-white/90 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-white/90 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-2 py-2 text-center text-xs font-bold text-white/90 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white/2 divide-y divide-white/5">
                {data.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-white/12 hover:shadow-lg hover:scale-[1.01] transition-all duration-500 ease-out rounded-xl hover:rounded-xl"
                  >
                    <td
                      className={`px-4 py-2 text-sm font-light text-white/95 relative hover:text-white transition-colors duration-300 ${
                        index === data.length - 1 ? "rounded-bl-2xl" : ""
                      }`}
                    >
                      <div className="relative inline-block group">
                        <span className="cursor-pointer hover:drop-shadow-lg transition-all duration-300">
                          {item.title}
                        </span>

                        <MessageCard message={item.message}/>
                      </div>
                    </td>

                    <td className="px-4 py-2 whitespace-nowrap text-sm text-white/90 hover:text-white transition-colors duration-300">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-400/15 text-blue-200 border border-blue-300/20 backdrop-blur-sm shadow-lg ring-1 ring-blue-400/10 hover:bg-blue-400/25 hover:scale-105 hover:shadow-xl transition-all duration-300">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-white/90 hover:text-white transition-colors duration-300">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold backdrop-blur-sm shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 ${
                          item.status === "active"
                            ? "bg-emerald-400/15 text-emerald-200 border border-emerald-300/20 ring-1 ring-emerald-400/10 hover:bg-emerald-400/25"
                            : "bg-rose-400/15 text-rose-200 border border-rose-300/20 ring-1 ring-rose-400/10 hover:bg-rose-400/25"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-white/90 font-light hover:text-white transition-all duration-300">
                      {item.role}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-white/80 font-light hover:text-white transition-all duration-300">
                      {item.updatedAt}
                    </td>
                    <td
                      className={`px-4 py-2 whitespace-nowrap text-center ${
                        index === data.length - 1 ? "rounded-br-2xl" : ""
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => onDelete?.(item.id)}
                          disabled={isDeletingId === item.id}
                          className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-xl bg-rose-400/15 text-rose-200 border border-rose-300/20 backdrop-blur-sm hover:bg-rose-400/30 hover:text-rose-100 hover:border-rose-200/40 hover:shadow-xl hover:scale-110 focus:outline-none focus:ring-2 focus:ring-rose-300/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 ease-out ring-1 ring-rose-400/10 cursor-pointer"
                        >
                          {isDeletingId === item.id ? (
                            <Loading text={"Deleting.."} />
                          ) : (
                            "Delete"
                          )}
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-xl bg-amber-400/15 text-amber-200 border border-amber-300/20 backdrop-blur-sm hover:bg-amber-400/30 hover:text-amber-100 hover:border-amber-200/40 hover:shadow-xl hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-300/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 ease-out ring-1 ring-amber-400/10 cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
