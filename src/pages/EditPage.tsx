import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import SetForm from "../components/set/SetForm";
import TermsEditList from "../components/TermsEditList";
import SaveBtn from "../components/UI/SaveBtn";
import { actionCreactors, State } from "../state";
import AddTermBtn from "./../components/AddTermBtn";
import { getCurrentSet, isSetChanged } from "./../Helpers/functions";

type Props = {};

const EditPage = (props: Props) => {
  const navigate = useNavigate();

  const mnemoryState = useSelector((state: State) => state.mnemory);
  const dispatch = useDispatch();
  const { setShowConfirmModal, deleteSet } = bindActionCreators(
    actionCreactors,
    dispatch
  );
  return (
    <div>
      <SetForm
        buttonText="Save"
        titleContent={
          <button
            type="button"
            onClick={() => {
              if (isSetChanged(mnemoryState, deleteSet)) {
                setShowConfirmModal(
                  true,
                  undefined,
                  `/set/${mnemoryState.currentSetId + 1}`
                );
              } else {
                navigate(`/set/${mnemoryState.currentSetId + 1}`);
              }
            }}
            className="md:text-2xl text-xl"
          >
            <span className="mr-3 text-teal-400 hover:text-orange-400 transition-colors">{`<`}</span>
            Back to the set
          </button>
        }
      />
      <TermsEditList terms={getCurrentSet(mnemoryState).editingSet.terms} />
      <AddTermBtn />
      <SaveBtn buttonText="Save" />
    </div>
  );
};

export default EditPage;
