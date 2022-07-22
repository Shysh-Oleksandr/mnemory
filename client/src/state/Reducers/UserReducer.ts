import IUser, { DEFAULT_FIRE_TOKEN, DEFAULT_USER } from "../../interfaces/user";
import { ActionType } from "../Action-types";
import { Action } from "../Actions";

export interface IUserState {
  user: IUser;
  fire_token: string;
}

export const initialState: IUserState = {
  user: DEFAULT_USER,
  fire_token: DEFAULT_FIRE_TOKEN,
};

const userReducer = (
  state: IUserState = initialState,
  action: Action
): IUserState => {
  switch (action.type) {
    case ActionType.LOGIN:
      let user = action.payload.user;
      let fire_token = action.payload.fire_token;

      localStorage.setItem("fire_token", fire_token);

      return { user, fire_token };
    case ActionType.LOGOUT:
      localStorage.removeItem("fire_token");

      return initialState;
    default:
      return state;
  }
};

export default userReducer;
