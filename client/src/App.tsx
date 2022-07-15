import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { bindActionCreators } from "redux";
import AuthRoute from "./components/auth/AuthRoute";
import Navbar from "./components/Navbar";
import Alert from "./components/UI/Alert";
import ConfirmModal from "./components/UI/ConfirmModal";
import Loading from "./components/UI/Loading";
import logging from "./config/logging";
import routes from "./config/routes";
import { Validate } from "./modules/auth";

import { actionCreactors, State } from "./state";
import { login, logout } from "./state/Action-creators";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const mnemoryState = useSelector((state: State) => state.mnemory);
  const { user } = useSelector((state: State) => state.user);
  const dispatch = useDispatch();

  const { setShowConfirmModal } = bindActionCreators(actionCreactors, dispatch);

  useEffect(() => {
    setTimeout(() => {
      checkLocalStorageForCredentials();
    }, 100);
  }, []);

  /**
   * Check to see if we have a token.
   * If we do, verify it with the backend.
   * If not, we are logged out initially.
   */
  function checkLocalStorageForCredentials() {
    const fire_token = localStorage.getItem("fire_token");

    if (fire_token === null) {
      console.log("null token");

      dispatch(logout());
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    } else {
      return Validate(fire_token, (error, user) => {
        if (error) {
          logging.error(error);
          console.log("logout");
          dispatch(logout());
          setTimeout(() => {
            setIsLoading(false);
          }, 100);
        } else if (user) {
          console.log("login", user);

          dispatch(login({ user, fire_token }));
          setTimeout(() => {
            setIsLoading(false);
          }, 100);
        }
      });
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loading />
      </div>
    );
  }

  return (
    <Router>
      <div className="app text-center w-full h-full">
        {mnemoryState.showConfirmModal.toShow && (
          <ConfirmModal
            setShowConfirmModal={setShowConfirmModal}
            onClick={mnemoryState.showConfirmModal.onClick}
            to={mnemoryState.showConfirmModal.to}
          />
        )}
        {user._id !== "" && <Navbar />}
        <Routes>
          {routes.map((route, index) => {
            if (route.auth) {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <AuthRoute>
                      <route.component {...route.props} />
                    </AuthRoute>
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
        <Alert
          message={mnemoryState.error}
          isError={true}
          anotherMessage={mnemoryState.success}
        />
        <Alert
          message={mnemoryState.success}
          isError={false}
          anotherMessage={mnemoryState.error}
        />
      </div>
    </Router>
  );
}

export default App;
