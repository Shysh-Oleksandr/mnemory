import React, { useEffect, useState } from "react";
import { ITerm } from "./Term";
import { useDispatch } from "react-redux";
import { actionCreactors } from "../../state";
import { bindActionCreators } from "redux";
import { useForm } from "react-hook-form";

type Props = { term: ITerm };

const CLIENT_API = "gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k"; // Another one

const TermKeywordImageChoice = ({ term }: Props) => {
  const [searchedImages, setSearchedImages] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { toggleTermKeywordImage, setTermKeywordImage } = bindActionCreators(
    actionCreactors,
    dispatch
  );

  const foundKeyword = term.descriptionKeywords.find(
    (keyword) => keyword.imageChecked
  );

  function fetchKeywordImages() {
    const query: string = getValues("imageQuery");
    fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=ZiayMmOG_HV-OOVULOC8bxjPCyBlJO23BKeXIl9zh-M`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let foundImages = data.results.map((result: any) => result.urls.raw);
        setSearchedImages(foundImages);
      });
  }

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
    <div className="keyword-image-choice bg-slate-900 text-slate-100 rounded-lg py-6 px-6">
      <form onSubmit={handleSubmit(fetchKeywordImages)}>
        <div className="flex items-center">
          <div className="relative ">
            <input
              type="text"
              key={foundKeyword.keyword}
              defaultValue={foundKeyword.keyword}
              placeholder={foundKeyword.keyword}
              className="keyword-image-input term-input"
              id={`term-${term.id}-${foundKeyword.id}`}
              {...register("imageQuery", { required: true })}
            />
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 hover:text-orange-500 text-orange-400 transition-colors"
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
              className="cursor-pointer block px-6 py-[0.6rem] ml-8 bg-orange-400 text-xl transition-colors hover:bg-orange-500 font-bold rounded-md"
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
        {errors.name?.type === "required" && (
          <span className="term-keyword-error">Enter search query.</span>
        )}
      </form>
      <div className="flex flex-wrap">
        {searchedImages.map((imageUrl: string, index) => {
          return (
            <div className="basis-1/4" key={`${index}-${imageUrl}`}>
              <img className="max-w-full h-auto" src={imageUrl} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TermKeywordImageChoice;
