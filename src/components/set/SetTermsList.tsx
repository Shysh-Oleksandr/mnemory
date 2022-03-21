import React from "react";
import { ISet } from "./../../state/Reducers/MnemoryReducer";
import KeywordsList from "./KeywordsList";

type Props = {
  set: ISet;
};

const SetTermsList = ({ set }: Props) => {
  return (
    <div>
      {set.terms.map((term) => {
        return (
          <div
            className="set-term px-4 py-2 bg-slate-700 flex my-2 rounded-lg items-center"
            key={`${set.setId}-${term.id}`}
          >
            <h5 className="border-right text-xl pl-3 pr-7 mr-8">
              {term.id + 1}.
            </h5>
            <h4 className="border-right text-2xl basis-1/5 shrink-0 pr-4 mr-8">
              {term.term}
            </h4>
            <h4 className="text-2xl mr-8 pr-4 border-right basis-1/6 shrink-0 ">
              {term.definition}
            </h4>
            <KeywordsList term={term} isBigSize={false} />
          </div>
        );
      })}
    </div>
  );
};

export default SetTermsList;
