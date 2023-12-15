import { WordResults } from "../types";

interface WordCardProps {
  item: WordResults;
  setOnSynAntWords: React.Dispatch<React.SetStateAction<string | null>>;
}

const DefinitionCard: React.FC<WordCardProps> = ({
  item,
  setOnSynAntWords,
}) => {
  const handleSynAntButton = (synOrAnt: string) => {
    if (synOrAnt) {
      setOnSynAntWords(synOrAnt);
    }
  };
  return (
    <li className="mb-3 bg-neutral-900 hover:bg-neutral-900/80 duration-200 pt-2 pb-3 px-3 rounded-sm last:mb-0">
      <p className="text-sm text-neutral-400">{item.partOfSpeech}</p>
      <p>{item.definition}</p>
      {item.examples && (
        <div className="flex flex-col mt-3">
          <p className="text-sm text-neutral-400 mb-0.5">Examples</p>
          <ul className="flex flex-col gap-1 text-neutral-500">
            {item.examples?.map((example, i) => (
              <li key={i}>
                <p className="text-sm">
                  {"-"} {example}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {item.synonyms && (
        <div className="flex flex-col mt-3">
          <p className="text-sm text-neutral-400 mb-2">Synonyms</p>
          <ul className="flex flex-wrap gap-2">
            {item.synonyms?.map((syn, i) => (
              <li className="px-1.5 bg-teal-700 text-sm rounded-sm" key={i}>
                <button onClick={() => handleSynAntButton(syn)}>{syn}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {item.antonyms && (
        <div className="flex flex-col mt-3">
          <p className="text-sm text-neutral-400 mb-2">Antonyms</p>
          <ul className="flex flex-wrap gap-2">
            {item.antonyms?.map((ant, i) => (
              <li className="px-1.5 bg-orange-700 text-sm rounded-sm" key={i}>
                <button onClick={() => handleSynAntButton(ant)}>{ant}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default DefinitionCard;
