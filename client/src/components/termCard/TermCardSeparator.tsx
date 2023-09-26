import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { getEmptyTerm } from "../../Helpers/functions";
import { ISetStatus } from "../../interfaces/set";
import { actionCreactors } from "../../state";

type Props = { cardId: number; currentSet: ISetStatus };

const TermCardSeparator = ({ cardId, currentSet }: Props) => {
  const addIconStyle =
    window.screen.width > 992
      ? {
          transform: "scale(0)",
        }
      : {
          transform: "scale(1)",
        };
  const [style, setStyle] = useState(addIconStyle);
  const dispatch = useDispatch();

  const { addTerm } = bindActionCreators(actionCreactors, dispatch);

  const emptyTerm = getEmptyTerm();

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
          <span className="rotate-45 hover:rotate-[135deg] transition-all duration-500">
            <CgClose />
          </span>
        </button>
      )}
    </div>
  );
};

export default TermCardSeparator;
