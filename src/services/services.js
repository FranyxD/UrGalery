import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUrl = (valor) => {
  const API_KEY = "UQ23pygzKHfPyUj-oMZ5AsmkpWyDceKf2KUcjichoWI";
  if (valor == "") {
    return `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=20&per_page=20`;
  }

  const URL = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&query=${valor}&per_page=20`;

  return URL;
};

export const actionSearchPhotos = createAsyncThunk(
  "searchPhotos",
  async (url) => {
    const response = await axios.get(getUrl(url));
    const data = response.data;
    console.log(data.results);
    return data.results;
  }
);

export const actionRandomPhotos = createAsyncThunk("randomPhotos", async () => {
  const API_KEY = "UQ23pygzKHfPyUj-oMZ5AsmkpWyDceKf2KUcjichoWI";
  const URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=20&per_page=20`;

  const response = await axios.get(URL);
  const data = response.data;
  return data;
});

//https://community.airtable.com/t/save-images-from-unsplash/27510/2
