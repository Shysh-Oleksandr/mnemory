import React from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreactors } from "../../state";

type Props = {
  buttonText: string;
};

const SaveBtn = ({ buttonText }: Props) => {
  const dispatch = useDispatch();

  const { saveCurrentSet } = bindActionCreators(actionCreactors, dispatch);
  return (
    <button
      onClick={saveCurrentSet}
      className="btn ml-auto block mt-2 !px-24 !py-4"
    >
      {buttonText}
    </button>
  );
};

export default SaveBtn;
