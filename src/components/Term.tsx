import React from "react";
import "../styles/term.css";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { actionCreactors } from "../state";

type Keyword = {
  keyword: string;
  id: number;
};

export interface ITerm {
  term: string;
  definition?: string;
  descriptionKeywords: Keyword[];
  images?: string[];
  id: number;
}

type Props = {
  term: ITerm;
  index: number;
};

const Term = ({ term, index }: Props) => {
  const dispatch = useDispatch();

  const { deleteTerm, addTermKeyword } = bindActionCreators(
    actionCreactors,
    dispatch
  );
  return (
    <div
      className="term items-center bg-slate-700 pb-3 mt-2 mb-5 shadow-lg text-slate-100 rounded-lg"
      key={`${term}-${term.id}`}
    >
      <div className="term-header flex items-center justify-between py-3 px-6 border-b-2 border-slate-800 border-solid">
        <h4 className="term-id">{index + 1}</h4>
        <button onClick={() => deleteTerm(term)} className="delete-btn text-xl">
          X
        </button>
      </div>
      <div className="term-body flex items-center py-2 px-6">
        <div>
          <input
            type="text"
            defaultValue={term.term}
            className="term-title term-input"
            id={`term-${term.id}-title`}
          />
          <label htmlFor={`term-${term.id}-title`} className="term-input-label">
            Term
          </label>
          <input
            type="text"
            defaultValue={term.definition}
            className="term-definition term-input"
            id={`term-${term.id}-definition`}
          />
          <label
            htmlFor={`term-${term.id}-definition`}
            className="term-input-label"
          >
            Definition
          </label>
        </div>
        <div className="term-description flex ml-8 flex-wrap">
          {term.descriptionKeywords.map((descriptionKeyword) => {
            return (
              <input
                type="text"
                defaultValue={descriptionKeyword.keyword}
                className="term-description-keyword w-32 focus-visible:outline-orange-400 focus-visible:outline px-4 h-11 text-lg black_input rounded-2xl"
                key={`${term.id}-${descriptionKeyword.id}-${descriptionKeyword.keyword}`}
              />
            );
          })}
          <button
            onClick={() => addTermKeyword(term.id)}
            className="rounded-full black_input text-3xl h-11 w-11"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Term;
