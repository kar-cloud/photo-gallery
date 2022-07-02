import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import auth from "./redux/reducers/state";
import { composeWithDevTools } from "@redux-devtools/extension";

const initialState = {};
const middleware =
  process.env.NODE_ENV !== "production"
    ? [require("redux-immutable-state-invariant").default(), thunk]
    : [thunk];

const store = createStore(
  auth,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
