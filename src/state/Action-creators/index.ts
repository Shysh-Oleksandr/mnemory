import { Dispatch } from "redux";
import { ActionType } from "../Action-types";
import { Action } from "../Actions";

export const addTerm = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ADDING,
    });
  };
};