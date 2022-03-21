import React from "react";
import { ITerm } from "../termCard/Term";

type Props = {
  term: ITerm;
  isBigSize: boolean;
};

const KeywordsList = ({ term, isBigSize }: Props) => {
  return (
    <div
      className={`flex flex-wrap items-end ${
        isBigSize ? "justify-center" : ""
      }`}
    >
      {term.descriptionKeywords.map((keyword) => {
        return (
          <div
            className={`set-keyword ${isBigSize ? "mx-3" : "mx-2"} text-center`}
            key={`${term.id}-${keyword.id}`}
          >
            {keyword.image && (
              <div
                className={`set-keyword-image ${
                  isBigSize
                    ? "mt-[12px] min-w-[150px] h-[95px]"
                    : "mt-[6px] min-w-[110px] h-[70px]"
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
                  ? "px-10 py-[6px] block text-2xl"
                  : "px-6 py-1 text-lg"
              } bg-slate-800 relative`}
            >
              {keyword.keyword}
              {keyword.descriptionText && (
                <p
                  className={`keyword-description ${
                    isBigSize ? "big-size pt-2 pb-[10px]" : "pt-1 pb-[5px]"
                  } h-auto max-h-0 overflow-y-auto absolute left-1/2 -translate-x-1/2 bottom-0 block bg-slate-900 rounded-b-2xl w-full translate-y-full z-20`}
                >
                  <span
                    className={`keyword-description-text ${
                      isBigSize ? "text-xl" : "text-sm"
                    } transition-opacity opacity-0 px-2`}
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
