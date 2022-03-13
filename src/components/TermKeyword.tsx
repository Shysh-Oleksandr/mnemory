import React from "react";
import { useState } from "react";
import { Keyword } from "./Term";
import { bindActionCreators } from "redux";
import { actionCreactors } from "../state";
import { useDispatch } from "react-redux";

type Props = { termId: number; descriptionKeyword: Keyword };

const TermKeyword = ({ termId, descriptionKeyword }: Props) => {
  const dispatch = useDispatch();

  const { deleteTermKeyword } = bindActionCreators(actionCreactors, dispatch);

  return (
    <div className="term-description-keyword relative my-1">
      <input
        type="text"
        defaultValue={descriptionKeyword.keyword}
        placeholder="Couch"
        className="term-keyword-input w-32 px-4 h-11 text-lg black_input rounded-2xl border-solid hover:border-b-[3px] hover:border-white"
      />
      <textarea
        spellCheck={false}
        placeholder="Describe the keyword..."
        defaultValue={descriptionKeyword.descriptionText}
        className="term-description-keyword-text resize-none text-base leading-5 rounded-xl left-1/2 -translate-x-1/2 w-[95%] h-0 transition-all absolute bg-slate-800 bottom-0 translate-y-full z-20"
      ></textarea>
      <button
        onClick={() => deleteTermKeyword(termId, descriptionKeyword.id)}
        className="round-btn term-description-keyword-delete block justify-center items-center -top-2 -right-1 text-md h-6 w-6"
      >
        X
      </button>
    </div>
  );
};

export default TermKeyword;
