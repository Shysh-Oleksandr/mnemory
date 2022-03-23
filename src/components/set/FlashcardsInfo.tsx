import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentSet } from "../../Helpers/functions";
import { actionCreactors, State } from "../../state";
import { ITerm } from "../termCard/Term";
import { bindActionCreators } from "redux";
import ToggleBtn from "../UI/ToggleBtn";

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
  const learnState = useSelector((state: State) => state.learn);
  const currentSet = getCurrentSet(mnemoryState);
  const savedSet = currentSet.savedSet;
  const dispatch = useDispatch();
  const { setIsStartSideFront, setShowDefinition } = bindActionCreators(
    actionCreactors,
    dispatch
  );
  return (
    <div className="learn-cards-info basis-1/5 mr-16 flex flex-col justify-between">
      <div>
        <Link to={`/set/${savedSet.setId + 1}`} className="text-xl">
          <span className="text-teal-400 mr-2">{`<`}</span>
          Back to the set
        </Link>
        <h4 className="text-xl tracking-widest my-8">
          <span className="mr-2 text-teal-400">ICON</span> Flashcards
        </h4>

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
      </div>
      <div className="mt-4">
        <button onClick={shuffleTerms} className="btn block w-full mb-4">
          Shuffle
        </button>
        <div>
          <div>
            <h4 className="text-xl">Start card side:</h4>
            <ToggleBtn
              onChange={setIsStartSideFront}
              defaultChecked={learnState.isStartSideFront}
              firstIcon="Front"
              secondIcon="Back"
              id={`startSideFrontCheckbox`}
            />
          </div>
          <div>
            <h4 className="text-xl">Show definition at start:</h4>
            <ToggleBtn
              onChange={setShowDefinition}
              defaultChecked={learnState.showDefinition}
              firstIcon="Yes"
              secondIcon="No"
              id={`showDefinitionCheckbox`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsInfo;
