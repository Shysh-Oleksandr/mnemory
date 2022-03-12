import { Dispatch } from "redux";
import { ActionType } from "../Action-types";
import { Action } from "../Actions";
import { ITerm } from "./../../components/Term";

export const addTerm = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ADDING,
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
