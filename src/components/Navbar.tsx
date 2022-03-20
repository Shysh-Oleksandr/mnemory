import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreactors, State } from "../state";
import { ISetStatus } from "../state/Reducers/MnemoryReducer";
import { ITerm } from "./termCard/Term";
import { isSetChanged } from "./../Helpers/functions";

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
  const navigate = useNavigate();
  const { addSet, copySavedSet, setShowConfirmModal, deleteSet } =
    bindActionCreators(actionCreactors, dispatch);

  const emptySet: ISetStatus = {
    savedSet: {
      name: "",
      terms: emptyTerms,
      setId: mnemoryState.sets.length,
    },
    editingSet: {
      name: "",
      terms: emptyTerms,
      setId: mnemoryState.sets.length,
    },
  };

  const isCreateOrEditPage =
    window.location.pathname.startsWith("/create") ||
    window.location.pathname.endsWith("/edit");

  return (
    <div className="div-padding static w-full bg-slate-800 border-b-[1px] border-solid h-16 border-slate-700 flex items-center justify-between">
      <nav className="flex items-end">
        <button
          onClick={() => {
            console.log(isSetChanged(mnemoryState, deleteSet));

            if (isCreateOrEditPage && isSetChanged(mnemoryState, deleteSet)) {
              setShowConfirmModal(true, undefined, "/");
            } else {
              navigate("/");
            }
          }}
          className="text-4xl block text-white py-4 font-bold mr-6"
        >
          Mnemory
        </button>
        <Link
          onClick={copySavedSet}
          to={`/set/${mnemoryState.currentSetId + 1}/edit`}
          className="text-2xl block text-white py-4 font-bold mr-6"
        >
          Edit
        </Link>
      </nav>
      <button
        onClick={() => {
          if (isCreateOrEditPage && isSetChanged(mnemoryState, deleteSet)) {
            setShowConfirmModal(
              true,
              () => addSet(emptySet),
              `/create/${mnemoryState.sets.length + 1}`
            );
          } else {
            addSet(emptySet);
            navigate(`/create/${mnemoryState.sets.length + 1}`);
          }
        }}
        className="btn"
      >
        Create set
      </button>
    </div>
  );
};

export default Navbar;
