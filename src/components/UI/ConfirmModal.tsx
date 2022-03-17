import React from "react";
import { Action } from "../../state/Actions";
import { bindActionCreators, Dispatch } from "redux";
import { actionCreactors } from "../../state";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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

  const { saveCurrentSet } = bindActionCreators(actionCreactors, dispatch);
  return (
    <div className="absolute z-100 h-full w-full top-0 bg-opacity-60 bg-black flex justify-center items-center">
      <div className="bg-slate-800 rounded-xl p-10 pt-6 basis-2/5">
        <h2 className="lg:text-[1.7rem] leading-8 text-center py-1">
          Do you want to save the changes?
        </h2>
        <h3 className="mb-8 lg:text-[1.3rem] leading-8 text-center">
          Information you changed are not saved.
        </h3>
        <div className="flex justify-center items-center">
          <button
            className="block btn mx-2 !px-10"
            onClick={() => {
              setShowConfirmModal(false, onClick, to);
              navigate(to);
            }}
          >
            Don't save
          </button>
          <button
            className="block btn mx-2 !px-10 !text-white !bg-slate-900 hover:!bg-black"
            onClick={(e) => {
              saveCurrentSet();
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
