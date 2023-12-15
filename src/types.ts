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
