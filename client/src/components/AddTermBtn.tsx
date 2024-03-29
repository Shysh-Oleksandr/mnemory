import { CgClose } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { getEmptyTerm } from "../Helpers/functions";
import { ISetStatus } from "../interfaces/set";
import { actionCreactors } from "../state";

interface Props {
  currentSet: ISetStatus;
}

const AddTermBtn = ({ currentSet }: Props) => {
  const dispatch = useDispatch();

  const { addTerm } = bindActionCreators(actionCreactors, dispatch);
  const newTermIndex = currentSet.editingSet.terms.length;

  const emptyTerm = getEmptyTerm();

  return (
    <button
      onClick={() => addTerm(emptyTerm, newTermIndex)}
      className="add-term-btn items-center w-full bg-slate-700 md:py-8 py-6 mb-4 shadow-lg text-slate-100 rounded-lg"
    >
      <div className="relative text-center">
        <h4 className="absolute left-6 top-1/2 -translate-y-1/2 font-bold md:text-2xl text-xl text-black">
          {newTermIndex + 1}
        </h4>
        <h3 className="add-term-text md:text-2xl text-xl inline-block pb-2 font-bold tracking-wide border-solid border-b-4 transition-all border-orange-400">
          <span className="rotate-45 inline-block relative top-1 plus transition-all duration-500">
            <CgClose />
          </span>
          <span> Add a new card</span>
        </h3>
      </div>
    </button>
  );
};

export default AddTermBtn;
