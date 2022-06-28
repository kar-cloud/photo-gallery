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

const App = () => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      store.dispatch(loadUser(token, id));
    } else {
      store.dispatch(loadUser(null, null));
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={StartPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/home" component={FileUpload} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
