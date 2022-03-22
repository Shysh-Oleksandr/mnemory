import { RefObject } from "react";
import { ITerm } from "../components/termCard/Term";
import { ISet, ISetStatus } from "../state/Reducers/MnemoryReducer";
import { IMnemory } from "./../state/Reducers/MnemoryReducer";
import { MAX_BG_CARDS } from "./../pages/LearnFlashcardsPage";

export function getCurrentSet(mnemoryState: IMnemory): ISetStatus {
  return mnemoryState.sets.find(
    (set) => set.editingSet.setId === mnemoryState.currentSetId
  )!;
}

export function validateTerms(terms: ITerm[]): ITerm[] {
  // Removing terms with empty name.
  let validatedTerms = terms.filter((term) => term.term !== "");
  // Removing empty keywords from term.
  validatedTerms = validatedTerms.map((term) => {
    let validatedKeywords = term.descriptionKeywords.filter(
      (keyword) => keyword.keyword !== ""
    );
    return { ...term, descriptionKeywords: validatedKeywords };
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

export function setNewTerms(state: IMnemory, newTerms: ITerm[]): ISetStatus[] {
  const newSets = state.sets.map((set) => {
    if (set.editingSet.setId === state.currentSetId) {
      const newEditingSet: ISet = { ...set.editingSet, terms: newTerms };
      return { ...set, editingSet: newEditingSet };
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
  while (currentIndex != 0) {
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
