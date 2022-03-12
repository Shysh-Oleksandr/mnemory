import { ActionType } from "../Action-types";
import { ITerm } from "./../../components/Term";

interface AddingAction {
  type: ActionType.ADDING;
  // payload: IHabit;
}

interface DeletingAction {
  type: ActionType.DELETING;
  payload: ITerm;
}

export type Action = AddingAction | DeletingAction;
