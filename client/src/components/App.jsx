import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PublicRoutes from "./routing/PublicRoutes";
import Routes from "./routing/Routes";
import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../redux/actions/login";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser(null));
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={["/", "/login", "/register", "/home"]}
            component={PublicRoutes}
          />
          <Route exact path={["/home"]} component={Routes} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
