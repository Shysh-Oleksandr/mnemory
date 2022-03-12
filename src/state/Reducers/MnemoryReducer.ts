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
      descriptionKeywords: ["Latvia", "pianist"],
      id: 0,
    },
    {
      term: "Leche",
      definition: "milk",
      descriptionKeywords: ["cure", "doctor"],
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
      return { ...state };

    default:
      return state;
  }
};

export default mnemoryReducer;
