import { ActionType } from "../Action-types";
import { Action } from "../Actions";

export interface ILearn {
  isStartSideFront: boolean;
  showDefinition: boolean;
}

const initialState: ILearn = {
  isStartSideFront: true,
  showDefinition: false,
};

const learnReducer = (state: ILearn = initialState, action: Action): ILearn => {
  switch (action.type) {
    case ActionType.SET_IS_START_SIDE_FRONT:
      return { ...state, isStartSideFront: !state.isStartSideFront };
    case ActionType.SET_SHOW_DEFINITION:
      return { ...state, showDefinition: !state.showDefinition };

    default:
      return state;
  }
};

export default learnReducer;
