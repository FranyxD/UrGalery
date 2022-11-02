
import axios from 'axios';



export const getAll = async () => {
  const API_KEY = "UQ23pygzKHfPyUj-oMZ5AsmkpWyDceKf2KUcjichoWI";
  const URL = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&query=cat&per_page=20`;
  const response = await axios.get(URL)
  console.log(response.data)
  return response.data;
}
