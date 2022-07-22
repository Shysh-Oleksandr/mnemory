import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import SetForm from "../components/set/SetForm";
import TermsEditList from "../components/TermsEditList";
import SaveBtn from "../components/UI/SaveBtn";
import { useCurrentSetState } from "../hooks";
import { actionCreactors } from "../state";
import AddTermBtn from "./../components/AddTermBtn";
import { isSetChanged } from "./../Helpers/functions";

type Props = {};

const EditPage = (props: Props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const currentSet = useCurrentSetState();

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
              if (isSetChanged(deleteSet, currentSet)) {
                setShowConfirmModal(
                  true,
                  undefined,
                  `/set/${currentSet.savedSet.setId + 1}`
                );
              } else {
                navigate(`/set/${currentSet.savedSet.setId + 1}`);
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
      <TermsEditList
        terms={currentSet.editingSet.terms}
        currentSet={currentSet}
      />
      <AddTermBtn currentSet={currentSet} />
      <SaveBtn
        currentSet={currentSet}
        buttonText="Save"
        isCreatePage={false}
        btnClassname="mt-2 md:!px-24 !px-20 md:!py-4 !py-3"
      />
    </div>
  );
};

export default EditPage;
