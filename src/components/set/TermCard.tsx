import React from "react";
import { ITerm } from "../termCard/Term";
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
  return (
    <div
      className={`current-card card ${
        isCurrentSideFront ? "" : "flipped"
      } bg-slate-700 sm:w-full w-[90%] mx-auto h-full rounded-xl cursor-pointer`}
      onClick={() => {
        setIsCurrentSideFront(!isCurrentSideFront);
      }}
    >
      <div className="card-front border-b-[5px] rounded-xl border-solid border-slate-500 flex items-center justify-center h-full p-8">
        <h3 className="md:text-5xl sm:text-4xl text-3xl text-center cursor-text">
          {currentTerm.term}
        </h3>
      </div>

      <div className="card-back overflow-y-auto flex flex-col">
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
