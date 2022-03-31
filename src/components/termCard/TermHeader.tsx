import React, { useEffect, useRef, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { CgClose, CgMathEqual } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreactors, State } from "../../state";
import { fetchImages, getEmptySet } from "./../../Helpers/functions";
import { ITerm } from "./Term";
import TermCategoriesForm from "./TermCategoriesForm";

type Props = { index: number; term: ITerm };

const TermHeader = ({ index, term }: Props) => {
  const dispatch = useDispatch();

  const {
    deleteTerm,
    setSearchedImages,
    setAreImagesLoading,
    setTermKeywordImage,
  } = bindActionCreators(actionCreactors, dispatch);

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

  return (
    <div className="term-header flex items-center justify-between py-3 px-6 border-b-2 border-slate-800 border-solid">
      <div className="flex items-center">
        <h4 className="term-id">{index + 1}</h4>
        {window.screen.width >= 768 && <TermCategoriesForm term={term} />}
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
