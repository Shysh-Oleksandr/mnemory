import React from "react";
import { ITerm } from "../../interfaces/term";
import KeywordsList from "./KeywordsList";

type Props = {
  isCurrentSideFront: boolean;
  setIsCurrentSideFront: React.Dispatch<React.SetStateAction<boolean>>;
  currentTerm: ITerm;
  setShowDefinition: React.Dispatch<React.SetStateAction<boolean>>;
  showDefinition: boolean;
};

const TermCard = ({
  currentTerm,
  setIsCurrentSideFront,
  isCurrentSideFront,
  showDefinition,
  setShowDefinition,
}: Props) => {
  const getTermCategories = () => {
    return (
      currentTerm.categories && (
        <ul className="categories-form absolute sm:top-3 top-[4px] scale-110 flex-wrap left-1/2 -translate-x-1/2 z-20 flex justify-center w-[90.85%] items-center border-b-2 border-slate-500 border-solid pb-3">
          {currentTerm.categories.length > 0 ? (
            currentTerm.categories.map((category) => {
              return (
                <li
                  key={`${currentTerm.id}-${category.savedSet.setId}-category`}
                  className="bg-teal-500 rounded-2xl lg:text-lg xl:px-4 lg:px-3 px-2 xl:py-[3px] sm:mb-0 mt-1 sm:py[2px] py-[1px] xl:mr-3 mr-2"
                >
                  {category.savedSet.name}
                </li>
              );
            })
          ) : (
            <h4 className="text-xl">No categories</h4>
          )}
        </ul>
      )
    );
  };

  return (
    <div
      className={`current-card card ${
        isCurrentSideFront ? "" : "flipped"
      } bg-slate-700 sm:w-full w-[90%] mx-auto h-full rounded-xl cursor-pointer`}
      onClick={() => {
        setIsCurrentSideFront(!isCurrentSideFront);
      }}
    >
      <div className="card-front border-b-[5px] rounded-xl border-solid border-slate-500 flex items-center justify-center h-full pt-12 p-8">
        {getTermCategories()}
        <h3 className="md:text-5xl sm:text-4xl text-3xl text-center cursor-text">
          {currentTerm.term}
        </h3>
      </div>

      <div className="card-back overflow-y-auto flex flex-col pt-12">
        {getTermCategories()}
        <div className="term-images justify-center flex p-4 grow items-start">
          <KeywordsList term={currentTerm} isBigSize={true} />
        </div>
        {currentTerm.definition &&
          (showDefinition ? (
            <h4 className="w-full px-8 py-3 text-center bg-slate-900 rounded-b-xl text-2xl">
              {currentTerm.definition}
            </h4>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDefinition(true);
              }}
              className="btn w-full !rounded-xl !rounded-t-none !py-3"
            >
              Show definition
            </button>
          ))}
      </div>
    </div>
  );
};

export default TermCard;
