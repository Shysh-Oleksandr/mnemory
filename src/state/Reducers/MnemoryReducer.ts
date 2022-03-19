import { Dispatch } from "react";
import { ITerm } from "../../components/termCard/Term";
import { ActionType } from "../Action-types";
import { Action } from "../Actions";

export interface ISet {
  name: string;
  description?: string;
  terms: ITerm[];
  setId: number;
}

export interface ISetStatus {
  savedSet: ISet;
  editingSet: ISet;
}

export interface IMnemory {
  sets: ISetStatus[];
  currentImageQuery: string;
  currentSearchedImages: string[];
  currentSetId: number;
  areImagesLoading: boolean;
  showConfirmModal: {
    toShow: boolean;
    onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
    to: string;
  };
}

const initialState: IMnemory = {
  sets: [
    {
      savedSet: {
        name: "First set",
        description: "that is description",
        terms: [
          {
            term: "Lata",
            definition: "a can",
            descriptionKeywords: [
              { keyword: "Latvia", id: 0, imageChecked: false },
              {
                keyword: "pianist",
                id: 1,
                imageChecked: false,
                descriptionText:
                  "Movie scene when man eats from earth womans food can",
              },
              {
                keyword: "Chaos",
                id: 2,
                imageChecked: false,
              },
              { keyword: "Water", id: 3, imageChecked: false },
            ],
            id: 0,
          },
          {
            term: "Leche",
            definition: "milk",
            descriptionKeywords: [
              {
                keyword: "cure",
                id: 0,
                imageChecked: false,
                image:
                  "https://images.unsplash.com/photo-1562914344-e97da11dacd4?ixid=MnwzMDg5NzJ8MHwxfHNlYXJjaHwzfHxMYXR2aWF8ZW58MHx8fHwxNjQ3NDI0NzMx&ixlib=rb-1.2.1",
              },
              { keyword: "doctor", id: 1, imageChecked: false },
            ],
            id: 1,
          },
        ],
        setId: 0,
      },
      editingSet: {
        name: "First set",
        terms: [],
        setId: 0,
      },
    },
    {
      savedSet: {
        name: "Second set",
        terms: [],
        setId: 1,
      },

      editingSet: {
        name: "Second set",
        terms: [],
        setId: 1,
      },
    },
  ],
  currentSetId: 0,
  currentImageQuery: "",
  currentSearchedImages: [],
  areImagesLoading: true,
  showConfirmModal: { toShow: false, to: "/" },
};

function validateTerms(terms: ITerm[]): ITerm[] {
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
  const currentSet = mnemoryState.sets[mnemoryState.currentSetId];
  const isEmpty = currentSet.editingSet.name === "";
  const isChanged =
    JSON.stringify(currentSet.editingSet) !==
    JSON.stringify(currentSet.savedSet);

  if (isEmpty && !isChanged) {
    console.log("delete set");
    deleteSet(currentSet.editingSet.setId);
  }
  return isChanged;
};

function setNewTerms(state: IMnemory, newTerms: ITerm[]): ISetStatus[] {
  const newSets = state.sets.map((set) => {
    if (set.editingSet.setId === state.currentSetId) {
      const newEditingSet: ISet = { ...set.editingSet, terms: newTerms };
      return { ...set, editingSet: newEditingSet };
    }
    return set;
  });

  return newSets;
}

