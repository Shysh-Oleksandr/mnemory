import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { ISetStatus } from "../../interfaces/set";
import { actionCreactors } from "../../state";

type Props = {
  currentSet: ISetStatus;
};

const SetButtons = ({ currentSet }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { copySavedSet, deleteSet } = bindActionCreators(
    actionCreactors,
    dispatch
  );

  return (
    <div className="mt-6 flex items-center justify-end">
      {!currentSet.isCategorySet && (
        <Link
          onClick={copySavedSet}
          to={`/set/${currentSet.savedSet.setId + 1}/edit`}
          className="btn sm:!px-4 !px-2 block sm:!py-4 !py-3 text-center lg:basis-9/12 sm:basis-8/12 basis-7/12 sm:shrink-0 font-bold mr-4"
        >
          <span className="inline-block relative top-1">
            <MdEdit />
          </span>{" "}
          Edit set
        </Link>
      )}
      <button
        className="btn sm:!px-4 !px-2 block lg:basis-3/12 sm:basis-4/12 basis-5/12 whitespace-nowrap !text-white sm:!py-4 !py-3 font-bold !bg-red-800 hover:!bg-red-900"
        onClick={() => {
          deleteSet(currentSet.savedSet.setId);
          navigate("/");
        }}
      >
        <span className="inline-block relative top-1">
          <MdDelete />
        </span>{" "}
        Delete set
      </button>
    </div>
  );
};

export default SetButtons;
