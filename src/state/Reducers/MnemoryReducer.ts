import { ActionType } from "../Action-types";
import { Action } from "../Actions";

export interface ITerm {
  term: string;
  definition?: string;
  description: string;
  images: string[];
}

export interface IMnemory {
  terms: ITerm[];
}

const initialState: IMnemory = {
  terms: [],
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
