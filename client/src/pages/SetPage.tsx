import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import SetButtons from "../components/set/SetButtons";
import { actionCreactors, State } from "../state";
import SetTermsList from "./../components/set/SetTermsList";
import { getCurrentSet } from "./../Helpers/functions";

type Props = {};

const SetPage = (props: Props) => {
  const dispatch = useDispatch();
  const { copySavedSet } = bindActionCreators(actionCreactors, dispatch);
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const currentSet = getCurrentSet(mnemoryState);
  const savedSet = currentSet.savedSet;

  return (
    <div className="set-page div-padding pb-6">
      <div className="set-info sm:py-4 py-2">
        <h2 className="sm:text-4xl text-3xl font-bold py-1">{savedSet.name}</h2>
        <h3 className="sm:text-2xl text-xl">{savedSet.description}</h3>
      </div>
      <div>
        <Link
          onClick={copySavedSet}
          to={`/set/${savedSet.setId + 1}/learn/flashcards`}
          className="btn block sm:!py-4 !py-3 text-center font-bold !bg-[#299DAA] hover:!bg-[#20A6B4] sm:my-8 my-4 !text-slate-800"
        >
          Learn flashcards
        </Link>
      </div>
      <div className="set-terms-list">
        <div className="flex justify-between items-center">
          <h4 className="text-2xl sm:mb-4 mb-3">
            Terms in set ({savedSet.terms.length})
          </h4>
        </div>
        <SetTermsList set={savedSet} />
      </div>
      {savedSet.setId !== 0 && <SetButtons currentSet={currentSet} />}
    </div>
  );
};

export default SetPage;
