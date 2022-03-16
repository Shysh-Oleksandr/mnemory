import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreactors, State } from "../state";
import { ISetStatus } from "../state/Reducers/MnemoryReducer";
import { ITerm } from "./termCard/Term";

type Props = {};

const Navbar = (props: Props) => {
  const mnemoryState = useSelector((state: State) => state.mnemory);

  const emptyTerms: ITerm[] = new Array(4).fill(0).map((term, index) => {
    return {
      term: "",
      descriptionKeywords: [{ keyword: "", id: 0, imageChecked: false }],
      id: index,
    };
  });
  const dispatch = useDispatch();

  const { addSet } = bindActionCreators(actionCreactors, dispatch);
  const emptySet: ISetStatus = {
    savedSet: {
      name: "",
      terms: [],
      setId: mnemoryState.sets.length,
    },
    editingSet: {
      name: "",
      terms: emptyTerms,
      setId: mnemoryState.sets.length,
    },
  };
  return (
    <div className="div-padding z-50 fixed top-0 left-0 w-full bg-slate-800 border-b-[1px] border-solid h-16 border-slate-700 flex items-center justify-between">
      <nav className="flex items-end">
        <Link to="/" className="text-4xl block text-white py-4 font-bold mr-6">
          Mnemory
        </Link>
        <Link
          to="/edit"
          className="text-2xl block text-white py-4 font-bold mr-6"
        >
          Edit
        </Link>
      </nav>
      <Link to="/create" className="btn" onClick={() => addSet(emptySet)}>
        Create set
      </Link>
    </div>
  );
};

export default Navbar;
