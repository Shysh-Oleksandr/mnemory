import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import KeywordsList from "../components/set/KeywordsList";
import { getCurrentSet } from "../Helpers/functions";
import { actionCreactors, State } from "../state";
import "../styles/flashcards.css";

type Props = {};

const LearnFlashcardsPage = (props: Props) => {
  const [currentTermIndex, setCurrentTermIndex] = useState<number>(0);
  const [isCurrentSideFront, setIsCurrentSideFront] = useState<boolean>(true);
  const [showDefinition, setShowDefinition] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { copySavedSet, deleteSet } = bindActionCreators(
    actionCreactors,
    dispatch
  );
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const currentSet = getCurrentSet(mnemoryState);
  const savedSet = currentSet.savedSet;
  const currentTerm = savedSet.terms[currentTermIndex];
  const termsLength = savedSet.terms.length;

  const changeCurrentTerm = (newTermIndex: number) => {
    setCurrentTermIndex(newTermIndex);
    setIsCurrentSideFront(true);
    setShowDefinition(false);
  };

  return (
    <div className="learn-cards flex h-full mt-4 justify-between">
      <div className="learn-cards-info basis-1/6 mr-8">
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
            <h5>PROGRESS</h5>
            <span>
              {currentTermIndex + 1}/{termsLength}
            </span>
          </div>
          <div className="mt-80">
            <button className="btn block w-full mb-4">Shuffle</button>
            <button className="btn block w-full">Settings</button>
          </div>
        </div>
      </div>
      <div className="learn-cards-content basis-5/6 relative">
        <div className="cards absolute bottom-16 top-0 left-0 right-0">
          {currentTermIndex !== 0 && <div className="previous-card"></div>}
          <div
            className={`current-card card ${
              isCurrentSideFront ? "" : "flipped"
            } bg-slate-700 w-full h-full rounded-xl cursor-pointer`}
            onClick={() => setIsCurrentSideFront(!isCurrentSideFront)}
          >
            <div className="card-front flex items-center justify-center h-full p-8">
              <h3 className="text-5xl cursor-text">
                {savedSet.terms[currentTermIndex].term}
              </h3>
            </div>

            <div className="card-back overflow-y-auto flex flex-col">
              <div className="term-images justify-center flex p-4 grow items-start">
                <KeywordsList term={currentTerm} isBigSize={true} />
              </div>
              {showDefinition ? (
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
              )}
            </div>
          </div>
          {currentTermIndex !== termsLength && (
            <div className="next-card"></div>
          )}
        </div>
        <div className="navigation flex items-center justify-center absolute bottom-0 left-1/2 -translate-x-1/2">
          <button
            onClick={() =>
              currentTermIndex !== 0 && changeCurrentTerm(currentTermIndex - 1)
            }
            className="mx-4 text-xl rounded-full h-10 w-10 transition-colors hover:bg-slate-700 bg-slate-600"
          >{`<`}</button>
          <button className="mx-4 text-xl rounded-full h-10 w-10 transition-colors hover:bg-slate-700 bg-slate-600">{`<->`}</button>
          <button
            onClick={() => {
              currentTermIndex !== termsLength - 1 &&
                changeCurrentTerm(currentTermIndex + 1);
            }}
            className="mx-4 text-xl rounded-full h-10 w-10 transition-colors hover:bg-slate-700 bg-slate-600"
          >{`>`}</button>
        </div>
      </div>
    </div>
  );
};

export default LearnFlashcardsPage;
