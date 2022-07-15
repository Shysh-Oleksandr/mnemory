import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./Reducers/index";

// const persistedState = localStorage.getItem("mnemory")
//   ? JSON.parse(localStorage.getItem("mnemory")!)
//   : {};

export const store = createStore(
  reducers,
  // persistedState,
  applyMiddleware(thunk)
);

// store.subscribe(() => {
//   localStorage.setItem("mnemory", JSON.stringify(store.getState()));
// });
