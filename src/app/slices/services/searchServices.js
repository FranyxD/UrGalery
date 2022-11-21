import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUrl = (valor, page) => {
  const API_KEY = "ovw4CtbLgG3DTozvXvNuci975ALnURnRbvQMAILM-cE";
  const URL = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&query=${valor}&page=${page}&per_page=10`;
  console.log("🚀 ~ file: searchServices.js ~ line 10 ~ getUrl ~ URL", URL)
  return URL;
};

export const actionSearchPhotos = createAsyncThunk(
  "searchPhotos",
  async (datos) => {
    const {content, page} = datos;
    const response = await axios.get(getUrl(content, page));
    const data = response.data;
    console.log("🚀 ~ file: searchServices.js ~ line 20 ~ response", data)
    console.log(data.total)
    sessionStorage.setItem('totalPages', data.total)
    return data;
  }
);

export const actionRandomPhotos = createAsyncThunk("randomPhotos", async () => {
  const API_KEY = "ovw4CtbLgG3DTozvXvNuci975ALnURnRbvQMAILM-cE";
  const URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=30&per_page=30`;
  const response = await axios.get(URL);
  const data = response.data;
  console.log('random', response)
  return data;
});

//https://community.airtable.com/t/save-images-from-unsplash/27510/2
//"https://api.unsplash.com/photos/2ubAUUIXa5M/download?client_id=UQ23pygzKHfPyUj-oMZ5AsmkpWyDceKf2KUcjichoWI"
