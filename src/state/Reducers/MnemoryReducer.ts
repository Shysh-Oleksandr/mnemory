import { ActionType } from "../Action-types";
import { Action } from "../Actions";
import { ITerm } from "../../components/termCard/Term";

export interface ISet {
  name: string;
  description?: string;
  terms: ITerm[];
  setId: number;
}

export interface IMnemory {
  sets: ISet[];
  currentImageQuery: string;
  currentSearchedImages: string[];
  currentSetId: number;
}

const initialState: IMnemory = {
  sets: [
    {
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
    {
      name: "Second set",
      terms: [],
      setId: 1,
    },
  ],
  currentSetId: 0,
  currentImageQuery: "",
  currentSearchedImages: [],
};

function setNewTerms(state: IMnemory, newTerms: ITerm[]): ISet[] {
  const newSets = state.sets.map((set) => {
    if (set.setId === state.currentSetId) return { ...set, terms: newTerms };
    return set;
  });

  return newSets;
}

const mnemoryReducer = (
  state: IMnemory = initialState,
  action: Action
): IMnemory => {
  let newSets = state.sets;
  let newTerms = state.sets[state.currentSetId].terms;
  switch (action.type) {
    // Terms actions.
    case ActionType.ADDING_TERM:
      newTerms = state.sets[state.currentSetId].terms;
      newTerms.splice(action.payload.indexToAdd, 0, action.payload.term);
      newSets = setNewTerms(state, newTerms);
      return { ...state, sets: newSets };

    case ActionType.DELETING_TERM:
      newTerms = state.sets[state.currentSetId].terms.filter(
        (term) => term.id !== action.payload.id
      );
      newSets = setNewTerms(state, newTerms);
      return { ...state, sets: newSets };

    // Term keywords actions.
    case ActionType.ADDING_KEYWORD:
      newTerms = state.sets[state.currentSetId].terms.map((term) => {
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
      newTerms = state.sets[state.currentSetId].terms.map((term) => {
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
      newTerms = state.sets[state.currentSetId].terms.map((term) => {
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
      newTerms = state.sets[state.currentSetId].terms.map((term) => {
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
      newTerms = state.sets[state.currentSetId].terms.map((term) => {
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

    // Set actions.
    case ActionType.SET_CURRENT_SET_ID:
      return { ...state, currentSetId: action.payload };

    default:
      return state;
  }
};

export default mnemoryReducer;
