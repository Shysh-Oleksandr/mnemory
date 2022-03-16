import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SetForm from "../components/set/SetForm";
import SaveBtn from "../components/UI/SaveBtn";
import { State } from "../state";
import AddTermBtn from "./../components/AddTermBtn";
import TermsList from "./../components/TermsList";

type Props = {};

const EditPage = (props: Props) => {
  const mnemoryState = useSelector((state: State) => state.mnemory);

  return (
    <div>
      <SetForm
        buttonText="Save"
        titleContent={
          <Link to="/set/3" className="text-xl">
            <span className="mr-3 text-teal-400 hover:text-orange-400 transition-colors">{`<`}</span>
            Back to the set
          </Link>
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
