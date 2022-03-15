import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { bindActionCreators } from "redux";
import AddTermBtn from "./components/AddTermBtn";
import Navbar from "./components/Navbar";
import TermsList from "./components/TermsList";
import { actionCreactors, State } from "./state";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import LearnPage from "./pages/LearnPage";
import ErrorPage from "./pages/ErrorPage";
import SetPage from "./pages/SetPage";

function App() {
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const dispatch = useDispatch();

  const { addTerm } = bindActionCreators(actionCreactors, dispatch);

  return (
    <Router>
      <div className="App div-padding pt-16 pb-6">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/edit" element={<EditPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/set/:setid" element={<SetPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
