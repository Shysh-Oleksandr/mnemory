import { Dispatch } from "redux";
import { ActionType } from "../Action-types";
import { Action } from "../Actions";
import { ITerm } from "./../../components/Term";

export const addTerm = (term: ITerm) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ADDING,
      payload: term,
    });
  };
};

export const deleteTerm = (term: ITerm) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.DELETING,
      payload: term,
    });
  };
};

export const addTermKeyword = (termId: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ADDING_KEYWORD,
      payload: termId,
    });
  };
};
