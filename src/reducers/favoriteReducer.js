import store from "../store";

export const storedURLs = JSON.parse(localStorage.getItem("img"));

export const actionAddFavorite = (url) => {
    return {
        type: '@favorites/add',
        payload: url
    }
}

export const actionStorageFavorite = () => {
    return {
        type: '@favorites/storage',
        payload: storedURLs
    }
}

export const favoriteReducer = (state = [], action) =>{
    switch(action.type){
        case '@favorites/add':
        console.log('spreadr favorite', [...state, action.payload])
        return [...state, action.payload];
        break;

        case '@favorites/storage':
            return [...state, action.payload];
        break;

        default: 
        return state;
        break;
    }
}