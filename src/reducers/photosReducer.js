import axios from "axios";
import {configureStore} from "@reduxjs/toolkit";
import { incrementador, decrementador, reset } from "../actions/actions";

export const getAll = async () => {
  const API_KEY = "UQ23pygzKHfPyUj-oMZ5AsmkpWyDceKf2KUcjichoWI";
  const URL = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&query=cat&per_page=20`;
  const response = await axios.get(URL);
  console.log(response.data);
  return response.data;
};

const photosReducer = (state, action) => {
  switch (action.type) {
    case "incrementar":
      return state + 1;
      break;
    case "decrementar":
      return state - 1;
      break;
    case "reset":
      return 0;
      break;
  }
};

const store = configureStore(photosReducer);



store.dispatch(incrementador)
store.getState()