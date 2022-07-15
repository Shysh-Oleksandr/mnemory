import React from "react";
import { ISet } from "./../../state/Reducers/MnemoryReducer";
import KeywordsList from "./KeywordsList";

type Props = {
  set: ISet;
};

const SetTermsList = ({ set }: Props) => {
  return (
    <div>
      {set.terms.map((term, index) => {
        return (
          <div
            className={`set-term sm:px-4 px-2 sm:py-2 pb-1 ${
              term.categories ? "lg:!pt-10 md:!pt-8 sm:!pt-7 !pt-14" : ""
            } relative bg-slate-700 flex my-2 rounded-lg items-center sm:flex-nowrap flex-wrap`}
            key={`${set.setId}-${term.id}`}
          >
            {term.categories && (
              <ul className="absolute xl:top-2 sm:top-[6px] flex-wrap top-[4px] xl:left-5 md:left-4 left-2 z-20 flex items-center">
                {term.categories.map((category) => {
                  return (
                    <li
                      key={`${set.setId}-${term.id}-${category.savedSet.setId}-category`}
                      className="bg-teal-500 rounded-2xl lg:text-lg xl:px-4 lg:px-3 px-2 xl:py-[3px] sm:mb-0 mt-1 sm:py[2px] py-[1px] xl:mr-3 mr-2"
                    >
                      {category.savedSet.name}
                    </li>
                  );
                })}
              </ul>
            )}
            <h5 className="border-right text-xl lg:pl-3 pl-1 lg:pr-7 sm:pr-4 pr-2 lg:mr-8 sm:mr-3 mr-2">
              {index + 1}.
            </h5>
            <h4 className="border-right md:text-2xl text-xl sm:basis-1/5 basis-2/5 shrink-0 lg:pr-4 sm:pr-2 pr-1 lg:mr-8 sm:mr-4 mr-3 break-all sm:break-normal">
              {term.term}
            </h4>
            <h4 className="lg:text-2xl text-xl lg:pr-4 sm:pr-2 lg:mr-8 sm:mr-4 border-right sm:basis-1/6 basis-2/5 shrink-0 break-all sm:break-normal">
              {term.definition}
            </h4>
            <KeywordsList term={term} isBigSize={false} />
          </div>
        );
      })}
    </div>
  );
};

export default SetTermsList;
