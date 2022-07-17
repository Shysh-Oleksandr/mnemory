import React from "react";
import { BsPlusLg } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { useCurrentSetState } from "../hooks";
import { ISetStatus } from "../interfaces/set";
import { actionCreactors, State } from "../state";
import { logout } from "../state/Action-creators";
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
    window.location.pathname.includes("/create") ||
    window.location.pathname.includes("/edit");
  const currentSet = useCurrentSetState();

  const emptySet: ISetStatus = getEmptySet();

  const Logout = () => {
    dispatch(logout());
  };

  return (
    <div className="div-padding static w-full bg-slate-800 border-b-[1px] border-solid h-16 border-slate-700 flex items-center justify-between">
      <nav className="flex items-end">
        <button
          onClick={() => {
            if (isCreateOrEditPage && isSetChanged(deleteSet, currentSet)) {
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
      <div className="fl">
        <button
          onClick={() => {
            if (isCreateOrEditPage && isSetChanged(deleteSet, currentSet)) {
              setShowConfirmModal(
                true,
                () => addSet(emptySet),
                `/create/${emptySet.savedSet.setId}`
              );
            } else {
              addSet(emptySet);
              navigate(`/create/${emptySet.savedSet.setId}`);
            }
          }}
          className="btn sm:!px-8 !px-2 mr-4 fl"
        >
          Create set
          <span>
            <BsPlusLg className="text-2xl plus ml-2 text-inherit cursor-pointer transition-all duration-500" />
          </span>
        </button>
        <button
          onClick={() => Logout()}
          className="btn !bg-orange-600 hover:!bg-orange-700 !text-white fl"
        >
          Logout
          <span>
            <MdLogout className="text-2xl ml-2 text-inherit cursor-pointer transition-all duration-500" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
