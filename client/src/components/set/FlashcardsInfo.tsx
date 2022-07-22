import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { ISetStatus } from "../../interfaces/set";
import { ITerm } from "../../interfaces/term";
import { actionCreactors, State } from "../../state";
import ToggleBtn from "../UI/ToggleBtn";

type Props = {
  shuffleTerms: () => void;
  shuffledTerms: ITerm[];
  currentTermIndex: number;
  isFinished: boolean;
  currentSet: ISetStatus;
};

const FlashcardsInfo = ({
  shuffleTerms,
  shuffledTerms,
  currentTermIndex,
  isFinished,
  currentSet,
}: Props) => {
  const termsLength = shuffledTerms.length;
  const learnState = useSelector((state: State) => state.learn);
  const dispatch = useDispatch();
  const { setIsStartSideFront, setShowDefinition } = bindActionCreators(
    actionCreactors,
    dispatch
  );
  return (
    <div className="learn-cards-info basis-1/5 md:mr-16 mr-2 flex flex-col justify-between">
      <div>
        <div className="md:block flex justify-between items-center">
          <Link
            to={`/set/${currentSet.savedSet.setId + 1}`}
            className="md:text-2xl back-btn text-xl sm:mr-0 mr-2 md:mb-8 block"
          >
            <span className="mr-3 text-teal-400 inline-block relative top-1 transition-colors">
              <BsArrowLeft />
            </span>
            Back to the set
          </Link>
          <div className="basis-4/6 md:block flex items-center">
            <div className="learn-cards-progress-bar h-4 w-full bg-teal-800 mr-3 md:mr-0">
              <div
                style={{
                  width: `${(100 / termsLength) * (currentTermIndex + 1)}%`,
                }}
                className="transition-all bg-teal-400 h-full"
              ></div>
            </div>
            <div className="flex justify-between items-center text-xl mt-1">
              {isFinished ? (
                <h4 className="md:inline hidden">Completed</h4>
              ) : (
                <>
                  <h5 className="md:inline hidden">PROGRESS</h5>
                  <span>
                    {currentTermIndex + 1}/{termsLength}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {!isFinished && (
        <div className="mt-4">
          <button
            onClick={shuffleTerms}
            className="btn block w-full md:mb-4 mb-2 md:static absolute sm:bottom-[70px] bottom-[140px] left-0 z-10"
          >
            Shuffle
          </button>
          <div className="md:block flex w-full justify-between items-center sm:flex-row flex-col md:static absolute sm:bottom-0 bottom-0 left-0 z-10">
            <div className="md:block flex items-center">
              <h4 className="text-xl">Start card side:</h4>
              <ToggleBtn
                onChange={setIsStartSideFront}
                defaultChecked={learnState.isStartSideFront}
                firstIcon="Front"
                secondIcon="Back"
                id={`startSideFrontCheckbox`}
              />
            </div>
            <div className="md:block flex items-center">
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
      )}
    </div>
  );
};

export default FlashcardsInfo;
