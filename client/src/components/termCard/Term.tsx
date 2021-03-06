import React, { RefObject, useRef } from "react";
import { ISetStatus } from "../../interfaces/set";
import { ITerm } from "../../interfaces/term";
import "../../styles/term.css";
import TermDescription from "./TermDescription";
import TermHeader from "./TermHeader";
import TermInfo from "./TermInfo";

type Props = {
  term: ITerm;
  index: number;
  currentSet: ISetStatus;
};

const Term = ({ term, index, currentSet }: Props) => {
  const termRef = useRef() as RefObject<HTMLDivElement>;

  return (
    <div
      ref={termRef}
      className="term items-center bg-slate-700 pb-3 shadow-lg text-slate-100 rounded-lg"
      key={`${term}-${term.id}`}
    >
      <TermHeader
        termRef={termRef}
        index={index}
        term={term}
        currentSet={currentSet}
      />
      <div className="term-body flex sm:py-2 py-1 sm:px-6 px-3 sm:flex-row flex-col">
        <TermInfo currentSet={currentSet} term={term} />
        <TermDescription term={term} currentSet={currentSet} />
      </div>
    </div>
  );
};

export default Term;
