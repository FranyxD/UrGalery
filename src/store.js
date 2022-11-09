import { favoriteReducer } from "./reducers/favoriteReducer";
import { searchReducer } from "./reducers/searchReducer";
import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const reducer = combineReducers({
  search: searchReducer,
  favorite: favoriteReducer,
});

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
