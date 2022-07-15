import React, { useEffect, useRef, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { getEmptySet } from "../../Helpers/functions";
import { ITerm } from "../../interfaces/term";
import { actionCreactors, State } from "../../state";
import TermInputLabel from "./TermInputLabel";

type Props = { term: ITerm };

const TermCategoriesForm = ({ term }: Props) => {
  const mnemoryState = useSelector((state: State) => state.mnemory);

  const dispatch = useDispatch();
  const { addSet, deleteSet, toggleTermCategory } = bindActionCreators(
    actionCreactors,
    dispatch
  );

  const categorySets = mnemoryState.sets.filter((set) => set.isCategorySet);

  const categoryInputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  const getTermCategoriesString = (): string => {
    return (
      term.categories?.map((category) => category.savedSet.name).join(", ") ||
      ""
    );
  };

  const onFocus = () => {
    setFocused(true);
    categoryInputRef.current!.value = "";
  };
  const onBlur = () => {
    setFocused(false);
    categoryInputRef.current!.value = getTermCategoriesString();
  };

  useEffect(() => {
    categoryInputRef.current!.value = getTermCategoriesString();

    categoryInputRef.current!.blur();
  }, [mnemoryState.sets]);

  const addNewCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newCategoryName = categoryInputRef.current!.value;
    const isNewCategoryName: boolean = !categorySets
      .map((category) => category.savedSet.name)
      .includes(newCategoryName);

    if (newCategoryName.trim() !== "" && isNewCategoryName) {
      const newCategorySet = getEmptySet(mnemoryState, true, newCategoryName);
      addSet(newCategorySet);
      toggleTermCategory(term.id, newCategorySet);
      categoryInputRef.current!.value = "";
    }
  };

  return (
    <form
      className="relative md:ml-8 md:mt-0 sm:mt-4 mt-0 categories-form"
      onSubmit={(e) => addNewCategory(e)}
    >
      <input
        ref={categoryInputRef}
        onFocus={onFocus}
        onBlur={onBlur}
        type="text"
        id={term.term + term.id + "category-input"}
        className="term-input category-input w-64 !text-xl mb-3"
        placeholder="Enter a new category..."
        defaultValue={getTermCategoriesString()}
      />
      <TermInputLabel
        inputId={term.term + term.id + "category-input"}
        labelClassName="!text-sm  absolute -bottom-2 left-0 z-10"
        labelText="Categories"
      />
      <ul
        className={`categories-list rounded-xl rounded-tl-none overflow-y-auto h-auto max-h-0 opacity-0 left-1/2 overflow-hidden -translate-x-1/2 w-full transition-all absolute bg-slate-800 bottom-3 translate-y-full z-20`}
      >
        {categorySets.map((set) => {
          return (
            <li
              onClick={() => toggleTermCategory(term.id, set)}
              className={`mb-[1px] relative block px-4 text-lg tracking-wide cursor-pointer ${
                term.categories
                  ?.map((category) => category.savedSet.setId)
                  .includes(set.savedSet.setId)
                  ? "bg-slate-500"
                  : "bg-slate-800"
              } hover:bg-slate-600 transition-all`}
              key={set.savedSet.setId + set.savedSet.name}
            >
              {set.savedSet.name} ({set.editingSet.terms.length})
              <button
                type="button"
                onClick={() => deleteSet(set.savedSet.setId)}
                className="absolute right-2 top-1/2 rounded-md -translate-y-1/2 text-xl p-[5px] transition-colors bg-slate-700 hover:bg-slate-800"
              >
                <CgClose />
              </button>
            </li>
          );
        })}
      </ul>
      {focused && (
        <>
          <button
            className="absolute right-0 top-1/2 -translate-y-[65%] text-2xl hover:text-orange-500 text-orange-400 transition-colors"
            type="submit"
          >
            <AiOutlineArrowRight />
          </button>
        </>
      )}
    </form>
  );
};

export default TermCategoriesForm;
