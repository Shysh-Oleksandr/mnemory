import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { getCurrentSet } from "../../Helpers/functions";
import { actionCreactors, State } from "../../state";
import { ISetStatus } from "../../state/Reducers/MnemoryReducer";
import { CgClose } from "react-icons/cg";

type Props = { cardId: number };

const TermCardSeparator = ({ cardId }: Props) => {
  const addIconStyle =
    window.screen.width > 992
      ? {
          transform: "scale(0)",
        }
      : {
          transform: "scale(1)",
        };
  const [style, setStyle] = useState(addIconStyle);
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const dispatch = useDispatch();
  const currentSet: ISetStatus = getCurrentSet(mnemoryState);

  const { addTerm } = bindActionCreators(actionCreactors, dispatch);

  const emptyTerm = {
    term: "",
    definition: "",
    descriptionKeywords: [{ keyword: "", id: 0, imageChecked: false }],
    id: currentSet.editingSet.terms.length,
  };

  return (
    <div
      className="sm:h-6 h-4 relative"
      onMouseEnter={(e) => {
        setStyle({ transform: "scale(1)" });
      }}
      onMouseLeave={(e) => {
        window.screen.width > 992 && setStyle({ transform: "scale(0)" });
      }}
    >
      {cardId !== currentSet.editingSet.terms.length - 1 && (
        <button
          style={style}
          onClick={() => addTerm(emptyTerm, cardId + 1)}
          className="round-btn left-[calc(50%-20px)] flex justify-center items-center sm:-top-2 -top-3 text-2xl h-10 w-10"
        >
          <span className="rotate-45">
            <CgClose />
          </span>
        </button>
      )}
    </div>
  );
};

export default TermCardSeparator;
