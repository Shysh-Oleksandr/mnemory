import React from "react";
import { ITerm } from "./Term";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreactors } from "../../state";

type Props = { index: number; term: ITerm };

const TermHeader = ({ index, term }: Props) => {
  const dispatch = useDispatch();

  const { deleteTerm } = bindActionCreators(actionCreactors, dispatch);
  return (
    <div className="term-header flex items-center justify-between py-3 px-6 border-b-2 border-slate-800 border-solid">
      <h4 className="term-id">{index + 1}</h4>
      <button onClick={() => deleteTerm(term)} className="delete-btn text-xl">
        X
      </button>
    </div>
  );
};

export default TermHeader;
