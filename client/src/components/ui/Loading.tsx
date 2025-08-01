type LoadingProp = {
  text?: string
}

export const Loading = ({text} : LoadingProp) => {
    return (
      <div className="flex flex-auto flex-col justify-center items-center">
        <div
          className="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-blue-600 rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">{text ? text : "Loading..."}</span>
        </div>
      </div>
    );
}