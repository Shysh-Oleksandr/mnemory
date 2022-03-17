import React, { RefObject, useRef } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreactors } from "../../state";
import { Keyword } from "./Term";
import { fetchImages } from "./TermKeywordImageChoice";

type Props = { termId: number; descriptionKeyword: Keyword };

const TermKeyword = ({ termId, descriptionKeyword }: Props) => {
  const nameRef = useRef() as RefObject<HTMLInputElement>;
  const descriptionRef = useRef() as RefObject<HTMLTextAreaElement>;
  const dispatch = useDispatch();
  const {
    deleteTermKeyword,
    deleteTermKeywordImage,
    toggleTermKeywordImage,
    setSearchedImages,
    setKeywordInfo,
    setAreImagesLoading,
  } = bindActionCreators(actionCreactors, dispatch);

  const toggleImageChoice = () => {
    toggleTermKeywordImage(termId, descriptionKeyword.id);
    !descriptionKeyword.imageChecked &&
      fetchImages(
        descriptionKeyword.keyword,
        setSearchedImages,
        setAreImagesLoading
      );
  };

  return (
    <div className="term-description-keyword relative flex flex-col items-center m-1 mx-2 w-36">
      {descriptionKeyword.image ? (
        <div
          className="w-full h-[80px] rounded-xl bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `urL(${descriptionKeyword.image})` }}
        >
          <button
            onClick={() =>
              deleteTermKeywordImage(termId, descriptionKeyword.id)
            }
            className="absolute rounded-md bg-slate-700 h-8 w-8 block justify-center items-center top-1 right-3 text-lg transition-colors hover:text-orange-400 hover:bg-slate-800"
          >
            X
          </button>
        </div>
      ) : (
        <label
          htmlFor={`${termId}-${descriptionKeyword.id}`}
          className={`term-keyword-image-filler ${
            descriptionKeyword.imageChecked ? "checked" : ""
          } w-full h-[80px] rounded-xl cursor-pointer flex justify-center transition-all items-center border-2 border-dashed border-white`}
        >
          <input
            type="checkbox"
            className="hidden"
            onChange={toggleImageChoice}
            id={`${termId}-${descriptionKeyword.id}`}
          />
          <h4 className="term-keyword-image-label transition-all text-lg">
            Image
          </h4>
        </label>
      )}
      <div className="relative">
        <input
          ref={nameRef}
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
          placeholder="Couch"
          className="term-keyword-input w-full px-4 h-11 text-lg black_input rounded-2xl border-orange-400 border-solid hover:border-b-[3px] hover:border-white"
        />
        <button
          onClick={() => deleteTermKeyword(termId, descriptionKeyword.id)}
          className="round-btn term-description-keyword-delete block justify-center items-center -top-2 -right-1 text-md h-6 w-6"
        >
          X
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
