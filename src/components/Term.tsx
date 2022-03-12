import React from "react";
import "../styles/term.css";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { actionCreactors } from "../state";

export interface ITerm {
  term: string;
  definition?: string;
  descriptionKeywords: string[];
  images?: string[];
  id: number;
}

type Props = {
  term: ITerm;
  index: number;
};

const Term = ({ term, index }: Props) => {
  const dispatch = useDispatch();

  const { deleteTerm } = bindActionCreators(actionCreactors, dispatch);
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
        <ul className="term-description flex items-center ml-8">
          {term.descriptionKeywords.map((descriptionKeyword) => {
            return (
              <li
                className="term-description-keyword px-4 py-2 mx-1 cursor-pointer text-lg hover:bg-slate-900 transition-colors bg-slate-800 rounded-2xl"
                key={`${term.id}-${descriptionKeyword}`}
              >
                {descriptionKeyword}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Term;
