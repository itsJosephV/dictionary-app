export interface WordResults {
  definition: string;
  derivation?: string;
  examples?: string[];
  partOfSpeech: string;
  antonyms?: string[];
  synonyms?: string[];
}

export interface DictionaryItem {
  pronunciation?: {
    all: string
  };
  results: WordResults[];
  word: string;
}

export interface WordSimilarTo {
  length: number;
  similarTo?: string[];
}

export interface FavoriteWords {
  favorites: string[];
  addFavorite: (word: string) => void
  removeFavorite: (word: string) => void
  cleanLocalStorage: () => void
}

export interface DictionaryCtx {
  dictionaryData: DictionaryItem | null;
  similarToData: WordSimilarTo | null;
  error: string | null;
  isLoading: boolean;
  storedWords: string[];
  isReseteableEn: boolean;
  setDictionaryData: (data: DictionaryItem | null) => void;
  setSimilarToData: (data: WordSimilarTo | null) => void;
  setError: (error: string | null) => void;
  setIsReseteableEn: (value: boolean) => void;
  fetchDictionary: (word: string, cleanArray?: boolean) => Promise<void>;
  fetchDictionaryRandom: () => Promise<void>;
}

export interface FunctionalityCtx {
  word: string | null;
  form: React.RefObject<HTMLFormElement>;
  isAutoFocusEn: boolean;
  isSimilarWordsActive: boolean;
  resultsLimit: number | null;
  isClearEn: boolean;
  isDetailsOpen: boolean;
  handleFormSubmit: (word: string) => Promise<void>;
  handleSimilarToButton: (e: React.ChangeEvent<HTMLDetailsElement>) => void;
  handleCleanResults: (e: React.FormEvent) => void;
  handleBackToFirst: () => void;
  setWord: React.Dispatch<React.SetStateAction<string | null>>;
  setOnSimilarToWords: React.Dispatch<React.SetStateAction<string | null>>;
  setIsAutoFocusEn: React.Dispatch<React.SetStateAction<boolean>>;
  setOnSynAntWords: React.Dispatch<React.SetStateAction<string | null>>;
  setIsDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setResultsLimit: React.Dispatch<React.SetStateAction<number | null>>;
}

