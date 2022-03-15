import React from "react";
import SetForm from "./../components/set/SetForm";
import TermsList from "./../components/TermsList";
import AddTermBtn from "./../components/AddTermBtn";

type Props = {};

const CreatePage = (props: Props) => {
  return (
    <div>
      <SetForm
        buttonText="Save"
        titleContent={<h2 className="text-2xl">Create a new set</h2>}
      />
      <TermsList />
      <AddTermBtn />
      <button className="btn ml-auto block mt-2 !px-24 !py-4">Create</button>
    </div>
  );
};

export default CreatePage;
