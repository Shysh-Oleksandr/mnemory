import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { bindActionCreators } from "redux";
import AuthRoute from "./components/auth/AuthRoute";
import Navbar from "./components/Navbar";
import ConfirmModal from "./components/UI/ConfirmModal";
import routes from "./config/routes";

import { actionCreactors, State } from "./state";

function App() {
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const { user } = useSelector((state: State) => state.user);
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
      {/* !== */}
      {user._id === "" && <Navbar />}
      {/*  className="App div-padding pb-6" */}
      <Routes>
        {routes.map((route, index) => {
          if (route.auth) {
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  // <AuthRoute>
                  <route.component {...route.props} />
                  // </AuthRoute>
                }
              />
            );
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={<route.component {...route.props} />}
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
