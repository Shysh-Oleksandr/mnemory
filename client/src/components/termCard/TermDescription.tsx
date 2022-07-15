import React from "react";
import { CgClose } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { ITerm } from "../../interfaces/term";
import { actionCreactors } from "../../state";
import TermKeyword from "./TermKeyword";

type Props = { term: ITerm };

const TermDescription = ({ term }: Props) => {
  const dispatch = useDispatch();
  const { addTermKeyword } = bindActionCreators(actionCreactors, dispatch);

  return (
    <div className="term-description flex md:ml-8 sm:ml-4 ml-0 sm:mt-1 mt-4 flex-wrap items-end basis-3/4 grow">
      {term.descriptionKeywords.map((descriptionKeyword, index) => {
        return (
          <TermKeyword
            termId={term.id}
            descriptionKeyword={descriptionKeyword}
            index={index}
            key={`${term.id}-${descriptionKeyword.id}`}
          />
        );
      })}
      <button
        onClick={() => addTermKeyword(term.id)}
        className="rounded-full black_input text-xl h-11 w-11 m-1 rotate-45 flex justify-center items-center"
      >
        <CgClose />
      </button>
    </div>
  );
};

export default TermDescription;
