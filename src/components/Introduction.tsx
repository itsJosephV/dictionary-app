const Introduction = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="grid place-content-center min-h-20 text-center text-neutral-400 mt-10">
      <div className="flex flex-col gap-3">
        <p className="text-2xl mb-2">Type a word to look up in...</p>
        <p className="text-neutral-500">
          Most common use for the word might not appear first in results
        </p>
        <p className="text-neutral-500">
          "Similar words" will enable if such data exists
        </p>
        <p className="text-neutral-500">
          Some "Similar words" might not be available
        </p>
      </div>
      <span className="my-6"></span>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-neutral-500">
          by JosephV / {currentYear}—Present
        </p>
        <p className="text-neutral-500 text-sm">
          Powered by{" "}
          <a
            className="underline text-neutral-400 hover:text-white duration-300"
            href="https://rapidapi.com/hub"
            target="_blank"
            rel="noopener noreferrer"
          >
            rapidapi.com
          </a>
        </p>
        <p className="text-orange-400 text-sm">🚧 Work in progress 🚧</p>
      </div>
    </div>
  );
};

export default Introduction;

// https://rapidapi.com/hub
