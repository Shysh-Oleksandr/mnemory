import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import SetForm from "../components/set/SetForm";
import SaveBtn from "../components/UI/SaveBtn";
import { actionCreactors, State } from "../state";
import AddTermBtn from "./../components/AddTermBtn";
import TermsList from "./../components/TermsList";

type Props = {};

const EditPage = (props: Props) => {
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const dispatch = useDispatch();
  const { setShowConfirmModal } = bindActionCreators(actionCreactors, dispatch);
  return (
    <div>
      <SetForm
        buttonText="Save"
        titleContent={
          <button
            type="button"
            onClick={() =>
              setShowConfirmModal(
                true,
                undefined,
                `/set/${mnemoryState.currentSetId}`
              )
            }
            className="text-xl"
          >
            <span className="mr-3 text-teal-400 hover:text-orange-400 transition-colors">{`<`}</span>
            Back to the set
          </button>
        }
      />
      <TermsList
        terms={mnemoryState.sets[mnemoryState.currentSetId].editingSet.terms}
      />
      <AddTermBtn />
      <SaveBtn buttonText="Save" />
    </div>
  );
};

export default EditPage;
