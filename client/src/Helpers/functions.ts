import { RefObject } from "react";
import { Dispatch } from "redux";
import { ISet, ISetStatus } from "../interfaces/set";
import { ITerm } from "../interfaces/term";
import { Action } from "../state/Actions";
import { termsPlaceholder } from "./../data/termsPlaceholders";
import { MAX_BG_CARDS } from "./../pages/LearnFlashcardsPage";
import { IMnemory } from "./../state/Reducers/MnemoryReducer";
import { initialSets } from "./../data/initialSets";

export function getCurrentSet(mnemoryState: IMnemory): ISetStatus {
  return (
    mnemoryState.sets.find(
      (set) => set.editingSet.setId === mnemoryState.currentSetId
    ) || initialSets[0]
  );
}

export const fetchImages = async (
  query: string,
  setSearchedImages: (
    searchedImages: string[]
  ) => (dispatch: Dispatch<Action>) => void,
  setAreImagesLoading: (
    areImagesLoading: boolean
  ) => (dispatch: Dispatch<Action>) => void,
  setKeywordImage?: (query: string, foundImage: string) => void
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

  if (setKeywordImage) {
    setKeywordImage(query, fetchedImages[0]);
  }
};

export function validateTerms(
  terms: ITerm[],
  parentSet: ISetStatus | undefined = undefined
): ITerm[] {
  // Removing terms with empty name.
  let validatedTerms = terms.filter((term) => term.term.trim() !== "");
  // Removing empty keywords from term.
  validatedTerms = validatedTerms.map((term) => {
    let validatedKeywords = term.descriptionKeywords.filter(
      (keyword) => keyword.keyword.trim() !== ""
    );
    return {
      ...term,
      descriptionKeywords: validatedKeywords,
      parentSet: parentSet,
    };
  });

  return validatedTerms;
}

export const isSetChanged = (
  mnemoryState: IMnemory,
  deleteSet: any
): boolean => {
  const currentSet = getCurrentSet(mnemoryState);
  const isEmpty = currentSet.editingSet.name === "";
  const isChanged =
    JSON.stringify(currentSet.editingSet) !==
    JSON.stringify(currentSet.savedSet);

  if (isEmpty && !isChanged) {
    deleteSet(currentSet.editingSet.setId);
  }

  return isChanged;
};

export function setNewTerms(
  state: IMnemory,
  newTerms: ITerm[],
  changeSaved: boolean = false
): ISetStatus[] {
  const newSets = state.sets.map((set) => {
    if (set.editingSet.setId === state.currentSetId) {
      const newEditingSet: ISet = { ...set.editingSet, terms: newTerms };
      return {
        ...set,
        editingSet: newEditingSet,
        savedSet: changeSaved ? newEditingSet : set.savedSet,
      };
    }
    return set;
  });

  return newSets;
}

export function setNewCommonSet(sets: ISetStatus[]): ISetStatus[] {
  const allTerms: ITerm[] = [];
  sets.map(
    (set) =>
      set.savedSet.setId !== 0 &&
      set.savedSet.terms.map(
        (term) =>
          term.term.trim() !== "" && !set.isCategorySet && allTerms.push(term)
      )
  );

  const newSets = sets.map((set) => {
    if (set.editingSet.setId === 0) {
      const newSavedSet: ISet = { ...set.savedSet, terms: allTerms };
      return { ...set, savedSet: newSavedSet };
    }
    return set;
  });

  return newSets;
}

export function clearInput(
  ...args: RefObject<HTMLInputElement | HTMLTextAreaElement>[]
) {
  if (window.location.pathname.startsWith("/create")) {
    args.forEach((inputRef) => {
      inputRef.current!.value = "";
    });
  }
}

export function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export const calcTermsLeft = (
  currentTermIndex: number,
  termsLength: number
): number => {
  const termLeft =
    termsLength - (currentTermIndex + 1) <= MAX_BG_CARDS
      ? termsLength - (currentTermIndex + 1)
      : MAX_BG_CARDS;
  return termLeft;
};

export function getRandomNumber(n: number = 10000000000) {
  return Math.floor(Math.random() * n) + 1;
}

export const insert = (arr: any[], index: number, newItem: any) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index),
];

export function getEmptyTerm() {
  return {
    term: "",
    definition: "",
    placeholderId: Math.floor(Math.random() * termsPlaceholder.length),
    descriptionKeywords: [
      { keyword: "", id: getRandomNumber(), imageChecked: false },
    ],
    id: getRandomNumber(),
  };
}

export function getEmptySet(
  mnemoryState: IMnemory,
  isCategorySet: boolean = false,
  setName: string = ""
) {
  const randomId = getRandomNumber();
  const emptyTerms: ITerm[] = new Array(4).fill(0).map((term) => {
    return getEmptyTerm();
  });
  const emptySet: ISetStatus = {
    savedSet: {
      name: setName,
      terms: isCategorySet ? [] : emptyTerms,
      setId: randomId,
      createdDate: new Date().getTime(),
      lastVisitedDate: new Date().getTime(),
    },
    editingSet: {
      name: setName,
      terms: isCategorySet ? [] : emptyTerms,
      setId: randomId,
      createdDate: new Date().getTime(),
      lastVisitedDate: new Date().getTime(),
    },
    isCategorySet: isCategorySet,
  };

  return emptySet;
}
