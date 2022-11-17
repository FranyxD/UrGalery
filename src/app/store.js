import  favoriteReducer  from "./slices/favoriteSlice";
import { configureStore, current } from "@reduxjs/toolkit";
import  filterReducer  from "./slices/filterSlice";
import searchReducer from './slices/searchSlice';


export const store = configureStore({
  reducer: {
    search: searchReducer,
    favorites: favoriteReducer,
    filter: filterReducer
  },
})
  



store.subscribe(()=>{
      localStorage.setItem('reduxState', JSON.stringify(store.getState().favorites))
})






export default store;
