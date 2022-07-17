import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import SetButtons from "../components/set/SetButtons";
import { useCurrentSetState } from "../hooks";
import { actionCreactors } from "../state";
import SetTermsList from "./../components/set/SetTermsList";
import { initialSetsId } from "./../data/initialSets";

type Props = {};

const SetPage = (props: Props) => {
  const dispatch = useDispatch();
  const { copySavedSet } = bindActionCreators(actionCreactors, dispatch);
  const currentSet = useCurrentSetState();
  const isInitialSet = initialSetsId.includes(currentSet.savedSet.setId);

  return (
    <div className="set-page div-padding pb-6">
      <div className="set-info text-left sm:py-4 py-2">
        <h2 className="sm:text-4xl text-3xl font-bold py-1">
          {currentSet.savedSet.name}
        </h2>
        <h3 className="sm:text-2xl text-xl">
          {currentSet.savedSet.description}
        </h3>
      </div>
      <div>
        <Link
          onClick={copySavedSet}
          to={`/set/${currentSet.savedSet.setId + 1}/learn/flashcards`}
          className="btn block sm:!py-4 !py-3 text-center font-bold !bg-[#299DAA] hover:!bg-[#20A6B4] sm:my-8 my-4 !text-slate-800"
        >
          Learn flashcards
        </Link>
      </div>
      <div className="set-terms-list">
        <div className="flex justify-between items-center">
          <h4 className="text-2xl sm:mb-4 mb-3">
            Terms in set ({currentSet.savedSet.terms.length})
          </h4>
        </div>
        <SetTermsList set={currentSet.savedSet} />
      </div>
      {!isInitialSet && <SetButtons currentSet={currentSet} />}
    </div>
  );
};

export default SetPage;
