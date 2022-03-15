import React from "react";
import { useSelector } from "react-redux";
import { State } from "../state";
import Term from "./termCard/Term";
import TermCardSeparator from "./termCard/TermCardSeparator";
import TermKeywordImageChoice from "./termCard/TermKeywordImageChoice";

type Props = {};

const TermsList = (props: Props) => {
  const mnemoryState = useSelector((state: State) => state.mnemory);
  return (
    <div>
      {mnemoryState.terms.map((term, index) => {
        return (
          <div key={term.id}>
            <Term term={term} index={index} />
            <TermKeywordImageChoice term={term} />
            <TermCardSeparator cardId={index} />
          </div>
        );
      })}
    </div>
  );
};

export default TermsList;
