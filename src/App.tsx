import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import TermsList from "./components/TermsList";
import { actionCreactors, State } from "./state";

function App() {
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const dispatch = useDispatch();

  const { addTerm } = bindActionCreators(actionCreactors, dispatch);

  return (
    <div className="App mx-32">
      <h1 className="text-center mt-6 mb-8 mx-auto text-4xl text-white font-bold">
        Mnemory
      </h1>
      <TermsList />
    </div>
  );
}

export default App;
