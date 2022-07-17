import React, { useState } from "react";
import { useSelector } from "react-redux";
import TermsEditList from "../components/TermsEditList";
import SaveBtn from "../components/UI/SaveBtn";
import { ITerm } from "../interfaces/term";
import { State } from "../state";
import AddTermBtn from "./../components/AddTermBtn";
import SetForm from "./../components/set/SetForm";
import { getCurrentSet } from "./../Helpers/functions";

type Props = {};

const CreatePage = (props: Props) => {
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const currentSet = getCurrentSet(mnemoryState);

  return (
    <div className="div-padding pb-6">
      <SetForm
        buttonText="Create"
        titleContent={
          <h2 className="md:text-3xl text-2xl">Create a new set</h2>
        }
      />
      <TermsEditList
        currentSet={currentSet}
        terms={currentSet.editingSet.terms}
      />
      <AddTermBtn currentSet={currentSet} />
      <SaveBtn
        currentSet={currentSet}
        buttonText="Create"
        isCreatePage={true}
        btnClassname="mt-2 md:!px-24 !px-20 md:!py-4 !py-3"
      />
    </div>
  );
};

export default CreatePage;
