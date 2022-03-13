import React from "react";
import { useState } from "react";
import { Keyword } from "./Term";
import { bindActionCreators } from "redux";
import { actionCreactors } from "../state";
import { useDispatch } from "react-redux";

type Props = { termId: number; descriptionKeyword: Keyword };

const TermKeyword = ({ termId, descriptionKeyword }: Props) => {
  const [style, setStyle] = useState({
    transform: "scale(0)",
  });
  const dispatch = useDispatch();

  const { deleteTermKeyword } = bindActionCreators(actionCreactors, dispatch);

  return (
    <div className="relative">
      <input
        type="text"
        defaultValue={descriptionKeyword.keyword}
        onMouseEnter={(e) => {
          setStyle({
            transform: "scale(1)",
          });
        }}
        onMouseLeave={(e) => {
          setStyle({
            transform: "scale(0)",
          });
        }}
        className="term-description-keyword w-32 focus-visible:outline-orange-400 focus-visible:outline px-4 h-11 text-lg black_input rounded-2xl"
      />
      <button
        onClick={() => deleteTermKeyword(termId, descriptionKeyword.id)}
        className="round-btn flex justify-center items-center -top-3 -right-1 text-md h-6 w-6"
        style={style}
      >
        X
      </button>
    </div>
  );
};

export default TermKeyword;
