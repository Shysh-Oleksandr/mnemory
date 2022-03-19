import React, { useEffect, useRef } from "react";
import { Action } from "../../state/Actions";
import { bindActionCreators, Dispatch } from "redux";
import { actionCreactors, State } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isSetChanged } from "../../state/Reducers/MnemoryReducer";

type Props = {
  setShowConfirmModal: (
    showConfrimModal: boolean,
    onClick: React.MouseEventHandler<any> | undefined,
    to: string
  ) => (dispatch: Dispatch<Action>) => void;
  onClick: React.MouseEventHandler<any> | undefined;
  to: string;
};

const ConfirmModal = ({ setShowConfirmModal, onClick, to }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mnemoryState = useSelector((state: State) => state.mnemory);

  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  const { saveCurrentSet, deleteSet } = bindActionCreators(
    actionCreactors,
    dispatch
  );

  const isSetNameBlank =
    mnemoryState.sets[mnemoryState.currentSetId].editingSet.name === "";

  useEffect(() => {
    document.documentElement.classList.add("stop-scrolling");

    const checkIfClickedOutside = (e: any) => {
      if (
        mnemoryState.showConfirmModal &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        setShowConfirmModal(false, undefined, "/");
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.documentElement.classList.remove("stop-scrolling");
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [mnemoryState.showConfirmModal]);

  return (
    <div className="fixed z-50 h-full w-full top-0 flex justify-center items-center">
      <div
        className="bg-slate-800 rounded-xl p-10 pt-6 basis-2/5 modal fixed block"
        ref={ref}
      >
        <h2 className="lg:text-[1.7rem] leading-8 text-center py-1">
          Do you want to save the changes?
        </h2>
        <h3 className="mb-8 lg:text-[1.3rem] leading-8 text-center">
          Information you changed is not saved.
        </h3>
        <div className="flex justify-center items-center">
          <button
            className="block btn mx-2 !px-10"
            onClick={(e) => {
              if (
                isSetNameBlank &&
                mnemoryState.sets[mnemoryState.currentSetId].savedSet.name ===
                  ""
              ) {
                console.log("del");

                deleteSet(mnemoryState.currentSetId);
              }

              setShowConfirmModal(false, onClick, to);
              navigate(to);
              if (onClick) onClick(e);
            }}
          >
            Don't save
          </button>
          <button
            className="block btn mx-2 !px-10 !text-white !bg-slate-900 hover:!bg-black"
            onClick={(e) => {
              if (isSetNameBlank) {
                console.log("del");

                deleteSet(mnemoryState.currentSetId);
              } else {
                saveCurrentSet();
                console.log("d agter");
              }

              setShowConfirmModal(false, onClick, to);
              navigate(to);
              if (onClick) onClick(e);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
