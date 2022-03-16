import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreactors, State } from "../../state";

type Props = {
  buttonText: string;
};

const SaveBtn = ({ buttonText }: Props) => {
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const dispatch = useDispatch();
  const { saveCurrentSet } = bindActionCreators(actionCreactors, dispatch);
  return (
    <button
      onClick={saveCurrentSet}
      className="btn ml-auto block mt-2 !px-24 !py-4"
    >
      <Link to={`/set/${mnemoryState.currentSetId}`}>{buttonText}</Link>
    </button>
  );
};

export default SaveBtn;
