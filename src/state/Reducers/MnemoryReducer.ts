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
          image:
            "https://media.istockphoto.com/photos/flag-of-latvia-blowing-in-the-wind-picture-id1219006164?k=20&m=1219006164&s=612x612&w=0&h=Gilv16JpdkZ7YrVvdQ0GqyUDvlzLDFyGJnqB9j2e158=",
        },
        { keyword: "Water", id: 3, imageChecked: false },
      ],
      id: 0,
    },
    {
      term: "Leche",
      definition: "milk",
      descriptionKeywords: [
        { keyword: "cure", id: 0, imageChecked: false },
        { keyword: "doctor", id: 1, imageChecked: false },
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

    case ActionType.DELETING_KEYWORD_IMAGE:
      const deletedKeywordImageTerms = state.terms.map((term) => {
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
      return { ...state, terms: deletedKeywordImageTerms };

    case ActionType.TOGGLE_KEYWORD_IMAGE:
      const toggledKeywordImageTerms = state.terms.map((term) => {
        if (term.id === action.payload.termId) {
          const newTermKeywords = term.descriptionKeywords.map((keyword) => {
            if (keyword.id === action.payload.keywordId) {
              return { ...keyword, imageChecked: !keyword.imageChecked };
            }
            return { ...keyword, imageChecked: false };
          });
          return {
            ...term,
            descriptionKeywords: newTermKeywords,
          };
        }
        return term;
      });
      return { ...state, terms: toggledKeywordImageTerms };

    default:
      return state;
  }
};

export default mnemoryReducer;
