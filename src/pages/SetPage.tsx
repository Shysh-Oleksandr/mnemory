import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreactors, State } from "../state";
import { getCurrentSet } from "./../Helpers/functions";
import SetTermsList from "./../components/set/SetTermsList";

type Props = {};

const SetPage = (props: Props) => {
  const dispatch = useDispatch();
  const { deleteSet } = bindActionCreators(actionCreactors, dispatch);
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const navigate = useNavigate();
  const currentSet = getCurrentSet(mnemoryState);
  const savedSet = currentSet.savedSet;

  let { setid } = useParams();
  return (
    <div className="set-page">
      <div className="set-info py-4">
        <h2 className="text-4xl font-bold py-1">{savedSet.name}</h2>
        <h3 className="text-2xl">{savedSet.description}</h3>
      </div>
      <div className="set-terms-list">
        <div className="flex justify-between items-center">
          <h4 className="text-2xl mb-4">
            Terms in set ({savedSet.terms.length})
          </h4>
        </div>
        <SetTermsList set={savedSet} />
      </div>
      <div>
        {/* <button
          className="text-3xl"
          onClick={() => {
            deleteSet(mnemoryState.currentSetId);
            navigate("/");
          }}
        >
          Delete this set
        </button> */}
      </div>
    </div>
  );
};

export default SetPage;
