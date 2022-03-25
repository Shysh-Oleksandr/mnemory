import React from "react";
import { CgArrowsExchange } from "react-icons/cg";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

type Props = {
  currentTermIndex: number;
  changeCurrentTerm: (newTermIndex: number) => void;
  setIsStartSideFront: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCurrentSideFront: React.Dispatch<React.SetStateAction<boolean>>;
  isStartSideFront: boolean;
  setIsFinished: React.Dispatch<React.SetStateAction<boolean>>;
  termsLength: number;
};

const FlashcardsNavigation = ({
  currentTermIndex,
  changeCurrentTerm,
  setIsStartSideFront,
  setIsCurrentSideFront,
  isStartSideFront,
  setIsFinished,
  termsLength,
}: Props) => {
  return (
    <div className="navigation flex items-center justify-center absolute md:bottom-4 bottom-6 left-1/2 -translate-x-1/2">
      <button
        onClick={() =>
          currentTermIndex !== 0 && changeCurrentTerm(currentTermIndex - 1)
        }
        className="navigation-btn"
      >
        <AiOutlineArrowLeft />
      </button>
      <button
        onClick={() => {
          setIsStartSideFront(!isStartSideFront);
          setIsCurrentSideFront(!isStartSideFront);
        }}
        className="navigation-btn !text-2xl"
      >
        <CgArrowsExchange />
      </button>
      <button
        onClick={() => {
          currentTermIndex !== termsLength - 1
            ? changeCurrentTerm(currentTermIndex + 1)
            : setIsFinished(true);
        }}
        className="navigation-btn"
      >
        <AiOutlineArrowRight />
      </button>
    </div>
  );
};

export default FlashcardsNavigation;
