import { ActionType } from "../Action-types";
import { ITerm } from "./../../components/Term";

interface AddingAction {
  type: ActionType.ADDING;
  payload: ITerm;
}

interface DeletingAction {
  type: ActionType.DELETING;
  payload: ITerm;
}

interface AddingKeywordAction {
  type: ActionType.ADDING_KEYWORD;
  payload: number;
}

export type Action = AddingAction | DeletingAction | AddingKeywordAction;
