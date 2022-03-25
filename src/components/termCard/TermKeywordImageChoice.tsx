import React, { useEffect, useRef, useState } from "react";
import { MutatingDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { bindActionCreators, Dispatch } from "redux";
import { actionCreactors, State } from "../../state";
import { Action } from "../../state/Actions";
import { ITerm } from "./Term";
import { AiOutlineArrowRight } from "react-icons/ai";

type Props = { term: ITerm };

const CLIENT_API = "gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k"; // Another one

export const fetchImages = async (
  query: string,
  setSearchedImages: (
    searchedImages: string[]
  ) => (dispatch: Dispatch<Action>) => void,
  setAreImagesLoading: (
    areImagesLoading: boolean
  ) => (dispatch: Dispatch<Action>) => void
) => {
  setAreImagesLoading(true);
  let response = await fetch(
    `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=ZiayMmOG_HV-OOVULOC8bxjPCyBlJO23BKeXIl9zh-M`
  );
  let data = await response.json();
  let fetchedImages: string[] = data.results.map(
    (result: any) => result.urls.raw
  );
  setSearchedImages(fetchedImages);
};

const TermKeywordImageChoice = ({ term }: Props) => {
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const {
    toggleTermKeywordImage,
    setTermKeywordImage,
    setSearchedImages,
    setAreImagesLoading,
  } = bindActionCreators(actionCreactors, dispatch);

  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  const foundKeyword = term.descriptionKeywords.find(
    (keyword) => keyword.imageChecked
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    variableWidth: false,
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = mnemoryState.currentImageQuery;
    }
    setLoadedImages([]);
  }, [mnemoryState.currentImageQuery]);

  useEffect(() => {
    if (
      loadedImages.length >= mnemoryState.currentSearchedImages.length / 2 &&
      mnemoryState.areImagesLoading
    ) {
      setAreImagesLoading(false);
    }
  }, [loadedImages]);

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

  function searchKeywordImages(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputRef.current!.value.length > 1) {
      setLoadedImages([]);
      fetchImages(
        inputRef.current!.value,
        setSearchedImages,
        setAreImagesLoading
      );
    }
  }

  if (!foundKeyword) return null;

  return (
    <div className="keyword-image-choice bg-slate-900 text-slate-100 rounded-lg py-6 px-6">
      <form onSubmit={(e) => searchKeywordImages(e)}>
        <div className="flex items-center">
          <div className="relative ">
            <input
              type="text"
              key={foundKeyword.keyword}
              defaultValue={foundKeyword.keyword}
              placeholder={foundKeyword.keyword}
              className="keyword-image-input term-input"
              id={`term-${term.id}-${foundKeyword.id}`}
              ref={inputRef}
            />
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 text-2xl hover:text-orange-500 text-orange-400 transition-colors"
              type="submit"
            >
              <AiOutlineArrowRight />
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
      </form>
      <div className="mt-5 min-w-0 relative px-6">
        {mnemoryState.areImagesLoading && inputRef.current?.value !== "" && (
          <MutatingDots
            wrapperClass="justify-center items-center"
            ariaLabel="loading-indicator"
            color="#fb923c"
            secondaryColor="#2dd4bf"
            width={150}
            height={110}
          />
        )}
        <Slider
          {...settings}
          className={`${mnemoryState.areImagesLoading ? "hidden" : ""}`}
        >
          {mnemoryState.currentSearchedImages.map((imageUrl: string, index) => {
            return (
              <div className="h-36 px-1" key={`${index}-${imageUrl}`}>
                <img
                  onLoad={() => setLoadedImages([...loadedImages, imageUrl])}
                  onClick={() => {
                    toggleTermKeywordImage(term.id);
                    setTermKeywordImage(term.id, foundKeyword.id, imageUrl);
                  }}
                  className={`${
                    loadedImages.includes(imageUrl) ? "" : "invisible"
                  }
                  } mx-auto h-full rounded-xl hover:border-[3px] border-solid border-orange-400 cursor-pointer transition-all`}
                  src={imageUrl}
                />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default TermKeywordImageChoice;
