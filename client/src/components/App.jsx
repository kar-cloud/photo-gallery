import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../redux/actions/login";
import PrivateRoute from "./routing/PrivateRoute";
import StartPage from "./StartPage";
import Login from "./Login/Login";
import Register from "./Login/Register";
import { makeStyles } from "@material-ui/core/styles";
import Home from "../components/Home"
import Capture from "./Capture";


const useStyles = makeStyles(
  {
    root: {
      fontSize: "2.5rem",
    },
  },
  { name: "MuiSvgIcon" }
);

const App = () => {
  const classes = useStyles();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      store.dispatch(loadUser(token, id));
    } else {
      store.dispatch(loadUser(null, null));
    }
  });

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/takePicture"
            element={
              <PrivateRoute>
                <Capture />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
