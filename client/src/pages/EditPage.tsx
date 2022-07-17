import React from "react";
import { BsArrowLeft } from "react-icons/bs";
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
    <div className="div-padding pb-6">
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
            className="back-btn md:text-2xl text-xl"
          >
            <span className="mr-3 text-teal-400 inline-block relative top-1 transition-colors">
              <BsArrowLeft />
            </span>
            Back to the set
          </button>
        }
      />
      <TermsEditList terms={getCurrentSet(mnemoryState).editingSet.terms} />
      <AddTermBtn />
      <SaveBtn
        buttonText="Save"
        isCreatePage={false}
        btnClassname="mt-2 md:!px-24 !px-20 md:!py-4 !py-3"
      />
    </div>
  );
};

export default EditPage;
