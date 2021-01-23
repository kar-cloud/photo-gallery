// Reference for how to do routing taken from
// https://www.digitalocean.com/community/tutorials/how-to-handle-routing-in-react-apps-with-react-router

import FileUpload from "./FileUpload";
import StartPage from "./StartPage";
// BrowserRouter will be the base configuration.
// Switch will wrap the dynamic routes and the
// Route component will configure specific routes
// and wrap the component that should render
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  {
    root: {
      fontSize: "2.5rem",
    },
  },
  { name: "MuiSvgIcon" }
);

function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home">
          <FileUpload />
        </Route>
        <Route path="/">
          <StartPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
  // return <FileUpload />;
}

export default App;
