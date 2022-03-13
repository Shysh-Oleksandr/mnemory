import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreactors, State } from "../state";

const AddTermBtn = () => {
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const dispatch = useDispatch();

  const { addTerm } = bindActionCreators(actionCreactors, dispatch);

  const emptyTerm = {
    term: "",
    descriptionKeywords: [{ keyword: "", id: 0 }],
    id: mnemoryState.terms.length,
  };

  return (
    <button
      onClick={() => addTerm(emptyTerm, mnemoryState.terms.length)}
      className="add-term-btn items-center w-full bg-slate-700 py-8 mb-4 shadow-lg text-slate-100 rounded-lg"
    >
      <div className="relative text-center">
        <h4 className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-2xl text-black">
          {mnemoryState.terms.length + 1}
        </h4>
        <h3 className="add-term-text text-2xl inline-block pb-2 font-bold tracking-wide border-solid border-b-4 transition-all border-orange-400">
          + Add a new card
        </h3>
      </div>
    </button>
  );
};

export default AddTermBtn;
