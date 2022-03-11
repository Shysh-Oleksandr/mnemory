import React from "react";
import { actionCreactors, State } from "./state";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

function App() {
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const dispatch = useDispatch();

  const { addTerm } = bindActionCreators(actionCreactors, dispatch);

  return (
    <div className="App">
      <h1 className="text-center my-4 mx-auto text-4xl text-black font-bold">
        Mnemory
      </h1>
    </div>
  );
}

export default App;
