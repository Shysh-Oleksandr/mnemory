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
      type="submit"
      form={`set-form-${mnemoryState.currentSetId + 1}`}
      onClick={saveCurrentSet}
      className="btn ml-auto block mt-2 md:!px-24 !px-20 md:!py-4 !py-3"
    >
      {buttonText}
    </button>
  );
};

export default SaveBtn;
