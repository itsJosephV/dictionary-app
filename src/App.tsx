import { Fragment, useEffect, useRef, useState } from "react";
// Components
import DefinitionCard from "./components/DefinitionCard";
import LoadingData from "./components/LoadingData";
import ErrorMessage from "./components/ErrorMessage";
import Introduction from "./components/Introduction";
import SimilarToToggle from "./components/SimilarToToggle";
import RestartButton from "./components/RestartButton";
import Form from "./components/Form";
import Header from "./components/Header";
import SimilarToCard from "./components/SimilarToCard";

// Icons
import { CaretDown } from "./icons/CaretDown";
import { CaretUp } from "./icons/CaretUp";

// Utils
import { handleLessDataKey } from "./utils/keyboardutils/handleLessDataKeys"
import { handleSimilarToKey } from "./utils/keyboardutils/handleSimilarToKey";
import { handleMoreDataKey } from "./utils/keyboardutils/handleMoreDataKeys";

// Hooks
import { useFetchDictionary } from "./utils/data/useFetchDictionary";

function App() {
  const [limit, setLimit] = useState<number | null>(5);
  const [autofocus, SetAutoFocus] = useState<boolean>(true);
  const [cleaner, setCleaner] = useState<boolean>(false);
  const [isSimilarWordsActive, setIsSimilarWordsActive] = useState<boolean>(false);
  const [onSimilarWords, setOnSimilarWords] = useState<string | null>(null);

  const form = useRef<HTMLFormElement>(null);
  const moreDataRef = useRef<HTMLButtonElement>(null);
  const lessDataRef = useRef<HTMLButtonElement>(null);
  const similarToRef = useRef<HTMLButtonElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);

  const {
    dataDictionary,
    dataWordSimilar,
    error,
    isLoading,
    firstWords,
    firstInArr,
    setDataDictionary,
    setError,
    setFirstInArr,
    fetchDictionary,
  } = useFetchDictionary();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOnSimilarWords(null);
    setLimit(5);
    const word = form.current?.word.value;
    if (word.length === 0) {
      return;
    }
    fetchDictionary(word, true);
    setCleaner(true);
  };

  //? Helpers to avoid unnecessary shorcuts calls when no data
  const formBool: boolean = Boolean(form.current?.word.value);
  const similarToBool: boolean = Boolean(dataWordSimilar?.similarTo?.length);

  const handleCleanResults = (e: React.FormEvent) => {
    e.preventDefault();
    form.current?.reset();
    setDataDictionary(null);
    setError("");
    setLimit(null);
    setIsSimilarWordsActive(false);
    setCleaner(false);
    setFirstInArr(false);
  };

  const handleSimilarToButton = () => {
    if (!dataDictionary) {
      return;
    }
    setIsSimilarWordsActive(!isSimilarWordsActive);
  };

  const handleWhipeKeys = (e: KeyboardEvent) => {
    if (!dataDictionary && !formBool) {
      return;
    }
    if (e.shiftKey && e.key === "C") {
      e.preventDefault();
      clearButtonRef.current?.click();
    }
  };

  const handleBackToFirst = () => {
    const firstWordInArr = firstWords[0];
    if (firstWords && form.current) {
      fetchDictionary(firstWordInArr, true);
      form.current.word.value = firstWordInArr;
      setFirstInArr(false);
    }
  };

  //? Chore: better testing & improve — useCallback?
  useEffect(() => {
    if (onSimilarWords !== null) {
      if (form.current) {
        form.current.word.value = onSimilarWords;
        fetchDictionary(onSimilarWords, false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSimilarWords]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const regex = /^[a-zA-Z]$/;
      const inputValue = form.current?.word.value;

      if (e.metaKey || e.ctrlKey || e.shiftKey) {
        return;
      }

      if (autofocus) {
        if (
          regex.test(e.key) ||
          (inputValue.length > 0 && e.key === "Backspace")
        ) {
          form.current?.word.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [autofocus]);

  // const isMac = navigator.userAgent.indexOf("Mac") != -1;
  // const isWin = navigator.userAgent.indexOf("Win") != -1;

  useEffect(() => {
    document.addEventListener("keydown", handleWhipeKeys);
    return () => {
      document.removeEventListener("keydown", handleWhipeKeys);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDictionary, formBool]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (dataDictionary !== null) {
        handleMoreDataKey(e, limit, dataDictionary, moreDataRef);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [limit, dataDictionary]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleLessDataKey(e, limit, dataDictionary, lessDataRef);
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [limit, dataDictionary]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleSimilarToKey(e, similarToBool, similarToRef);
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [similarToBool]);

  console.log(dataDictionary);
  console.log(dataWordSimilar);

  return (
    <main className="min-h-screen mx-auto pb-5">
      <section className="mb-5 pt-14 border-b bg-neutral-900 border-neutral-600/60 pb-5">
        <Header autofocus={autofocus} SetAutoFocus={SetAutoFocus} />
      </section>
      <article className="max-w-[850px] mx-auto px-5">
        <Form
          form={form}
          cleaner={cleaner}
          clearButtonRef={clearButtonRef}
          handleFormSubmit={handleFormSubmit}
          handleCleanResults={handleCleanResults}
        />
        <div className="mt-1.5 flex justify-between items-center">
          <SimilarToToggle
            handleSimilarToButton={handleSimilarToButton}
            similarToBool={similarToBool}
            isSimilarWordsActive={isSimilarWordsActive}
            similarToRef={similarToRef}
          />
          {firstInArr && (
            <RestartButton handleBackToFirst={handleBackToFirst} />
          )}
        </div>

        {isSimilarWordsActive && (
          <SimilarToCard
          dataWordSimilar={dataWordSimilar}
          setOnSimilarWords={setOnSimilarWords}
          />
        )}

        <section>
          {isLoading && <LoadingData />}
          {error && <ErrorMessage error={error} />}
          {dataDictionary
            ? dataDictionary && (
                <Fragment>
                  <div className="flex items-center flex-wrap mb-2 mt-5">
                    <p className="text-3xl font-semibold mr-2">{dataDictionary.word}</p>
                    <p className="text-neutral-400">
                      {dataDictionary.pronunciation.all}
                    </p>
                  </div>
                  <div className="mb-2">
                    <p className="text-neutral-500 text-xs ">
                      {dataDictionary.results.length} Results found
                    </p>
                  </div>
                  <ul>
                    {dataDictionary.results
                      ?.slice(0, limit ? limit : dataDictionary.results.length)
                      .map((item, i) => (
                        <DefinitionCard key={i} item={item} />
                      ))}
                  </ul>
                  {dataDictionary.results.length > 5 ? (
                    limit ? (
                      <button
                        ref={moreDataRef}
                        className="flex items-center text-sm text-neutral-400 hover:text-white duration-200 mt-2"
                        onClick={() => setLimit(null)}
                      >
                        More results
                        <span>
                          <CaretDown />
                        </span>
                      </button>
                    ) : (
                      <button
                        ref={lessDataRef}
                        className="flex items-center text-sm text-neutral-400 hover:text-white duration-200 mt-2"
                        onClick={() => setLimit(5)}
                      >
                        Less results
                        <span>
                          <CaretUp />
                        </span>
                      </button>
                    )
                  ) : null}
                </Fragment>
              )
            : !isLoading && !error && <Introduction />}
        </section>
      </article>
    </main>
  );
}

export default App;
