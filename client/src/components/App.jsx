import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../redux/actions/login";
import PrivateRoute from "./routing/PrivateRoute";
import FileUpload from "./Home";
import StartPage from "./StartPage";
import Login from "./Login/Login";
import Register from "./Login/Register";
import { makeStyles } from "@material-ui/core/styles";
import WebCamModal from "./modals/WebCamModal";
import Capture from "./Capture";
import PublicRoutes from "./routing/PublicRoutes";
import Routes from "./routing/Routes";

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
        <Switch>
          <Route
            exact
            path={["/", "/login", "/register"]}
            component={PublicRoutes}
          />
          <Route exact path={["/home", "/takePicture"]} component={Routes} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
