import { applyMiddleware, createStore } from "redux";
import reducers from "./Reducers/index";
import thunk from "redux-thunk";

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
