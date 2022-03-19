import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreactors, State } from "../state";

type Props = {};

const SetPage = (props: Props) => {
  const dispatch = useDispatch();
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const navigate = useNavigate();

  const { deleteSet } = bindActionCreators(actionCreactors, dispatch);
  let { setid } = useParams();
  return (
    <div>
      Set {setid}{" "}
      <div>
        <button
          className="text-3xl"
          onClick={() => {
            deleteSet(mnemoryState.currentSetId);
            navigate("/");
          }}
        >
          Delete this set
        </button>
      </div>
    </div>
  );
};

export default SetPage;
