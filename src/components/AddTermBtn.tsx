import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { getCurrentSet } from "../Helpers/functions";
import { actionCreactors, State } from "../state";
import { ISetStatus } from "../state/Reducers/MnemoryReducer";

const AddTermBtn = () => {
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const dispatch = useDispatch();

  const { addTerm } = bindActionCreators(actionCreactors, dispatch);
  const currentSet: ISetStatus = getCurrentSet(mnemoryState);
  const newTermIndex = currentSet.editingSet.terms.length;

  const emptyTerm = {
    term: "",
    definition: "",
    descriptionKeywords: [{ keyword: "", id: 0, imageChecked: false }],
    id: newTermIndex,
  };

  return (
    <button
      onClick={() => addTerm(emptyTerm, newTermIndex)}
      className="add-term-btn items-center w-full bg-slate-700 py-8 mb-4 shadow-lg text-slate-100 rounded-lg"
    >
      <div className="relative text-center">
        <h4 className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-2xl text-black">
          {newTermIndex + 1}
        </h4>
        <h3 className="add-term-text text-2xl inline-block pb-2 font-bold tracking-wide border-solid border-b-4 transition-all border-orange-400">
          + Add a new card
        </h3>
      </div>
    </button>
  );
};

export default AddTermBtn;
