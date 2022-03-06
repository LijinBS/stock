import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import RootReducer from "./RootReducer";

const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware())
);

export default store;
