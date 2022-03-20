import React from "react";
import { ISet } from "./../../state/Reducers/MnemoryReducer";

type Props = {
  set: ISet;
};

const SetTermsList = ({ set }: Props) => {
  return (
    <div>
      {set.terms.map((term) => {
        return (
          <div
            className="set-term px-4 py-2 bg-slate-700 flex my-2 rounded-lg items-center"
            key={`${set.setId}-${term.id}`}
          >
            <h5 className="border-right text-xl pl-3 pr-7 mr-8">
              {term.id + 1}.
            </h5>
            <h4 className="border-right text-2xl basis-1/5 shrink-0 pr-4 mr-8">
              {term.term}
            </h4>
            <h4 className="text-2xl mr-8 pr-4 border-right basis-1/6 shrink-0 ">
              {term.definition}
            </h4>
            <div className="flex flex-wrap items-end">
              {term.descriptionKeywords.map((keyword) => {
                return (
                  <div
                    className="set-keyword mx-2 text-center"
                    key={`${set.setId}-${term.id}-${keyword.id}`}
                  >
                    {keyword.image && (
                      <div
                        className="set-keyword-image relative w-full min-w-[110px] h-[70px] rounded-t-xl bg-center bg-cover bg-no-repeat"
                        style={{
                          backgroundImage: `urL(${keyword.image})`,
                        }}
                      >
                        {keyword.descriptionText && (
                          <p className="h-0 absolute hidden bottom-0 translate-y-full bg-slate-800 bg-opacity-50 p-4">
                            {keyword.descriptionText}
                          </p>
                        )}
                      </div>
                    )}
                    <h5
                      className={`text-lg ${
                        keyword.image
                          ? "rounded-b-2xl mb-1"
                          : "rounded-2xl my-1"
                      } bg-slate-800 px-4 py-1`}
                    >
                      {keyword.keyword}
                    </h5>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SetTermsList;
