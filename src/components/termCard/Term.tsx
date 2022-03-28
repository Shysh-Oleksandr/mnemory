import React from "react";
import "../../styles/term.css";
import TermDescription from "./TermDescription";
import TermHeader from "./TermHeader";
import TermInfo from "./TermInfo";

export type Keyword = {
  keyword: string;
  descriptionText?: string;
  image?: string;
  imageChecked: boolean;
  id: number;
};

export interface ITerm {
  term: string;
  definition: string;
  descriptionKeywords: Keyword[];
  placeholderId: number;
  id: number;
  categories?: string[];
}

type Props = {
  term: ITerm;
  index: number;
};

const Term = ({ term, index }: Props) => {
  return (
    <div
      className="term items-center bg-slate-700 pb-3 shadow-lg text-slate-100 rounded-lg"
      key={`${term}-${term.id}`}
    >
      <TermHeader index={index} term={term} />
      <div className="term-body flex py-2 px-6 sm:flex-row flex-col">
        <TermInfo term={term} />
        <TermDescription term={term} />
      </div>
    </div>
  );
};

export default Term;
