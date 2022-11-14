import { createSlice } from "@reduxjs/toolkit";
import { actionRandomPhotos, actionSearchPhotos } from "../services/services";

/*
export const searchReducer = (state = [], action) => {
  switch (action.type) {
    case "@search/Result":
      return action.payload;
      break;
    default:
      return state;
      break;
  }
};

export const actionSearch = (valor) => {
  return async (dispatch) => {
    const fotos = await fotosGeneradas(valor);
    dispatch({
      type: "@search/Result",
      payload: fotos,
    });
  };
};

export const actionRandom = (valor) => {
  return async (dispatch) => {
    const fotos = await fotosGeneradas(valor);
    dispatch({
      type: "@search/Result",
      payload: fotos,
    });
  };
};
*/

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
