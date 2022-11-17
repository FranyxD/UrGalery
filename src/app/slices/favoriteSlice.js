import { createSlice, current } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState: JSON.parse(localStorage.getItem("reduxState")) || [],
  reducers: {
    actionAddToFavorites: (state, action) => {
      const dateSave = new Date();
      //console.log(dateSave.getTime());
      //const fecha = `${dateSave.getFullYear()}-${dateSave.getMonth()}-${dateSave.getDate()}`
      //const fecha = dateSave.getMilliseconds();
      state.push({ ...action.payload, fecha: dateSave.getTime() });
      //console.log(current(state));
    },
    actionRemoveToFavorites: (state, action) => {
      //console.log('favorites state: ', current(state))
      //console.log("//action: ", action.payload);
      return state.filter((item) => item.id !== action.payload);
    },
    actionEditImag: (state, action) => {
      //console.log(current(state));
      return state.map((item) => {
        if (item.id === action.payload.id)
          return {
            ...item,
            description: action.payload.description,
            alt_description: action.payload.alt_description,
          };

        return item;
      });
    },
  },
});

export const { actionAddToFavorites, actionRemoveToFavorites, actionEditImag } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
