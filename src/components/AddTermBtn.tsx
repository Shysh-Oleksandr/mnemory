import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { getCurrentSet } from "../Helpers/functions";
import { actionCreactors, State } from "../state";
import { ISetStatus } from "../state/Reducers/MnemoryReducer";
import { CgClose } from "react-icons/cg";

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
      className="add-term-btn items-center w-full bg-slate-700 md:py-8 py-6 mb-4 shadow-lg text-slate-100 rounded-lg"
    >
      <div className="relative text-center">
        <h4 className="absolute left-6 top-1/2 -translate-y-1/2 font-bold md:text-2xl text-xl text-black">
          {newTermIndex + 1}
        </h4>
        <h3 className="add-term-text md:text-2xl text-xl inline-block pb-2 font-bold tracking-wide border-solid border-b-4 transition-all border-orange-400">
          <span className="rotate-45 inline-block relative top-1">
            <CgClose />
          </span>
          <span> Add a new card</span>
        </h3>
      </div>
    </button>
  );
};

export default AddTermBtn;
