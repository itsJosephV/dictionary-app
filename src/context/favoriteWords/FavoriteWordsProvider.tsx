import { ReactNode, createContext, useEffect, useState } from "react";
import { FavoriteWords } from "../../types";

export const FavoriteWordsContext = createContext<FavoriteWords | null>(null);

type Props = {
  children?: ReactNode;
};

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (word: string) => {
    if (favorites.length < 15) {
      setFavorites((prevFavs) => [...prevFavs, word]);
    } else {
      alert("only 15 favourites words allowed");
    }
  };

  const removeFavorite = (word: string) => {
    setFavorites((prevFavs) => prevFavs.filter((item) => item !== word));
  };

  const cleanLocalStorage = () => {
    if (!favorites.length) {
      return;
    }
    if (window.confirm("are you sure?")) {
      setFavorites([]);
    }
  };

  return (
    <FavoriteWordsContext.Provider
      value={{ favorites, addFavorite, removeFavorite, cleanLocalStorage }}
    >
      {children}
    </FavoriteWordsContext.Provider>
  );
};
