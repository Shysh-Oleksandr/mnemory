import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITerm } from "../components/termCard/Term";
import { actionCreactors, State } from "../state";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";

type Props = {};

const HomePage = (props: Props) => {
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const dispatch = useDispatch();

  const { setCurrentSetId } = bindActionCreators(actionCreactors, dispatch);

  return (
    <div className="mt-8">
      <h3 className="text-2xl mb-2">Your sets</h3>
      <div className="flex">
        {mnemoryState.sets.map((set) => {
          const keyword = set.terms
            .map((term) => {
              let keyword = term.descriptionKeywords.find(
                (keyword) => keyword.image
              );
              if (keyword) return keyword;
            })
            .slice(-1)[0];
          const keywordImage = keyword?.image;
          return (
            <Link
              to={`/set/${set.setId}`}
              className="mr-4 mt-2 basis-1/3 rounded-lg cursor-pointer border-solid border-transparent hover:bg-slate-600 hover:border-white border-b-4 transition-all bg-slate-700 max-w-sm p-4"
              key={set.setId}
              onClick={() => setCurrentSetId(set.setId)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-2xl font-bold">{set.name}</h4>
                  <h5 className="text-lg text-slate-400">
                    {set.terms.length} terms
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
                <p className="text-lg">{set.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
