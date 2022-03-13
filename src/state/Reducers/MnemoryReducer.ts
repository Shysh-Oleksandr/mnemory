import { ActionType } from "../Action-types";
import { Action } from "../Actions";
import { ITerm } from "./../../components/Term";

export interface IMnemory {
  terms: ITerm[];
}

const initialState: IMnemory = {
  terms: [
    {
      term: "Lata",
      definition: "a can",
      descriptionKeywords: [
        { keyword: "Latvia", id: 0 },
        { keyword: "pianist", id: 1 },
        { keyword: "Chaos", id: 2 },
        { keyword: "Water", id: 3 },
      ],
      id: 0,
    },
    {
      term: "Leche",
      definition: "milk",
      descriptionKeywords: [
        { keyword: "cure", id: 0 },
        { keyword: "doctor", id: 1 },
      ],
      id: 1,
    },
  ],
};

const mnemoryReducer = (
  state: IMnemory = initialState,
  action: Action
): IMnemory => {
  switch (action.type) {
    case ActionType.ADDING:
      const copiedTerms = state.terms;
      copiedTerms.splice(action.payload.indexToAdd, 0, action.payload.term);
      return { ...state, terms: copiedTerms };

    case ActionType.ADDING_KEYWORD:
      const addedKeywordTerms = state.terms.map((term) => {
        if (term.id === action.payload) {
          return {
            ...term,
            descriptionKeywords: [
              ...term.descriptionKeywords,
              { keyword: "", id: term.descriptionKeywords.length },
            ],
          };
        }
        return term;
      });
      return { ...state, terms: addedKeywordTerms };

    case ActionType.DELETING:
      const filteredTerms = state.terms.filter(
        (term) => term.id !== action.payload.id
      );
      return { ...state, terms: filteredTerms };

    case ActionType.DELETING_KEYWORD:
      const deletedKeywordTerms = state.terms.map((term) => {
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
      return { ...state, terms: deletedKeywordTerms };

    default:
      return state;
  }
};

export default mnemoryReducer;
