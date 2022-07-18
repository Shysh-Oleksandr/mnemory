import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import Loading from "../components/UI/Loading";
import config from "../config/config";
import { ISet, ISetStatus } from "../interfaces/set";
import { actionCreactors, State } from "../state";
import { getAllSets } from "../state/Async-actions";
import { initialSetsId } from "./../data/initialSets";

export enum SortedMethods {
  LATEST = "latest",
  OLDEST = "oldest",
  NEWEST = "newest",
  TERMS = "terms",
}

const HomePage = () => {
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const { user } = useSelector((state: State) => state.user);
  const categorySets = mnemoryState.sets.filter((set) => set.isCategorySet);
  const userSets = mnemoryState.sets.filter((set) => !set.isCategorySet);
  const [sortMethod, setSortMethod] = useState<string>(mnemoryState.sortMethod);
  const dispatch = useDispatch();
  const { setCurrentSetId, setSortedMethod } = bindActionCreators(
    actionCreactors,
    dispatch
  );

  useEffect(() => {
    dispatch(getAllSets(user._id));
  }, []);

  const updateSetDate = async (set: ISet) => {
    if (initialSetsId.includes(set.setId)) return;
    try {
      await axios({
        method: "PATCH",
        url: `${config.server.url}/sets/update/${set._id}`,
        data: {
          lastVisitedDate: new Date().getTime(),
        },
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

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

  const sortSets = (sets: ISetStatus[], sortMethod: string) => {
    let sortedSets = sets;

    switch (sortMethod) {
      case SortedMethods.LATEST:
        sortedSets = sortedSets.sort((a, b) => {
          return a.savedSet.lastVisitedDate! <= b.savedSet.lastVisitedDate!
            ? 1
            : -1;
        });
        break;
      case SortedMethods.NEWEST:
        sortedSets = sortedSets.sort((a, b) => {
          return a.savedSet.createdDate! >= b.savedSet.createdDate! ? 1 : -1;
        });
        break;
      case SortedMethods.OLDEST:
        sortedSets = sortedSets.sort((a, b) => {
          return a.savedSet.lastVisitedDate! >= b.savedSet.lastVisitedDate!
            ? 1
            : -1;
        });
        break;
      case SortedMethods.TERMS:
        sortedSets = sortedSets.sort((a, b) => {
          return a.savedSet.terms.length < b.savedSet.terms.length
            ? 1
            : a.savedSet.terms.length === b.savedSet.terms.length
            ? 0
            : -1;
        });
        break;
      default:
        break;
    }

    return sortedSets;
  };

  return (
    <div className="md:mt-8 mt-4 div-padding pb-6">
      <div>
        <div className="flex items-center justify-between md:mb-6 mb-3">
          <h3 className="md:text-3xl text-2xl">Your sets</h3>
          <select
            defaultValue={mnemoryState.sortMethod}
            onChange={(e) => setSortMethod(e.target.value)}
            name="sort-select"
            id="sort-select"
            className="bg-slate-700 p-2 rounded-xl"
          >
            <option value={SortedMethods.LATEST}>Latest</option>
            <option value={SortedMethods.NEWEST}>Newest</option>
            <option value={SortedMethods.OLDEST}>Oldest</option>
            <option value={SortedMethods.TERMS}>Terms length</option>
          </select>
        </div>
        {mnemoryState.isLoading ? (
          <div className="flex justify-center items-center w-full h-full mt-20">
            <Loading />
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {sortSets(userSets, sortMethod)
              .filter((set) => set.savedSet.name)
              .map((set) => {
                const keywordImage = getSetImage(set);
                return (
                  <Link
                    to={`/set/${set.savedSet.setId + 1}`}
                    className="lg:basis-[32%] sm:basis-[48%] basis-full rounded-lg cursor-pointer border-solid border-transparent hover:bg-slate-600 hover:border-white border-b-4 transition-all bg-slate-700 p-4"
                    key={set.savedSet.setId}
                    onClick={() => updateSetDate(set.savedSet)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-2xl font-bold">
                          {set.savedSet.name}
                        </h4>
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
        )}
      </div>
      {categorySets.length > 0 && !mnemoryState.isLoading && (
        <div className="mt-8">
          <div className="flex items-center justify-between md:mb-6 mb-3">
            <h3 className="md:text-3xl text-2xl">Category sets</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {categorySets
              .filter((set) => set.savedSet.name)
              .map((set) => {
                const keywordImage = getSetImage(set);
                return (
                  <Link
                    to={`/set/${set.savedSet.setId + 1}`}
                    className="lg:basis-[32%] sm:basis-[48%] basis-full rounded-lg cursor-pointer border-solid border-transparent hover:bg-slate-600 hover:border-white border-b-4 transition-all bg-slate-700 p-4"
                    key={set.savedSet.setId}
                    onClick={() => updateSetDate(set.savedSet)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-2xl font-bold">
                          {set.savedSet.name}
                        </h4>
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
      )}
    </div>
  );
};

export default HomePage;
