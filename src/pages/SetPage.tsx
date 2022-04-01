import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreactors, State } from "../state";
import SetTermsList from "./../components/set/SetTermsList";
import { getCurrentSet } from "./../Helpers/functions";
import { MdDelete, MdEdit } from "react-icons/md";
import SetButtons from "../components/set/SetButtons";

type Props = {};

const SetPage = (props: Props) => {
  const dispatch = useDispatch();
  const { copySavedSet } = bindActionCreators(actionCreactors, dispatch);
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const currentSet = getCurrentSet(mnemoryState);
  const savedSet = currentSet.savedSet;

  return (
    <div className="set-page">
      <div className="set-info sm:py-4 py-2">
        <h2 className="sm:text-4xl text-3xl font-bold py-1">{savedSet.name}</h2>
        <h3 className="sm:text-2xl text-xl">{savedSet.description}</h3>
      </div>
      <div>
        <Link
          onClick={copySavedSet}
          to={`/set/${savedSet.setId + 1}/learn/flashcards`}
          className="btn block sm:!py-4 !py-3 text-center font-bold !bg-green-600 hover:!bg-green-500 sm:my-8 my-4 !text-slate-800"
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
