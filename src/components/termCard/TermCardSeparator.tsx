import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreactors, State } from "../../state";

type Props = { cardId: number };

const TermCardSeparator = ({ cardId }: Props) => {
  const [style, setStyle] = useState({
    transform: "scale(0)",
  });
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const dispatch = useDispatch();

  const { addTerm } = bindActionCreators(actionCreactors, dispatch);

  const emptyTerm = {
    term: "",
    descriptionKeywords: [{ keyword: "", id: 0, imageChecked: false }],
    id: mnemoryState.terms.length,
  };

  return (
    <div
      className="h-6 relative"
      onMouseEnter={(e) => {
        setStyle({ transform: "scale(1)" });
      }}
      onMouseLeave={(e) => {
        setStyle({ transform: "scale(0)" });
      }}
    >
      {cardId !== mnemoryState.terms.length - 1 && (
        <button
          style={style}
          onClick={() => addTerm(emptyTerm, cardId + 1)}
          className="round-btn left-1/2 block -translate-x-1/2 -top-2 text-3xl h-10 w-10"
        >
          +
        </button>
      )}
    </div>
  );
};

export default TermCardSeparator;
