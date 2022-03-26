import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreactors, State } from "../state";
import { ISetStatus } from "../state/Reducers/MnemoryReducer";

type Props = {};

const HomePage = (props: Props) => {
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const dispatch = useDispatch();

  const { setCurrentSetId } = bindActionCreators(actionCreactors, dispatch);

  const getSetImage = (set: ISetStatus): string | undefined => {
    let keywords = set.savedSet.terms.map((term) => {
      let keyword = term.descriptionKeywords.find((keyword) => keyword.image);
      return keyword;
    });
    keywords = keywords.filter((keyword) => keyword !== undefined);
    const keywordImage =
      keywords.length === 0 ? undefined : keywords[keywords.length - 1]!.image;
    return keywordImage;
  };

  return (
    <div className="md:mt-8 mt-4">
      <h3 className="md:text-3xl text-2xl md:mb-4 mb-2">Your sets</h3>
      <div className="flex flex-wrap gap-3">
        {mnemoryState.sets
          .filter((set) => set.savedSet.name)
          .map((set) => {
            const keywordImage = getSetImage(set);
            return (
              <Link
                to={`/set/${set.savedSet.setId + 1}`}
                className="lg:basis-[32%] sm:basis-[48%] basis-full rounded-lg cursor-pointer border-solid border-transparent hover:bg-slate-600 hover:border-white border-b-4 transition-all bg-slate-700 p-4"
                key={set.savedSet.setId}
                onClick={() => setCurrentSetId(set.savedSet.setId)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-2xl font-bold">{set.savedSet.name}</h4>
                    <h5 className="text-lg text-slate-400">
                      {set.savedSet.terms.length} terms
                    </h5>
                  </div>
                  <div>
                    {keywordImage && (
                      <div
                        className="w-[100px] h-[70px] rounded-xl bg-center bg-cover bg-no-repeat"
                        style={{
                          backgroundImage: `urL(${keywordImage})`,
                        }}
                      ></div>
                    )}
                  </div>
                </div>
                <div className="mt-1">
                  <p className="text-lg">{set.savedSet.description}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default HomePage;
