import { combineReducers } from "redux";
import learnReducer from "./LearnReducer";
import mnemoryReducer from "./MnemoryReducer";

const reducers = combineReducers({
  mnemory: mnemoryReducer,
  learn: learnReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
