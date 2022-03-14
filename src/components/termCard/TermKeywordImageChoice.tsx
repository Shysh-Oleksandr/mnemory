import React from "react";
import { ITerm } from "./Term";
import { useDispatch } from "react-redux";
import { actionCreactors } from "../../state";
import { bindActionCreators } from "redux";

type Props = { term: ITerm };

const TermKeywordImageChoice = ({ term }: Props) => {
  const dispatch = useDispatch();
  const { toggleTermKeywordImage, setTermKeywordImage } = bindActionCreators(
    actionCreactors,
    dispatch
  );

  const foundKeyword = term.descriptionKeywords.find(
    (keyword) => keyword.imageChecked
  );

  function getFileImageUrl(e: React.ChangeEvent<HTMLInputElement>): string {
    let file = e.target.files![0];
    let url = URL.createObjectURL(file);

    return url;
  }

  function setFileKeywordImage(e: React.ChangeEvent<HTMLInputElement>) {
    toggleTermKeywordImage(term.id);
    let imageUrl = getFileImageUrl(e);
    setTermKeywordImage(term.id, foundKeyword!.id, imageUrl);
  }

  if (!foundKeyword) return null;

  return (
    <div className="keyword-image-choice bg-slate-900 text-slate-100 rounded-lg py-2 px-6">
      <form
        onSubmit={() => {
          console.log("submit");
        }}
      >
        <div className="flex items-center">
          <div className="relative ">
            <input
              type="text"
              defaultValue={foundKeyword.keyword}
              placeholder={foundKeyword.keyword}
              className="keyword-image-input term-input "
              id={`term-${term.id}-${foundKeyword.id}`}
            />
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 hover:text-orange-400 transition-colors"
              type="submit"
            >
              ►
            </button>
          </div>
          <div>
            <input
              className="hidden"
              type="file"
              id={`term-${term.id}-${foundKeyword.id}-image`}
              accept="image/*"
              onChange={(e) => {
                setFileKeywordImage(e);
              }}
            />
            <label
              className="cursor-pointer block px-6 py-3 ml-8 bg-orange-400 text-xl transition-colors hover:bg-orange-500 font-bold rounded-md"
              htmlFor={`term-${term.id}-${foundKeyword.id}-image`}
            >
              Or upload your image
            </label>
          </div>
        </div>
        <label
          htmlFor={`term-${term.id}-${foundKeyword.id}`}
          className="keyword-image-input-label"
        >
          Search by image
        </label>
      </form>
    </div>
  );
};

export default TermKeywordImageChoice;
