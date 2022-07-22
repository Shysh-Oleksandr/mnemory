import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import config from "../../config/config";
import { getEmptySet } from "../../Helpers/functions";
import { ISetStatus } from "../../interfaces/set";
import { ITerm } from "../../interfaces/term";
import { actionCreactors, State } from "../../state";
import { setError, setSuccess } from "../../state/Action-creators";
import { getAllSets } from "../../state/Async-actions";
import TermInputLabel from "./TermInputLabel";

type Props = { term: ITerm; currentSet: ISetStatus };

const TermCategoriesForm = ({ term, currentSet }: Props) => {
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const { user } = useSelector((state: State) => state.user);

  const dispatch = useDispatch();
  const { addSet, deleteSet, toggleTermCategory } = bindActionCreators(
    actionCreactors,
    dispatch
  );

  const categorySets = mnemoryState.sets.filter((set) => set.isCategorySet);

  const categoryInputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  const getTermCategoriesString = (
    newCategory: string = "",
    isAdding: boolean = true
  ): string => {
    const categories = isAdding
      ? [
          ...(term.categories?.map((category) => category.savedSet.name) || []),
          newCategory,
        ]
      : term.categories
          ?.map((category) => category.savedSet.name)
          .filter((cat) => cat !== newCategory) || [];
    return (
      categories.filter((category) => category.trim() !== "").join(", ") || ""
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

  const createCategorySet = async () => {
    let newCategoryName = categoryInputRef.current!.value;
    const isNewCategoryName: boolean = !categorySets
      .map((category) => category.savedSet.name)
      .includes(newCategoryName);
    if (newCategoryName.trim() === "") {
      dispatch(setError("Please enter category set name."));
      dispatch(setSuccess(""));
      return null;
    } else if (!isNewCategoryName) {
      dispatch(setError("Category set already exists."));
      dispatch(setSuccess(""));
      return null;
    }
    const newCategorySet = getEmptySet(undefined, true, newCategoryName);
    const newSavedCategorySet = getEmptySet(
      undefined,
      true,
      newCategoryName
    ).savedSet;

    categoryInputRef.current!.value = "";

    try {
      const response = await axios({
        method: "POST",
        url: `${config.server.url}/sets/create`,
        data: {
          name: newSavedCategorySet.name,
          description: newSavedCategorySet.description,
          createdDate: newSavedCategorySet.createdDate,
          lastVisitedDate: newSavedCategorySet.lastVisitedDate,
          isCategorySet: true,
          terms: [],
          setId: newSavedCategorySet.setId,
          author: user._id,
        },
      });
      if (response.status === 201) {
        addSet(newCategorySet);
        toggleTermCategory(term.id, newCategorySet);
        setTimeout(() => {
          categoryInputRef.current!.value = getTermCategoriesString(
            newCategorySet.savedSet.name,
            true
          );
        }, 0);
        dispatch(setSuccess(`Category set added.`));
        // dispatch(getAllSets(user._id));
      } else {
        dispatch(setError("Unable to create category set."));
      }
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };

  const toggleCategorySet = async (categorySet: ISetStatus) => {
    const isNewCategory = !term.categories
      ?.map((cat) => cat.savedSet.setId)
      .includes(categorySet.savedSet.setId);

    const newTerms = isNewCategory
      ? [...categorySet.savedSet.terms, term]
      : categorySet.savedSet.terms.filter(
          (categoryTerm) => categoryTerm.id !== term.id
        );

    toggleTermCategory(term.id, categorySet);
    setTimeout(() => {
      categoryInputRef.current!.value = getTermCategoriesString(
        categorySet.savedSet.name,
        isNewCategory
      );
    }, 0);
  };

  const addNewCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCategorySet();
  };

  const deleteCategorySet = async (set: ISetStatus) => {
    currentSet.editingSet.terms.map(() => {});

    try {
      const response = await axios({
        method: "DELETE",
        url: `${config.server.url}/sets/${set.savedSet._id}`,
      });
      if (response.status === 200) {
        deleteSet(set.savedSet.setId);
        dispatch(setSuccess(`Category set has been deleted.`));
      } else {
        dispatch(setError("Unable to delete category set."));
      }
    } catch (error: any) {
      dispatch(setError(error.message));
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
              onClick={() => toggleCategorySet(set)}
              className={`mb-[1px] relative block px-4 text-lg tracking-wide cursor-pointer ${
                term.categories
                  ?.map((cat) => cat.savedSet.setId)
                  .includes(set.savedSet.setId)
                  ? "bg-slate-500"
                  : "bg-slate-800"
              } hover:bg-slate-600 transition-all`}
              key={set.savedSet.setId + set.savedSet.name}
            >
              {set.savedSet.name} ({set.editingSet.terms.length})
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCategorySet(set);
                }}
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
