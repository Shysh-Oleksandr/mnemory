import { RefObject, useCallback, useEffect, useRef } from "react";
import { BsCardImage } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { clearInput, fetchImages } from "../../Helpers/functions";
import { ISetStatus } from "../../interfaces/set";
import { Keyword } from "../../interfaces/term";
import { actionCreactors } from "../../state";
import { termsPlaceholder } from "./../../data/termsPlaceholders";

type Props = {
  termId: number;
  descriptionKeyword: Keyword;
  index: number;
  currentSet: ISetStatus;
};

const TermKeyword = ({
  termId,
  descriptionKeyword,
  index,
  currentSet,
}: Props) => {
  const keywordRef = useRef() as RefObject<HTMLDivElement>;
  const nameRef = useRef() as RefObject<HTMLInputElement>;
  const descriptionRef = useRef() as RefObject<HTMLTextAreaElement>;
  const dispatch = useDispatch();
  const editingTerms = currentSet.editingSet.terms;

  const editingTerm = editingTerms.find((term) => term.id === termId);
  const {
    deleteTermKeyword,
    deleteTermKeywordImage,
    toggleTermKeywordImage,
    setSearchedImages,
    setKeywordInfo,
    setAreImagesLoading,
  } = bindActionCreators(actionCreactors, dispatch);

  useEffect(() => {
    clearInput(nameRef, descriptionRef);
  }, [currentSet.savedSet.setId]);

  useEffect(() => {
    const savedTerms = currentSet.savedSet.terms;
    const savedTerm = savedTerms.find((term) => term.id === termId);
    if (!savedTerm) {
      nameRef.current?.focus();
      return;
    }
    if (savedTerm.descriptionKeywords.includes(descriptionKeyword)) return;
    nameRef.current?.focus();
  }, []);

  function toggleImageChoice(): void {
    toggleTermKeywordImage(termId, descriptionKeyword.id);
    !descriptionKeyword.imageChecked &&
      fetchImages(
        descriptionKeyword.keyword,
        setSearchedImages,
        setAreImagesLoading
      );
  }

  const getKeywordPlaceholder = useCallback(
    () => {
      const placeholderKeywords =
        termsPlaceholder[
          editingTerm!.placeholderId ||
          Math.floor(Math.random() * termsPlaceholder.length)
        ].keywords;

      const keywordPlaceholder = placeholderKeywords[index];
      const placeholder = keywordPlaceholder ? keywordPlaceholder : "keyword...";

      return placeholder;
    },
    [editingTerm, index],
  );

  return (
    <div
      ref={keywordRef}
      className="term-description-keyword relative flex flex-col items-center m-1 mx-2 md:w-36 w-28"
    >
      {descriptionKeyword.image ? (
        <div
          className="w-full md:h-[80px] h-[70px] rounded-xl bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `urL(${descriptionKeyword.image})` }}
        >
          <button
            onClick={() =>
              deleteTermKeywordImage(termId, descriptionKeyword.id)
            }
            className="absolute rounded-md bg-slate-700 h-[28px] w-[28px] flex justify-center items-center top-[6px] right-[6px] text-xl transition-colors hover:text-orange-400 hover:bg-slate-800"
          >
            <CgClose />
          </button>
        </div>
      ) : (
        <label
          htmlFor={`${termId}-${descriptionKeyword.id}`}
          className={`term-keyword-image-filler ${descriptionKeyword.imageChecked ? "checked" : ""
            } w-full md:h-[80px] h-[70px] rounded-xl static cursor-pointer flex justify-center transition-all items-center border-2 border-dashed border-white`}
        >
          <input
            type="checkbox"
            className="hidden"
            onChange={toggleImageChoice}
            id={`${termId}-${descriptionKeyword.id}`}
          />
          <h4 className="term-keyword-image-label transition-all text-lg flex flex-col items-center tracking-wider">
            <span className="block text-2xl">
              <BsCardImage />
            </span>
            Image
          </h4>
        </label>
      )}
      <div className="relative">
        <input
          ref={nameRef}
          tabIndex={0}
          onChange={() =>
            setKeywordInfo(
              nameRef.current?.value!,
              descriptionRef.current?.value!,
              termId,
              descriptionKeyword.id
            )
          }
          type="text"
          defaultValue={descriptionKeyword.keyword}
          placeholder={getKeywordPlaceholder()}
          className="term-keyword-input w-full px-4 h-11 text-lg black_input rounded-2xl border-orange-400 border-solid hover:border-b-[3px] hover:border-white"
        />
        <button
          onClick={() => {
            keywordRef.current?.classList.add("delete");

            setTimeout(() => {
              deleteTermKeyword(termId, descriptionKeyword.id);
            }, 550);
          }}
          className="round-btn term-description-keyword-delete flex justify-center items-center hover:rotate-90 transition-all duration-300 -top-2 -right-1 text-md h-6 w-6"
        >
          <CgClose />
        </button>
      </div>
      <textarea
        ref={descriptionRef}
        onChange={() =>
          setKeywordInfo(
            nameRef.current?.value!,
            descriptionRef.current?.value!,
            termId,
            descriptionKeyword.id
          )
        }
        spellCheck={false}
        placeholder="Describe the keyword..."
        defaultValue={descriptionKeyword.descriptionText}
        className="term-description-keyword-text resize-none text-base leading-5 focus-visible:border-b-[3px] border-orange-400 border-solid rounded-xl left-1/2 -translate-x-1/2 w-full h-0 transition-all absolute bg-slate-800 bottom-0 translate-y-full z-20"
      ></textarea>
    </div>
  );
};

export default TermKeyword;
