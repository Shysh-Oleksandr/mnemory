import React from "react";
import { CgMathEqual } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { ISetStatus } from "../../interfaces/set";
import { ITerm } from "../../interfaces/term";
import { actionCreactors } from "../../state";
import { fetchImages } from "./../../Helpers/functions";
import TermCategoriesForm from "./TermCategoriesForm";

type Props = {
  index: number;
  term: ITerm;
  currentSet: ISetStatus;
  termRef: React.RefObject<HTMLDivElement>;
};

const TermHeader = ({ index, term, currentSet, termRef }: Props) => {
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
        {document.documentElement.clientWidth >= 768 && (
          <TermCategoriesForm currentSet={currentSet} term={term} />
        )}
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
          onClick={() => {
            termRef.current?.classList.add("delete");
            setTimeout(() => {
              deleteTerm(term);
            }, 500);
          }}
          className="delete-btn text-2xl text-white transition-colors hover:text-orange-400"
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default TermHeader;
