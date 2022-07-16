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

  return (
    <div className="div-padding pb-6">
      <SetForm
        buttonText="Create"
        titleContent={
          <h2 className="md:text-3xl text-2xl">Create a new set</h2>
        }
      />
      <TermsEditList terms={getCurrentSet(mnemoryState).editingSet.terms} />
      <AddTermBtn />
      <SaveBtn buttonText="Create" isCreatePage={true} />
    </div>
  );
};

export default CreatePage;
