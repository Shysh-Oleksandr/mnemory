import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreactors, State } from "../state";
import { ISetStatus } from "../state/Reducers/MnemoryReducer";
import { getEmptySet, isSetChanged } from "./../Helpers/functions";

type Props = {};

const Navbar = (props: Props) => {
  const mnemoryState = useSelector((state: State) => state.mnemory);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addSet, setShowConfirmModal, deleteSet } = bindActionCreators(
    actionCreactors,
    dispatch
  );
  const isCreateOrEditPage =
    window.location.pathname.startsWith("/create") ||
    window.location.pathname.endsWith("/edit");

  const emptySet: ISetStatus = getEmptySet(mnemoryState);

  return (
    <div className="div-padding static w-full bg-slate-800 border-b-[1px] border-solid h-16 border-slate-700 flex items-center justify-between">
      <nav className="flex items-end">
        <button
          onClick={() => {
            if (isCreateOrEditPage && isSetChanged(mnemoryState, deleteSet)) {
              setShowConfirmModal(true, undefined, "/");
            } else {
              navigate("/");
            }
          }}
          className="md:text-4xl text-3xl block text-white py-4 font-bold mr-6"
        >
          Mnemory
        </button>
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
