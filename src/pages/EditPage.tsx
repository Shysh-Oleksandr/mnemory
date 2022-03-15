import React from "react";
import TermsList from "./../components/TermsList";
import AddTermBtn from "./../components/AddTermBtn";
import SetForm from "../components/set/SetForm";
import { Link } from "react-router-dom";

type Props = {};

const EditPage = (props: Props) => {
  return (
    <div>
      <SetForm
        buttonText="Edit"
        titleContent={
          <Link to="/set/3" className="text-xl">
            <span className="mr-3 text-teal-400 hover:text-orange-400 transition-colors">{`<`}</span>
            Back to the set
          </Link>
        }
      />
      <TermsList />
      <AddTermBtn />
      <button className="btn ml-auto block mt-2 !px-24 !py-4">Save</button>
    </div>
  );
};

export default EditPage;
