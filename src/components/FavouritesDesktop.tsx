import { useDictionaryContext } from "../context/api/useDictionaryContext";
import { useFavoriteWords } from "../context/favoriteWords/useFavoriteWordsContext";
import { RemoveFavorite } from "../icons/RemoveFavorite";

const FavouritesDesktop = () => {
  const { favorites, removeFavorite } = useFavoriteWords();
  const { fetchDictionary, setIsReseteableEn } = useDictionaryContext();
  return (
    <div className="absolute h-auto min-w-[210px] left-0 pt-12 z-10 custom-media hidden">
      <div className=" bg-neutral-950/50 backdrop-blur-md rounded-md p-3 border border-neutral-800">
        <div className="mb-5">
          <h1 className=" font-bold">Favorites ★</h1>
          <p className="text-neutral-400 text-sm">Save up to 25 words</p>
        </div>
        {!favorites.length && (
          <p className="text-sm text-neutral-400">No favorites found</p>
        )}
        {favorites && (
          <ul className="">
            {favorites.map((item) => {
              return (
                <li
                  className="h-[30px] p-1.5 flex items-center rounded-md hover:bg-neutral-800 duration-200 outline-none"
                  key={item}
                >
                  <button
                    className="flex flex-grow text-sm text-neutral-400 hover:text-white duration-200 truncate"
                    onClick={(e) => {
                      e.preventDefault();
                      fetchDictionary(item, true);
                      setIsReseteableEn(false);
                    }}
                  >
                    {item}
                  </button>
                  <button
                    className="p-0.5 text-neutral-500 hover:text-white duration-200"
                    onClick={() => removeFavorite(item)}
                  >
                    <RemoveFavorite />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FavouritesDesktop;
