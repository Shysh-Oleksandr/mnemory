import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import AddTermBtn from "./components/AddTermBtn";
import Navbar from "./components/Navbar";
import TermsList from "./components/TermsList";
import { actionCreactors, State } from "./state";

function App() {
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const dispatch = useDispatch();

  const { addTerm } = bindActionCreators(actionCreactors, dispatch);

  return (
    <div className="App div-padding pt-14">
      <Navbar />
      <TermsList />
      <AddTermBtn />
    </div>
  );
}

export default App;
