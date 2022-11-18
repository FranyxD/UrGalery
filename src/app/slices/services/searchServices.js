import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUrl = (valor, page) => {
  const API_KEY = "JcShO0JJM_kylbPbhKLZkdftBloajvfCzHzEF_0ihw8";
  if (valor == "") {
    return `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=20&per_page=10`;
  }

  const URL = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&query=${valor}&page=${page}&per_page=10`;
  console.log(URL)
  console.log(page)

  return URL;
};

export const actionSearchPhotos = createAsyncThunk(
  "searchPhotos",
  async (datos) => {
    const {url, page} = datos;
    console.log('action',page)
    const response = await axios.get(getUrl(url, page));
    const data = response.data;
    console.log(data.results);
    return data.results;
  }
);

export const actionRandomPhotos = createAsyncThunk("randomPhotos", async () => {
  const API_KEY = "UQ23pygzKHfPyUj-oMZ5AsmkpWyDceKf2KUcjichoWI";
  const URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=20&per_page=10`;

  const response = await axios.get(URL);
  const data = response.data;
  return data;
});

//https://community.airtable.com/t/save-images-from-unsplash/27510/2
//"https://api.unsplash.com/photos/2ubAUUIXa5M/download?client_id=UQ23pygzKHfPyUj-oMZ5AsmkpWyDceKf2KUcjichoWI"
