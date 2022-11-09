import axios from 'axios';

export const getUrl = (valor)=>{
    const API_KEY = "UQ23pygzKHfPyUj-oMZ5AsmkpWyDceKf2KUcjichoWI";
    const URL = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&query=${valor}&per_page=20`;
    return URL;
}

export const fotosGeneradas = async (valor) => {
    console.log('fotosGeneradas',valor)
    const response = await fetch(getUrl(valor));
    const data = await response.json();
    return data.results;
}