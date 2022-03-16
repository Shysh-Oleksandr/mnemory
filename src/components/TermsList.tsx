import React from "react";
import Term, { ITerm } from "./termCard/Term";
import TermCardSeparator from "./termCard/TermCardSeparator";
import TermKeywordImageChoice from "./termCard/TermKeywordImageChoice";

type Props = {
  terms: ITerm[];
};

const TermsList = ({ terms }: Props) => {
  return (
    <div>
      {terms.map((term, index) => {
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
