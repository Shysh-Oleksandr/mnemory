import React, { useState } from "react";
import { ITerm } from "./Term";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreactors } from "../state";
import TermKeyword from "./TermKeyword";

type Props = { term: ITerm };

const TermDescription = ({ term }: Props) => {
  const dispatch = useDispatch();

  const { addTermKeyword } = bindActionCreators(actionCreactors, dispatch);
  return (
    <div className="term-description flex ml-8 mt-1 flex-wrap items-start">
      {term.descriptionKeywords.map((descriptionKeyword) => {
        return (
          <TermKeyword
            termId={term.id}
            descriptionKeyword={descriptionKeyword}
            key={`${term.id}-${descriptionKeyword.id}-${descriptionKeyword.keyword}`}
          />
        );
      })}
      <button
        onClick={() => addTermKeyword(term.id)}
        className="rounded-full black_input text-3xl h-11 w-11 my-1"
      >
        +
      </button>
    </div>
  );
};

export default TermDescription;
