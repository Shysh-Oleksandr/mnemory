import { ITerm } from "../../components/termCard/Term";
import {
  getRandomNumber,
  insert,
  setNewCommonSet,
  setNewTerms,
  validateTerms,
} from "../../Helpers/functions";
import { SortedMethods } from "../../pages/HomePage";
import { ActionType } from "../Action-types";
import { Action } from "../Actions";
import { initialSets } from "./../../data/initialSets";
import { getCurrentSet } from "./../../Helpers/functions";

export interface ISet {
  name: string;
  description?: string;
  terms: ITerm[];
  setId: number;
  createdDate: Date | null;
  lastVisitedDate: Date | null;
}

export interface ISetStatus {
  savedSet: ISet;
  editingSet: ISet;
  isCategorySet: boolean;
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
  sortMethod: string;
}

const initialState: IMnemory = {
  sets: initialSets,
  currentSetId: 0,
  currentImageQuery: "",
  currentSearchedImages: [],
  areImagesLoading: true,
  showConfirmModal: { toShow: false, to: "/" },
  sortMethod: SortedMethods.LATEST,
};

const mnemoryReducer = (
  state: IMnemory = initialState,
  action: Action
): IMnemory => {
  const currentEditingSet: ISet = getCurrentSet(state).editingSet;
  let newSets = state.sets;
  let newTerms = currentEditingSet.terms;
  let categorySets = state.sets.filter((set) => set.isCategorySet);
  const isCreateOrEditPage =
    window.location.pathname.startsWith("/create") ||
    window.location.pathname.endsWith("/edit");

  switch (action.type) {
    // Terms actions.
    case ActionType.ADDING_TERM:
      newTerms = insert(
        currentEditingSet.terms,
        action.payload.indexToAdd,
        action.payload.term
      );
      newSets = setNewTerms(state, newTerms);

      return { ...state, sets: newSets };

    case ActionType.DELETING_TERM:
      newTerms = currentEditingSet.terms.filter(
        (term) => term.id !== action.payload.id
      );
      newSets = setNewTerms(state, newTerms);
      return { ...state, sets: newSets };

    case ActionType.REORDER_TERMS:
      newSets = setNewTerms(state, action.payload);
      return { ...state, sets: newSets };

    case ActionType.TOGGLE_TERM_CATEGORY:
      newTerms = currentEditingSet.terms.map((term) => {
        if (term.id === action.payload.termId) {
          const chosenCategory = action.payload.categorySet;
          const isNewCategory: boolean = !term.categories
            ?.map((category) => category.savedSet.setId)
            .includes(chosenCategory.savedSet.setId);
          const updatedCategories = isNewCategory
            ? term.categories
              ? [...term.categories, chosenCategory]
              : [chosenCategory]
            : term.categories?.filter(
                (category) =>
                  category.savedSet.setId !== chosenCategory.savedSet.setId
              );
          return {
            ...term,
            categories: updatedCategories,
          };
        }
        return term;
      });
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
                id: getRandomNumber(),
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
      newSets = state.sets.map((set) => {
        if (set.editingSet.setId === action.payload) {
          const newSavedSet: ISet = {
            ...set.savedSet,
            lastVisitedDate: new Date(),
          };
          return { ...set, savedSet: newSavedSet };
        }
        return set;
      });
      return { ...state, currentSetId: action.payload, sets: newSets };

    case ActionType.ADDING_SET:
      newSets = setNewCommonSet([...state.sets, action.payload]);

      return {
        ...state,
        currentSetId: action.payload.isCategorySet
          ? state.currentSetId
          : action.payload.editingSet.setId,
        sets: newSets,
      };

    case ActionType.DELETING_SET:
      const deletedSet = state.sets.find(
        (set) => set.savedSet.setId === action.payload
      );
      const filteredSets = state.sets.filter(
        (set) => set.editingSet.setId !== action.payload
      );

      if (deletedSet?.isCategorySet) {
      }
      newSets = setNewCommonSet(filteredSets);

      return {
        ...state,
        currentSetId:
          deletedSet?.isCategorySet && isCreateOrEditPage
            ? state.currentSetId
            : 0,
        sets: newSets,
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
      newSets = setNewCommonSet(newSets);

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

    case ActionType.SET_SORTED_SETS:
      newSets = categorySets.concat(action.payload.sortedSets);
      return {
        ...state,
        sets: newSets,
        sortMethod: action.payload.sortMethod,
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
