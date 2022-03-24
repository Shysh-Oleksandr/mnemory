import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreactors, State } from "../state";
import SetTermsList from "./../components/set/SetTermsList";
import { getCurrentSet } from "./../Helpers/functions";

type Props = {};

const SetPage = (props: Props) => {
  const dispatch = useDispatch();
  const { copySavedSet, deleteSet } = bindActionCreators(
    actionCreactors,
    dispatch
  );
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const navigate = useNavigate();
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
          className="btn block sm:!py-4 !py-3 text-center font-bold !bg-green-600 hover:!bg-green-700 sm:my-8 my-4 !text-slate-800"
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
      <div className="mt-6 flex items-center">
        <Link
          onClick={copySavedSet}
          to={`/set/${savedSet.setId + 1}/edit`}
          className="btn block sm:!py-4 !py-3 text-center lg:basis-9/12 sm:basis-8/12 basis-7/12 sm:shrink-0 font-bold mr-4"
        >
          Edit set
        </Link>
        <button
          className="btn block lg:basis-3/12 sm:basis-4/12 basis-5/12 whitespace-nowrap !text-white sm:!py-4 !py-3 font-bold !bg-red-800 hover:!bg-red-900"
          onClick={() => {
            deleteSet(savedSet.setId);
            navigate("/");
          }}
        >
          Delete set
        </button>
      </div>
    </div>
  );
};

export default SetPage;
