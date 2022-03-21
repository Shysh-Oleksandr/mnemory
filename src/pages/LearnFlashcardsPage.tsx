import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getCurrentSet } from "../Helpers/functions";
import { actionCreactors, State } from "../state";

type Props = {};

enum CardSides {
  FRONT = "front",
  BACK = "back",
}

const LearnFlashcardsPage = (props: Props) => {
  const [currentTerm, setCurrentTerm] = useState<number>(0);
  const [currentCardSide, setCurrentCardSide] = useState<string>(
    CardSides.FRONT
  );
  const dispatch = useDispatch();
  const { copySavedSet, deleteSet } = bindActionCreators(
    actionCreactors,
    dispatch
  );
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const currentSet = getCurrentSet(mnemoryState);
  const savedSet = currentSet.savedSet;
  const termsLength = savedSet.terms.length;
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
              style={{ width: `${(100 / termsLength) * (currentTerm + 1)}%` }}
              className="transition-all  bg-teal-400 h-full"
            ></div>
          </div>
          <div className="flex justify-between items-center text-xl mt-1">
            <h5>PROGRESS</h5>
            <span>
              {currentTerm + 1}/{termsLength}
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
          {currentTerm !== 0 && <div className="previous-card"></div>}
          <div className="current-card bg-slate-700 w-full h-full rounded-xl cursor-pointer">
            {currentCardSide === CardSides.FRONT ? (
              <div className="card-front flex items-center justify-center h-full">
                <h3 className="text-5xl cursor-text">
                  {savedSet.terms[currentTerm].term}
                </h3>
              </div>
            ) : (
              <div className="card-back"></div>
            )}
          </div>
          {currentTerm !== termsLength && <div className="next-card"></div>}
        </div>
        <div className="navigation flex items-center justify-center absolute bottom-0 left-1/2 -translate-x-1/2">
          <button
            onClick={() => currentTerm !== 0 && setCurrentTerm(currentTerm - 1)}
            className="mx-4 text-xl rounded-full h-10 w-10 transition-colors hover:bg-slate-700 bg-slate-600"
          >{`<`}</button>
          <button className="mx-4 text-xl rounded-full h-10 w-10 transition-colors hover:bg-slate-700 bg-slate-600">{`<->`}</button>
          <button
            onClick={() =>
              currentTerm !== termsLength - 1 && setCurrentTerm(currentTerm + 1)
            }
            className="mx-4 text-xl rounded-full h-10 w-10 transition-colors hover:bg-slate-700 bg-slate-600"
          >{`>`}</button>
        </div>
      </div>
    </div>
  );
};

export default LearnFlashcardsPage;
