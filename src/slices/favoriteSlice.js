import { createSlice, current } from "@reduxjs/toolkit";
import Favorites from "../components/Favorites";


/*
export const favoriteReducer = (
  state = JSON.parse(localStorage.getItem("reduxState")) || [],
  action
) => {
  switch (action.type) {
    case "@favorites/add":
      return [...state, action.payload];
      break;

    case "@favorites/remove":
      //console.log([...state.filter((item) => console.log('items', item))])
      return [...state.filter((item) => item.id !== action.payload.id)];
      break;

    default:
      return state;
      break;
  }
};

export const actionAddFavorite = (data, fecha) => {
  return {
    type: "@favorites/add",
    payload: {
      id: data[0],
      url: data[1],
      likes: data[2],
      title: data[3],
      fecha: fecha,
    },
  };
};

export const actionRemoveFavorite = (data) => {
  return {
    type: "@favorites/remove",
    payload: {
      id: data,
    },
  };
};

*/


export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: JSON.parse(localStorage.getItem("reduxState")) || [],
  reducers: {
    actionAddToFavorites: (state, action) => {
      console.log('action payload: ', action.payload);
      state.push(action.payload)
    },
      actionRemoveToFavorites: (state, action) => {
        //console.log('favorites state: ', current(state))
        
        console.log('//action: ', action.payload)
        return state.filter((item) => item.id !== action.payload)
      }
  },
  
})

export const {actionAddToFavorites, actionRemoveToFavorites} = favoriteSlice.actions;
export default favoriteSlice.reducer;