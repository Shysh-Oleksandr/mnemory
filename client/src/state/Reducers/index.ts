import { combineReducers } from "redux";
import learnReducer from "./LearnReducer";
import mnemoryReducer from "./MnemoryReducer";
import userReducer from "./UserReducer";

const reducers = combineReducers({
  mnemory: mnemoryReducer,
  learn: learnReducer,
  user: userReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
