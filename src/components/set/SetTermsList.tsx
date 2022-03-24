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
            className="set-term sm:px-4 px-2 sm:py-2 py-1 bg-slate-700 flex my-2 rounded-lg items-center"
            key={`${set.setId}-${term.id}`}
          >
            <h5 className="border-right text-xl md:pl-3 pl-1 md:pr-7 pr-4 md:mr-8 mr-3">
              {term.id + 1}.
            </h5>
            <h4 className="border-right md:text-2xl text-xl basis-1/5 shrink-0 md:pr-4 pr-2 md:mr-8 mr-4 break-all sm:break-normal">
              {term.term}
            </h4>
            <h4 className="md:text-2xl text-xl md:pr-4 pr-2 md:mr-8 mr-4 border-right basis-1/6 shrink-0 break-all sm:break-normal">
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
