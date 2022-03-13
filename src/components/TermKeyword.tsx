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
    <div className="term-description-keyword relative">
      <input
        type="text"
        defaultValue={descriptionKeyword.keyword}
        placeholder="Couch"
        className=" w-32 focus-visible:outline-orange-400 focus-visible:outline px-4 h-11 text-lg black_input rounded-2xl"
      />
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
