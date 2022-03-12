import React from "react";
import { useSelector } from "react-redux";
import { State } from "../state";
import Term from "./Term";

type Props = {};

const TermsList = (props: Props) => {
  const mnemoryState = useSelector((state: State) => state.mnemory);
  return (
    <div className="">
      {mnemoryState.terms.map((term, index) => {
        return <Term key={term.id} term={term} index={index} />;
      })}
    </div>
  );
};

export default TermsList;
