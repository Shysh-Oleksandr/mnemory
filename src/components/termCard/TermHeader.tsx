import React, { useEffect, useRef, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { CgClose, CgMathEqual } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreactors, State } from "../../state";
import { fetchImages, getEmptySet } from "./../../Helpers/functions";
import { ITerm } from "./Term";

type Props = { index: number; term: ITerm };

const TermHeader = ({ index, term }: Props) => {
  const mnemoryState = useSelector((state: State) => state.mnemory);
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
  const dispatch = useDispatch();

  const {
    deleteTerm,
    setSearchedImages,
    setAreImagesLoading,
    setTermKeywordImage,
    addSet,
    deleteSet,
    toggleTermCategory,
  } = bindActionCreators(actionCreactors, dispatch);

  useEffect(() => {
    categoryInputRef.current!.value = getTermCategoriesString();

    categoryInputRef.current!.blur();
  }, [mnemoryState.sets]);

  const setKeywordImage = (query: string, foundImage: string) => {
    const currentKeyword = term.descriptionKeywords.find(
      (keyword) => keyword.keyword === query
    );
    if (foundImage && currentKeyword) {
      setTermKeywordImage(term.id, currentKeyword.id, foundImage);
    }
  };

  const generateKeywordsImages = () => {
    term.descriptionKeywords.map((keyword) => {
      if (!keyword.image && keyword.keyword.trim() !== "") {
        fetchImages(
          keyword.keyword,
          setSearchedImages,
          setAreImagesLoading,
          setKeywordImage
        );
      }
    });
  };

  const checkIfCanGenerate = (): boolean => {
    const canGenerate = term.descriptionKeywords.find(
      (keyword) => !keyword.image && keyword.keyword.trim() !== ""
    );
    return canGenerate ? true : false;
  };

  const addNewCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newCategoryName = categoryInputRef.current!.value;
    const isNewCategoryName: boolean = !categorySets
      .map((category) => category.savedSet.name)
      .includes(newCategoryName);

    if (newCategoryName.trim() !== "" && isNewCategoryName) {
      console.log("add");
      const newCategorySet = getEmptySet(mnemoryState, true, newCategoryName);
      addSet(newCategorySet);
      toggleTermCategory(term.id, newCategorySet);
      categoryInputRef.current!.value = "";
    }
  };

  return (
    <div className="term-header flex items-center justify-between py-3 px-6 border-b-2 border-slate-800 border-solid">
      <div className="flex items-center">
        <h4 className="term-id">{index + 1}</h4>
        <form
          className="relative ml-8 categories-form"
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
          <label
            htmlFor={term.term + term.id + "category-input"}
            className={`term-input-label !text-sm  absolute -bottom-2 z-10`}
          >
            Categories
          </label>
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
                  {set.savedSet.name}
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
                className="absolute right-0 top-1/2 -translate-y-1/2 text-2xl hover:text-orange-500 text-orange-400 transition-colors"
                type="submit"
              >
                <AiOutlineArrowRight />
              </button>
            </>
          )}
        </form>
      </div>
      <div className="flex items-center">
        <button
          className="btn mr-4 sm:!px-8 !px-1 ml-4"
          disabled={!checkIfCanGenerate()}
          onClick={generateKeywordsImages}
        >
          Generate images
        </button>
        <button className="text-2xl text-white transition-colors hover:text-orange-400 mr-4">
          <CgMathEqual />
        </button>
        <button
          onClick={() => deleteTerm(term)}
          className="delete-btn text-2xl text-white transition-colors hover:text-orange-400"
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default TermHeader;
