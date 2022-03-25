import React, { RefObject, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { clearInput } from "../../Helpers/functions";
import { actionCreactors, State } from "../../state";
import { Keyword } from "./Term";
import { fetchImages } from "./TermKeywordImageChoice";
import { CgClose } from "react-icons/cg";
import { BsCardImage } from "react-icons/bs";

type Props = { termId: number; descriptionKeyword: Keyword };

const TermKeyword = ({ termId, descriptionKeyword }: Props) => {
  const mnemoryState = useSelector((state: State) => state.mnemory);

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

  useEffect(() => {
    clearInput(nameRef, descriptionRef);
  }, [mnemoryState.currentSetId]);

  // useEffect(() => {
  //   nameRef.current?.focus();
  // }, []);

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
    <div className="term-description-keyword relative flex flex-col items-center m-1 mx-2 md:w-36 w-28">
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
          className={`term-keyword-image-filler ${
            descriptionKeyword.imageChecked ? "checked" : ""
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
          placeholder="Couch"
          className="term-keyword-input w-full px-4 h-11 text-lg black_input rounded-2xl border-orange-400 border-solid hover:border-b-[3px] hover:border-white"
        />
        <button
          onClick={() => deleteTermKeyword(termId, descriptionKeyword.id)}
          className="round-btn term-description-keyword-delete flex justify-center items-center -top-2 -right-1 text-md h-6 w-6"
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
