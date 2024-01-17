import { useState } from "react";
import { useDictionaryContext } from "../context/api/useDictionaryContext";
import { useFavoriteWords } from "../context/favoriteWords/useFavoriteWordsContext";
import { RemoveFavorite } from "../icons/RemoveFavorite";
// import ShortCutsInfo from "./ShortCutsInfo";

const FavouritesDesktop = () => {
  const { favorites, removeFavorite } = useFavoriteWords();
  const { fetchDictionary, setIsReseteableEn } = useDictionaryContext();
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  return (
    <section className="fixed  pt-14 h-full max-w-[200px] z-10 custom-media hidden">
        <div className="mb-4">
          <h1 className="font-bold  pl-5 text-neutral-400">Favourites</h1>
          <p className="text-neutral-500 text-sm pl-5">Save up to 15 words</p>
        </div>
        {!favorites.length && (
          <div>
            <p className="text-sm text-neutral-400 pl-5">No favourites found</p>
          </div>
        )}
        {favorites && (
          <ul className="">
            {favorites.map((item) => {
              return (
                <li
                  className="pl-5 flex mt-2 items-center justify-between"
                  key={item}
                  onMouseEnter={() => setHoveredIndex(item)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <button
                    className="text-sm text-neutral-500 hover:text-white duration-200  outline-none overflow-hidden text-ellipsis whitespace-nowrap w-full text-start"
                    onClick={(e) => {
                      e.preventDefault();
                      fetchDictionary(item, true);
                      setIsReseteableEn(false);
                    }}
                  >
                    {item}
                  </button>
                  {hoveredIndex === item && (
                    <button
                      className="p-0.5 text-neutral-500 hover:text-white duration-200"
                      onClick={() => removeFavorite(item)}
                    >
                      <RemoveFavorite />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      {/* <label htmlFor="" className="flex flex-col mb-10">
        <p className="text-xs mb-2 text-neutral-500">
          Keyboard shorcuts (Desktop)
        </p>
        <ShortCutsInfo />
      </label> */}
    </section>
  );
};

export default FavouritesDesktop;