import { ActionType } from "../Action-types";

interface AddingAction {
  type: ActionType.ADDING;
  // payload: IHabit;
}

export type Action = AddingAction;
