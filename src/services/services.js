import axios from 'axios';

export const getUrl = (valor)=>{
    const API_KEY = "UQ23pygzKHfPyUj-oMZ5AsmkpWyDceKf2KUcjichoWI";
    const URL = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&query=${valor}&per_page=20`;
    return URL;
}

export const getUrlRandom = () =>{
    const API_KEY = "UQ23pygzKHfPyUj-oMZ5AsmkpWyDceKf2KUcjichoWI";
    const URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&per_page=20`;
    return URL;
}

export const fotosGeneradasRandom = async (url) => {
    console.log('fotosGeneradas',url)
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}

export const fotosGeneradas = async (valor) => {
    console.log('fotosGeneradas',valor)
    const response = await fetch(getUrl(valor));
    const data = await response.json();
    return data.results;
}