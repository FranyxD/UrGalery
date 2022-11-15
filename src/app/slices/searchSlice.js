import { createSlice } from "@reduxjs/toolkit";
import { actionRandomPhotos, actionSearchPhotos } from "./services/searchServices";


export const searchSlice = createSlice({
  name: "search",
  initialState: [],
  reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(actionRandomPhotos.fulfilled, (state, action) => {
        return action.payload;
      })
      builder
      .addCase(actionSearchPhotos.fulfilled, (state, action) =>{
        return action.payload;

      })
      
    },
});

export const { actionSearchResult } = searchSlice.actions;
export default searchSlice.reducer;
