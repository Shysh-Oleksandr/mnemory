import React from "react";
import { ITerm } from "../termCard/Term";

type Props = {
  term: ITerm;
  isBigSize: boolean;
};

const KeywordsList = ({ term, isBigSize }: Props) => {
  return (
    <div
      className={`flex flex-wrap items-end overflow-hidden ${
        isBigSize ? "justify-center" : ""
      }`}
    >
      {term.descriptionKeywords.map((keyword) => {
        return (
          <div
            className={`set-keyword ${
              isBigSize ? "sm:mx-3 mx-2" : "sm:mx-2 mx-1"
            } text-center`}
            key={`${term.id}-${keyword.id}`}
          >
            {keyword.image && (
              <div
                className={`set-keyword-image ${
                  isBigSize
                    ? "mt-[12px] sm:min-w-[150px] min-w-130px] sm:h-[95px] h-[75px]"
                    : "mt-[6px] sm:min-w-[110px] min-w-[90px] sm:h-[70px] h-[50px]"
                }  relative w-full rounded-t-xl bg-center bg-cover bg-no-repeat`}
                style={{
                  backgroundImage: `urL(${keyword.image})`,
                }}
              ></div>
            )}
            <h5
              className={`keyword-label ${
                keyword.image
                  ? `rounded-t-none ${isBigSize ? "mb-5" : "mb-[6px]"}`
                  : `rounded-t-2xl ${isBigSize ? "my-5" : "my-[6px]"}`
              } ${
                keyword.descriptionText ? "rounded-b-none" : "rounded-b-2xl"
              } ${
                isBigSize
                  ? "sm:px-10 px-6 py-[6px] block sm:text-2xl text-xl"
                  : "sm:px-6 px-4 py-1 sm:text-lg text-base"
              } bg-slate-800 relative`}
            >
              {keyword.keyword}
              {keyword.descriptionText && (
                <p
                  className={`keyword-description ${
                    isBigSize
                      ? "big-size pt-2 pb-[10px]"
                      : "sm:pt-1 pt-[1px] pb-[5px]"
                  } h-auto max-h-0 overflow-y-auto absolute left-1/2 -translate-x-1/2 bottom-0 block bg-slate-900 rounded-b-2xl w-full translate-y-full z-20`}
                >
                  <span
                    className={`keyword-description-text ${
                      isBigSize ? "text-xl" : "text-sm"
                    } transition-opacity opacity-0 px-2 text-left`}
                  >
                    {keyword.descriptionText}
                  </span>
                </p>
              )}
            </h5>
          </div>
        );
      })}
    </div>
  );
};

export default KeywordsList;
