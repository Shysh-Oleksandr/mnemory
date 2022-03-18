import React from "react";
import { useSelector } from "react-redux";
import SaveBtn from "../components/UI/SaveBtn";
import { State } from "../state";
import AddTermBtn from "./../components/AddTermBtn";
import SetForm from "./../components/set/SetForm";
import TermsList from "./../components/TermsList";

type Props = {};

const CreatePage = (props: Props) => {
  const mnemoryState = useSelector((state: State) => state.mnemory);

  return (
    <div>
      <SetForm
        buttonText="Create"
        titleContent={<h2 className="text-2xl">Create a new set</h2>}
      />
      <TermsList
        terms={mnemoryState.sets[mnemoryState.currentSetId].editingSet.terms}
      />
      <AddTermBtn />
      <SaveBtn buttonText="Create" />
    </div>
  );
};

export default CreatePage;