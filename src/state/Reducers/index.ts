import { combineReducers } from "redux";
import mnemoryReducer from "./MnemoryReducer";

const reducers = combineReducers({
  mnemory: mnemoryReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