const mnemoryReducer = (
  state: IMnemory = initialState,
  action: Action
): IMnemory => {
  const currentEditingSet: ISet = state.sets[state.currentSetId].editingSet;
  let newSets = state.sets;
  let newTerms = currentEditingSet.terms;
  switch (action.type) {
    // Terms actions.
    case ActionType.ADDING_TERM:
      newTerms = currentEditingSet.terms;
      newTerms.splice(action.payload.indexToAdd, 0, action.payload.term);
      newSets = setNewTerms(state, newTerms);
      return { ...state, sets: newSets };

    case ActionType.DELETING_TERM:
      newTerms = currentEditingSet.terms.filter(
        (term) => term.id !== action.payload.id
      );
      newSets = setNewTerms(state, newTerms);
      return { ...state, sets: newSets };

    case ActionType.SET_TERM_INFO:
      newTerms = currentEditingSet.terms.map((term) => {
        if (term.id === action.payload.termId) {
          return {
            ...term,
            term: action.payload.termName,
            definition: action.payload.definition,
          };
        }
        return term;
      });

      newSets = setNewTerms(state, newTerms);
      return {
        ...state,
        sets: newSets,
      };

    // Term keywords actions.
    case ActionType.ADDING_KEYWORD:
      newTerms = currentEditingSet.terms.map((term) => {
        if (term.id === action.payload) {
          return {
            ...term,
            descriptionKeywords: [
              ...term.descriptionKeywords,
              {
                keyword: "",
                imageChecked: false,
                id: term.descriptionKeywords.length,
              },
            ],
          };
        }
        return term;
      });

      newSets = setNewTerms(state, newTerms);
      return { ...state, sets: newSets };

    case ActionType.DELETING_KEYWORD:
      newTerms = currentEditingSet.terms.map((term) => {
        if (term.id === action.payload.termId) {
          const newTermKeywords = term.descriptionKeywords.filter(
            (keyword) => keyword.id !== action.payload.keywordId
          );
          return {
            ...term,
            descriptionKeywords: newTermKeywords,
          };
        }
        return term;
      });
      newSets = setNewTerms(state, newTerms);
      return { ...state, sets: newSets };

    // Term keyword image actions.
    case ActionType.DELETING_KEYWORD_IMAGE:
      newTerms = currentEditingSet.terms.map((term) => {
        if (term.id === action.payload.termId) {
          const newTermKeywords = term.descriptionKeywords.map((keyword) => {
            if (keyword.id === action.payload.keywordId) {
              return { ...keyword, image: undefined };
            }
            return keyword;
          });
          return {
            ...term,
            descriptionKeywords: newTermKeywords,
          };
        }
        return term;
      });
      newSets = setNewTerms(state, newTerms);
      return { ...state, sets: newSets };

    case ActionType.TOGGLE_KEYWORD_IMAGE:
      let newImageQuery = "";
      newTerms = currentEditingSet.terms.map((term) => {
        const newTermKeywords = term.descriptionKeywords.map((keyword) => {
          if (
            keyword.id === action.payload.keywordId &&
            term.id === action.payload.termId
          ) {
            newImageQuery = keyword.keyword;
            return { ...keyword, imageChecked: !keyword.imageChecked };
          }
          return { ...keyword, imageChecked: false };
        });
        return {
          ...term,
          descriptionKeywords: newTermKeywords,
        };
      });
      newSets = setNewTerms(state, newTerms);

      return {
        ...state,
        sets: newSets,
        currentImageQuery: newImageQuery,
      };

    case ActionType.SET_KEYWORD_IMAGE:
      newTerms = currentEditingSet.terms.map((term) => {
        if (term.id === action.payload.termId) {
          const newTermKeywords = term.descriptionKeywords.map((keyword) => {
            if (keyword.id === action.payload.keywordId) {
              return { ...keyword, image: action.payload.url };
            }
            return keyword;
          });
          return {
            ...term,
            descriptionKeywords: newTermKeywords,
          };
        }
        return term;
      });
      newSets = setNewTerms(state, newTerms);
      return { ...state, sets: newSets };

    case ActionType.SET_SEARCHED_IMAGES:
      return { ...state, currentSearchedImages: action.payload };

    case ActionType.SET_ARE_IMAGES_LOADING:
      return { ...state, areImagesLoading: action.payload };

    case ActionType.SET_KEYWORD_INFO:
      newTerms = currentEditingSet.terms.map((term) => {
        if (term.id === action.payload.termId) {
          const newTermKeywords = term.descriptionKeywords.map((keyword) => {
            if (keyword.id === action.payload.keywordId) {
              return {
                ...keyword,
                keyword: action.payload.keywordName,
                descriptionText: action.payload.description,
              };
            }
            return keyword;
          });
          return {
            ...term,
            descriptionKeywords: newTermKeywords,
          };
        }
        return term;
      });
      newSets = setNewTerms(state, newTerms);
      return { ...state, sets: newSets };

    // Set actions.
    case ActionType.SET_CURRENT_SET_ID:
      return { ...state, currentSetId: action.payload };

    case ActionType.ADDING_SET:
      console.log("add set");

      return {
        ...state,
        currentSetId: action.payload.editingSet.setId,
        sets: [...state.sets, action.payload],
      };

    case ActionType.DELETING_SET:
      const filteredSets = state.sets.filter(
        (set) => set.editingSet.setId !== action.payload
      );
      return {
        ...state,
        currentSetId: 0,
        sets: filteredSets,
      };

    case ActionType.SAVE_CURRENT_SET:
      newSets = state.sets.map((set) => {
        if (set.editingSet.setId === state.currentSetId) {
          const newEditingSet: ISet = {
            ...set.editingSet,
            terms: validateTerms(set.editingSet.terms),
          };
          return { ...set, savedSet: newEditingSet, editingSet: newEditingSet };
        }
        return set;
      });
      return {
        ...state,
        sets: newSets,
      };

    case ActionType.COPY_SAVED_SET:
      newSets = state.sets.map((set) => {
        if (set.editingSet.setId === state.currentSetId) {
          const newSavedSet: ISet = {
            ...set.savedSet,
          };
          return { ...set, savedSet: newSavedSet, editingSet: newSavedSet };
        }
        return set;
      });
      return {
        ...state,
        sets: newSets,
      };

    case ActionType.SET_SET_INFO:
      newSets = state.sets.map((set) => {
        if (set.editingSet.setId === state.currentSetId) {
          const newEditingSet: ISet = {
            ...set.editingSet,
            name: action.payload.setName,
            description: action.payload.description,
          };
          return { ...set, editingSet: newEditingSet };
        }
        return set;
      });
      return {
        ...state,
        sets: newSets,
      };

    case ActionType.SET_SHOW_CONFIRM_MODAL:
      return {
        ...state,
        showConfirmModal: {
          toShow: action.payload.toShow,
          onClick: action.payload.onClick,
          to: action.payload.to,
        },
      };

    default:
      return state;
  }
};

export default mnemoryReducer;
