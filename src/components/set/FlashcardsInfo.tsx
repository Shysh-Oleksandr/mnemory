import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentSet } from "../../Helpers/functions";
import { State } from "../../state";
import { ITerm } from "../termCard/Term";

type Props = {
  shuffleTerms: () => void;
  shuffledTerms: ITerm[];
  currentTermIndex: number;
  isFinished: boolean;
};

const FlashcardsInfo = ({
  shuffleTerms,
  shuffledTerms,
  currentTermIndex,
  isFinished,
}: Props) => {
  const termsLength = shuffledTerms.length;
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const currentSet = getCurrentSet(mnemoryState);
  const savedSet = currentSet.savedSet;
  return (
    <div className="learn-cards-info basis-1/5 mr-16">
      <Link to={`/set/${savedSet.setId + 1}`} className="text-xl">
        <span className="text-teal-400 mr-2">{`<`}</span>
        Back to the set
      </Link>
      <h4 className="text-xl tracking-widest my-8">
        <span className="mr-2 text-teal-400">ICON</span> Flashcards
      </h4>
      <div>
        <div className="learn-cards-progress-bar h-4 w-full bg-teal-800">
          <div
            style={{
              width: `${(100 / termsLength) * (currentTermIndex + 1)}%`,
            }}
            className="transition-all  bg-teal-400 h-full"
          ></div>
        </div>
        <div className="flex justify-between items-center text-xl mt-1">
          {isFinished ? (
            <h4>Completed</h4>
          ) : (
            <>
              <h5>PROGRESS</h5>
              <span>
                {currentTermIndex + 1}/{termsLength}
              </span>
            </>
          )}
        </div>
        <div className="mt-80">
          <button onClick={shuffleTerms} className="btn block w-full mb-4">
            Shuffle
          </button>
          <button className="btn block w-full">Settings</button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsInfo;
