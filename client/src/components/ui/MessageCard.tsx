export const MessageCard = (prop: {message : string}) => {
    return (
      <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 px-4 py-3 bg-white/50 backdrop-blur-xl text-black font-bold text-sm rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[9999] w-60 ring-1 ring-white/20 break-words leading-relaxed pointer-events-none hover:shadow-3xl">
        {prop.message || "No message available"}
        <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[8px] border-b-[8px] border-r-[8px] border-transparent border-r-white/50"></div>
      </div>
    );
}