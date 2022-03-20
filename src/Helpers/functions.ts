import { RefObject } from "react";
import { ITerm } from "../components/termCard/Term";
import { ISet, ISetStatus } from "../state/Reducers/MnemoryReducer";
import { IMnemory } from "./../state/Reducers/MnemoryReducer";

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
