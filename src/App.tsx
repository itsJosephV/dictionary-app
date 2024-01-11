import { useEffect, useRef, useState } from "react";

// Components
import Form from "./components/Form";
import SimilarToList from "./components/SimilarToList";

// Hooks
import List from "./components/List";
import FavoriteWords from "./components/FavoriteWords";
import SettNav from "./components/SettNav";
import { useDictionaryContext } from "./context/api/useDictionaryContext";

const App = () => {
  const [word, setWord] = useState<string | null>(null);
  const [resultsLimit, setResultsLimit] = useState<number | null>(5);
  const [isSimilarWordsActive, setIsSimilarWordsActive] =
    useState<boolean>(false);
  const [isAutoFocusEn, setIsAutoFocusEn] = useState<boolean>(true);
  const [onSimilarToWords, setOnSimilarToWords] = useState<string | null>(null);
  const [onSynAntWords, setOnSynAntWords] = useState<string | null>(null);
  const [isClearEn, setIsClearEn] = useState<boolean>(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

  const form = useRef<HTMLFormElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);

  const {
    dictionaryData,
    storedWords,
    isReseteableEn,
    setDictionaryData,
    setSimilarToData,
    setError,
    fetchDictionary,
    setIsReseteableEn,
  } = useDictionaryContext();

  const handleFormSubmit = async (word: string) => {
    if (!word?.length) {
      return;
    }
    await fetchDictionary(word, true);
    setOnSimilarToWords(null);
    setOnSynAntWords(null);
    setResultsLimit(5);
    setIsReseteableEn(false);
    setIsSimilarWordsActive(false);
  };

  //? Helpers to avoid unnecessary shorcuts calls when no data
  // const formBool: boolean = Boolean(word?.length);

  const handleCleanResults = (e: React.FormEvent) => {
    e.preventDefault();
    setWord(null);
    setDictionaryData(null);
    setSimilarToData(null);
    setError("");
    setResultsLimit(null);
    setIsSimilarWordsActive(false);
    setIsClearEn(false);
    setIsReseteableEn(false);
  };

  const handleSimilarToButton = (e: React.ChangeEvent<HTMLDetailsElement>) => {
    if (!dictionaryData) {
      return;
    }
    setIsSimilarWordsActive(e.target.open);
  };

  const handleBackToFirst = () => {
    const firstWordInArr = storedWords[0];
    if (storedWords) {
      fetchDictionary(firstWordInArr, true);
      setWord(firstWordInArr);
      setIsReseteableEn(false);
    }
  };

  //? Perf: better testing & improve — useCallback?
  useEffect(() => {
    if (!onSimilarToWords) {
      return;
    }
    setWord(onSimilarToWords);
    fetchDictionary(onSimilarToWords, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSimilarToWords]);

  useEffect(() => {
    if (!onSynAntWords) {
      return;
    }
    setWord(onSynAntWords);
    fetchDictionary(onSynAntWords, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSynAntWords]);

  useEffect(() => {
    if (!dictionaryData?.word) {
      return;
    }
    setWord(dictionaryData.word);
  }, [dictionaryData?.word]);

  /**
   * Clear button displays if word in input exist
   * and persists if data exists & there's not word in input
   */
  useEffect(() => {
    setIsClearEn(!!word || (!!dictionaryData && !word));
  }, [word, dictionaryData]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const regex = /^[a-zA-Z]$/;

      if (e.metaKey || e.ctrlKey || e.shiftKey) {
        return;
      }

      if (!isAutoFocusEn) {
        return;
      }

      if (regex.test(e.key) || (word && e.key === "Backspace")) {
        form.current?.word.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isAutoFocusEn, word]);

  return (
    <>
      <SettNav
        isAutoFocusEn={isAutoFocusEn}
        isDetailsOpen={isDetailsOpen}
        setIsDetailsOpen={setIsDetailsOpen}
        setIsAutoFocusEn={setIsAutoFocusEn}
      />
      <main className="max-w-[640px] mx-auto pt-10 md:pt-12 px-5 pb-6 min-h">
        <section className="mb-7">
          <FavoriteWords />
        </section>
        <section className="mb-7">
          <Form
            form={form}
            isClearEn={isClearEn}
            clearButtonRef={clearButtonRef}
            handleFormSubmit={handleFormSubmit}
            handleCleanResults={handleCleanResults}
            word={word}
            setWord={setWord}
            handleBackToFirst={handleBackToFirst}
            isReseteableEn={isReseteableEn}
          />
          <SimilarToList
            handleSimilarToButton={handleSimilarToButton}
            isSimilarWordsActive={isSimilarWordsActive}
            setOnSimilarToWords={setOnSimilarToWords}
          />
        </section>
        <List
          resultsLimit={resultsLimit}
          setOnSynAntWords={setOnSynAntWords}
          setResultsLimit={setResultsLimit}
          isDetailsOpen={isDetailsOpen}
        />
      </main>
    </>
  );
};

export default App;
