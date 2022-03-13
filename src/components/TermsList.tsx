import React from "react";
import { useSelector } from "react-redux";
import { State } from "../state";
import Term from "./Term";
import TermCardSeparator from "./TermCardSeparator";

type Props = {};

const TermsList = (props: Props) => {
  const mnemoryState = useSelector((state: State) => state.mnemory);
  return (
    <div className="">
      {mnemoryState.terms.map((term, index) => {
        return (
          <div key={term.id}>
            <Term term={term} index={index} />
            <TermCardSeparator cardId={index} />
          </div>
        );
      })}
    </div>
  );
};

export default TermsList;
