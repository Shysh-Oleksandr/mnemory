import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { bindActionCreators } from "redux";
import Navbar from "./components/Navbar";
import ConfirmModal from "./components/UI/ConfirmModal";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";
import LearnFlashcardsPage from "./pages/LearnFlashcardsPage";
import SetPage from "./pages/SetPage";
import { actionCreactors, State } from "./state";

function App() {
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const dispatch = useDispatch();

  const { setShowConfirmModal } = bindActionCreators(actionCreactors, dispatch);

  return (
    <Router>
      {mnemoryState.showConfirmModal.toShow && (
        <ConfirmModal
          setShowConfirmModal={setShowConfirmModal}
          onClick={mnemoryState.showConfirmModal.onClick}
          to={mnemoryState.showConfirmModal.to}
        />
      )}
      <Navbar />
      <div className="App div-padding pb-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create/:setid" element={<CreatePage />} />
          <Route path="/set/:setid/edit/" element={<EditPage />} />
          <Route
            path="/set/:setid/learn/flashcards"
            element={<LearnFlashcardsPage />}
          />
          <Route path="/set/:setid" element={<SetPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
